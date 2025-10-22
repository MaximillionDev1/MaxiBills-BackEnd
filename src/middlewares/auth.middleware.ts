import type { FastifyReply, FastifyRequest } from "fastify";
import admin from "firebase-admin";

declare module "fastify" {
	interface FastifyRequest {
		userId?: string;
	}
}

export const authMiddleware = async (
	request: FastifyRequest,
	reply: FastifyReply,
): Promise<void> => {
	const authHeader = request.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer")) {
		reply.code(401).send({
			error: "Unauthorized",
			message: "Missing or invalid authorization header",
		});
		return;
	}
	const token = authHeader.replace("Bearer ", "");

	try {
		const decodedToken = await admin.auth().verifyIdToken(token);

		request.userId = decodedToken.uid;
	} catch (error) {
		request.log.error(error, "Failed to verify Firebase ID token");
		reply.code(401).send({
			error: "Unauthorized",
			message: "Token is invalid or expired",
		});
	}
};
