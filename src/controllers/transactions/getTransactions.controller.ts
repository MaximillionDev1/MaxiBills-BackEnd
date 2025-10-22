import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import type { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../config/prisma";
import type { getTransactionsQuery } from "../../schemas/transaction.schema";
import type { TransactionFilter } from "../../types/transaction.type";

dayjs.extend(utc);

export const getTransactions = async (
	request: FastifyRequest<{ Querystring: getTransactionsQuery }>,
	reply: FastifyReply,
): Promise<void> => {
	const userId = request.userId;

	if (!userId) {
		reply.status(401).send({
			error: "Unauthorized",
		});
		return;
	}

	const { month, year, categoryId, type } = request.query;

	const filters: TransactionFilter = { userId };

	if (month && year) {
		const startDate = dayjs(`${year}-${month}-01`).startOf("month").toDate();
		const endDate = dayjs(startDate).endOf("month").toDate();
		filters.date = {
			gte: startDate,
			lte: endDate,
		};
	}

	if (type) {
		filters.type = type;
	}

	if (categoryId) {
		filters.categoryId = categoryId;
	}

	try {
		const transactions = await prisma.transaction.findMany({
			where: filters,
			orderBy: {
				date: "desc",
			},
			include: {
				category: {
					select: {
						color: true,
						name: true,
						type: true,
					},
				},
			},
		});

		reply.send(transactions);
	} catch (error) {
		request.log.error(error);
		reply.status(500).send({
			error: "Internal Server Error",
			message: "Failed to retrieve transactions",
		});
	}
};
