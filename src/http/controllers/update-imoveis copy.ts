import { prisma } from '@/app';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export const updateImoveis = async (
	request: FastifyRequest,
	reply: FastifyReply
) => {
	const updateBodySchema = z.object({
		title: z.string().optional(),
		description: z.string().optional(),
		rooms: z.string().optional(),
		value: z.string().optional(),
		images: z.array(z.string().optional()),
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
		reply.status(400).send({ sucess: false, error: e.errors });
	}
};
