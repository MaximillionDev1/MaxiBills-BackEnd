import { type FastifyInstance, fastify } from "fastify";
import { zodToJsonSchema } from "zod-to-json-schema";
import createTransaction from "../controllers/transactions/createTransaction.controller";
import deleteTransaction from "../controllers/transactions/deleteTransaction.controller";
import { getHistoricalTransactions } from "../controllers/transactions/getHistoricalTransactions.controller";
import { getTransactions } from "../controllers/transactions/getTransactions.controller";
import { getTransactionsSummary } from "../controllers/transactions/getTransactionsSummary.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
	createTransactionSchema,
	deleteTransactionSchema,
	getHistoricalTransactionsSchema,
	getTransactionsSchema,
	getTransactionsSummarySchema,
} from "../schemas/transaction.schema";

const transactionRoutes = async (fastify: FastifyInstance) => {
	fastify.addHook("preHandler", authMiddleware);

	fastify.route({
		method: "POST",
		url: "/",
		schema: {
			body: zodToJsonSchema(createTransactionSchema),
		},
		handler: createTransaction,
	});

	fastify.route({
		method: "GET",
		url: "/",
		schema: {
			querystring: zodToJsonSchema(getTransactionsSchema),
		},
		handler: getTransactions,
	});
	fastify.route({
		method: "GET",
		url: "/summary",
		schema: {
			querystring: zodToJsonSchema(getTransactionsSummarySchema),
		},
		handler: getTransactionsSummary,
	});

	fastify.route({
		method: "GET",
		url: "/historical",
		schema: {
			querystring: zodToJsonSchema(getHistoricalTransactionsSchema),
		},
		handler: getHistoricalTransactions,
	});

	fastify.route({
		method: "DELETE",
		url: "/:id",
		schema: { params: zodToJsonSchema(deleteTransactionSchema) },
		handler: deleteTransaction,
	});
};

export default transactionRoutes;
