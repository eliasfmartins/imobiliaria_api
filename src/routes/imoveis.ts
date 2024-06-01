import { prisma } from '@/app';
import { FastifyInstance } from 'fastify';

export async function imoveisRoutes(app: FastifyInstance) {
	app.post('/', async (request, reply) => {
		const imovel = await prisma.property.create({
			data: {
				description: 'teste imovel dhr e tals',
				rooms: 2,
				title: 'Grande Casa TOpper',
				value: 500.0,
				images: ['foto1', 'foto2', 'foto3'],
			},
		});
		return imovel;
	});
    app.get('/', (request, reply)=>{
        return reply.send('Deu certo hahasss').code(200)
    })
}
