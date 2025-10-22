import { TransactionType } from "@prisma/client";
import { ObjectId } from "mongodb";
import { z } from "zod";

const isValidObjectId = (id: string): boolean => ObjectId.isValid(id);

export const createTransactionSchema = z.object({
	description: z.string().min(1, "Description is required"),
	amount: z.number().positive("Amount must be a positive number"),
	date: z.coerce.date({
		errorMap: () => ({
			message: "Invalid date format",
		}),
	}),
	categoryId: z
		.string()
		.refine(isValidObjectId, { message: "Invalid categoryId format" }),
	type: z.enum([TransactionType.expense, TransactionType.income], {
		errorMap: () => ({
			message: "Invalid date format",
		}),
	}),
});

export const getTransactionsSchema = z.object({
	month: z.string().optional(),
	year: z.string().optional(),
	type: z
		.enum([TransactionType.expense, TransactionType.income], {
			errorMap: () => ({
				message: "Invalid date format",
			}),
		})
		.optional(),
	categoryId: z
		.string()
		.refine(isValidObjectId, { message: "Invalid categoryId format" })
		.optional(),
});

export const getTransactionsSummarySchema = z.object({
	month: z.string({ message: "Month is required" }),
	year: z.string({ message: "Year is required" }),
});

export const getHistoricalTransactionsSchema = z.object({
	month: z.coerce.number().min(1).max(12),
	year: z.coerce.number().min(2010).max(2100),
	months: z.coerce.number().min(1).max(12).optional(),
});

export const deleteTransactionSchema = z.object({
	id: z.string().min(1).refine(isValidObjectId, {
		message: "Invalid transaction Id format",
	}),
});

export type getTransactionsQuery = z.infer<typeof getTransactionsSchema>;
export type getTransactionsSummaryQuery = z.infer<
	typeof getTransactionsSummarySchema
>;
export type deleteTransactionParams = z.infer<typeof deleteTransactionSchema>;
export type getHistoricalTransactionsQuery = z.infer<
	typeof getHistoricalTransactionsSchema
>;
