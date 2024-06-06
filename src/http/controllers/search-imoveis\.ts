import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../../app';
import { z } from 'zod';

export const searchImoveis = async (
	request: FastifyRequest,
	reply: FastifyReply
) => {
	const searchBodySchema = z.object({
		title: z.string(),
	});

	try {
		const imoveis = await prisma.property.findMany();
		return reply.status(200).send({
			success: true,
			count: imoveis.length,
			data: imoveis,
		});
	} catch (e: any) {
		reply
			.status(500)
			.send({ success: false, error: 'Erro ao buscar os imóveis' });
	}
};
