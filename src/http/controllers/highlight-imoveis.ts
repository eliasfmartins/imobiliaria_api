import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../../app';

export const getHighlightedImoveis = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const imoveis = await prisma.property.findMany({
      where: {
        highlight: true,
      },
    });

    return reply.status(200).send({
      success: true,
      data: imoveis,
    });
  } catch (error) {
    return reply.status(500).send({
      success: false,
      message: 'Erro ao buscar imóveis destacados',
    });
  }
};
