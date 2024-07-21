import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { prisma } from '../../app';

export const updateImoveis = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const updateBodySchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    rooms: z.string().optional(),
    value: z.string().optional(),
    images: z.array(z.string()).optional(),
    city: z.string().optional(),
    bathrooms: z.string().optional(),
    garages: z.string().optional(),
    area: z.string().optional(),
		phone: z.string().optional(),
    condominium: z.string().optional(),
    highlight: z.boolean().optional(),
		
  });

  const updateParamsSchema = z.object({
    id: z.string().uuid(),
  });

  try {
    const { id } = updateParamsSchema.parse(request.params);
    const validatedData = updateBodySchema.parse(request.body);

    const dataToUpdate = Object.fromEntries(
      Object.entries(validatedData).filter(([_, v]) => v !== undefined)
    );

    const imovel = await prisma.property.update({
      where: { id },
      data: dataToUpdate,
    });

    return reply.status(200).send({
      success: true,
      message: 'Imóvel atualizado com sucesso!',
      data: imovel,
    });
  } catch (e: any) {
    reply.status(400).send({ success: false, error: e.errors });
  }
};
