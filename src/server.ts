import fastify from 'fastify';
import { env } from './env';
import { imoveisRoutes } from './routes/imoveis';
import fastifyCookie from '@fastify/cookie';
import fastifyJwt from '@fastify/jwt';
import { PrismaClient } from '@prisma/client';

export const app = fastify();
export const prisma = new PrismaClient();

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'token',
        signed: true,
    },
});

app.register(fastifyCookie);

app.get('/', (request, reply) => {
    return reply.status(200).send({ message: 'deu certo' });
});

app.register(imoveisRoutes, { prefix: 'imoveis' });

app.listen({
    host: '0.0.0.0',
    port: env.PORT || 3333,
}).then(() => {
    console.log('🔱 HTTP Server Running! http://localhost:3333');
});
