import type { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../config/prisma";
import { createTransactionSchema } from "../../schemas/transaction.schema";

const createTransaction = async (
	request: FastifyRequest<{ Body: typeof createTransactionSchema }>,
	reply: FastifyReply,
): Promise<void> => {
	const userId = request.userId; // Aqui você deve obter o userId de forma segura

	if (!userId) {
		reply.status(401).send({ error: "Unauthorized" });
		return;
	}

	const result = createTransactionSchema.safeParse(request.body);

	if (!result.success) {
		reply.status(400).send({
			error: "Invalid request data",
			issues: result.error.issues,
		});
		return;
	}

	const transaction = result.data;

	try {
		const category = await prisma.category.findFirst({
			where: {
				id: transaction.categoryId,
				type: transaction.type,
			},
		});

		if (!category) {
			reply.status(404).send({ error: "Category not found" });
			return;
		}

		// Criando a transação
		const newTransaction = await prisma.transaction.create({
			data: {
				...transaction,
				userId, // Adiciona o userId à transação
			},
		});

		reply.status(201).send({
			message: "Transação criada com sucesso!",
			data: newTransaction,
		});
	} catch (error) {
		reply.status(500).send({
			error: "Internal server error",
			details: error instanceof Error ? error.message : error,
		});
	}
};

export default createTransaction;
