import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { prisma } from '../../app';

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const registerBodySchema = z.object({
    title: z.string(),
    description: z.string(),
    rooms: z.string(),
    value: z.string(),
    images: z.array(z.string()),
    city: z.string(),
    bathrooms: z.string().optional(),
    garages: z.string().optional(),
    area: z.string().optional(),
		phone: z.string().optional(),
    condominium: z.string().optional(),
    highlight: z.boolean().optional(),
  });

  try {
    const validatedData = registerBodySchema.parse(request.body);
    const { description, images, rooms, title, value, city, bathrooms, garages, area,condominium,highlight,phone } = validatedData;

    const imovel = await prisma.property.create({
      data: {
        description,
        rooms,
        title,
        value,
        images,
        city,
        bathrooms,
        garages,
        area,
				phone,
        condominium,
        highlight,
      },
    });
    return reply.status(200).send({
      success: true,
      message: 'Imóvel cadastrado com sucesso!',
      data: imovel,
    });
  } catch (e: any) {
    reply.status(400).send({ success: false, error: e.errors });
  }
};
