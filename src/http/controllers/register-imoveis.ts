import { prisma } from '../../app';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

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
	});
	try {
		const validatedData = registerBodySchema.parse(request.body);
		const { description, images, rooms, title, value } = validatedData;

		const imovel = await prisma.property.create({
			data: {
				description,
				rooms,
				title,
				value,
				images,
			},
		});
		return reply.status(200).send({
			success: true,
			message: 'Imóvel cadastrado com sucesso!',
			data: imovel,
		});
	} catch (e: any) {
		reply.status(400).send({ sucess: false, error: e.errors });
	}
};
