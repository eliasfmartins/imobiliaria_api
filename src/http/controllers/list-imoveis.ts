import { prisma } from '@/app';
import { FastifyReply, FastifyRequest } from 'fastify';

export const listImoveis = async (
	request: FastifyRequest,
	reply: FastifyReply
) => {
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
