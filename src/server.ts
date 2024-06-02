import fastifyCookie from '@fastify/cookie';
import { env } from './env';
import { imoveisRoutes } from './routes/imoveis';
import fastifyJwt from '@fastify/jwt';
import { app } from './app';

app
	.listen({
		host: `0.0.0.0`,
		port: env.PORT || 3333,
	})
	.then(() => {
		console.log(`🔱 HTTP Server Running! http://localhost:3333`);
	});
app.get('/', (request, reply) => {
	return reply.status(200).send({ message: 'deu certo' });
});

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
	cookie: {
		cookieName: 'token',
		signed: true,
	},
});

app.register(fastifyCookie);
app.register(imoveisRoutes, { prefix: 'imoveis' });
