import fastifyCookie from '@fastify/cookie';
import { env } from './env';
import { imoveisRoutes } from './routes/imoveis';
import fastifyJwt from '@fastify/jwt';
import { app } from './app';
import fastifyCors from '@fastify/cors';

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
app.register(fastifyCors, {
	origin: true, // Permite qualquer origem. Você pode especificar uma lista de origens ou uma função para controle mais granular.
	credentials: true, // Permite o envio de cookies e cabeçalhos de autorização
  });


app.register(fastifyCookie);
app.register(imoveisRoutes, { prefix: 'imoveis' });
