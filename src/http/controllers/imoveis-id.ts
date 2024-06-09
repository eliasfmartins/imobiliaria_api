import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../../app';

export const getImovelById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    const imovel = await prisma.property.findUnique({
      where: { id },
    });

    if (!imovel) {
      return reply.status(404).send({
        success: false,
        error: 'Imóvel não encontrado',
      });
    }

    return reply.status(200).send({
      success: true,
      data: imovel,
    });
  } catch (error: any) {
    return reply.status(500).send({
      success: false,
      error: 'Erro ao buscar o imóvel',
      details: error.message,
    });
  }
};
