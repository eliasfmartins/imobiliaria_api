import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../../server';
import { z } from 'zod';

export const deleteImoveis = async (
	request: FastifyRequest,
	reply: FastifyReply
) => {
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
		reply.status(400).send({ sucess: false, error: e.errors });
	}
};
