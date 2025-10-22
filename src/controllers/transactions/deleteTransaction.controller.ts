import type { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../config/prisma";
import type {
	deleteTransactionParams,
	deleteTransactionSchema,
} from "../../schemas/transaction.schema";

const deleteTransaction = async (
	request: FastifyRequest<{ Params: deleteTransactionParams }>,
	reply: FastifyReply,
): Promise<void> => {
	const userId = request.userId;

	if (!userId) {
		reply.status(401).send({ error: "Unauthorized" });
		return;
	}

	const { id } = request.params;
	try {
		const transaction = await prisma.transaction.findUnique({
			where: {
				id,
				userId,
			},
		});

		if (!transaction) {
			reply.status(404).send({ error: "Transaction not found" });
			return;
		}

		await prisma.transaction.delete({
			where: {
				id: transaction.id,
			},
		});

		reply.status(200).send({
			message: "Transaction deleted successfully",
		});
	} catch (error) {
		reply.status(500).send({
			error: "Internal server error",
			details: error instanceof Error ? error.message : error,
		});
	}
};

export default deleteTransaction;
