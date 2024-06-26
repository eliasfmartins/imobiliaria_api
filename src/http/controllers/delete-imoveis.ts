import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { prisma } from '../../app';

export const deleteImoveis = async (
	request: FastifyRequest,
	reply: FastifyReply
) => {
	const token = request.cookies.token;
	const cookie = request.cookies;

	const updateParamsSchema = z.object({
		id: z.string().uuid(),
	});
	try {
		const { id } = updateParamsSchema.parse(request.params);

		const imovel = await prisma.property.delete({
			where: { id },
		});

		return reply.status(200).send({
			success: true,
			message: 'Imóvel Deletado com sucesso!',
			data: imovel,
		});
	} catch (e: any) {
		reply.status(400).send({ sucess: false, error: e.errors ,token:token, cokkie:cookie});
	}
};
