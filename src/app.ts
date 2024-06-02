import fastifyJwt from '@fastify/jwt';
import fastify from 'fastify';
import { env } from './env';
import fastifyCookie from '@fastify/cookie';
import { imoveisRoutes } from './routes/imoveis';

const app = fastify();
app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
	cookie: {
		cookieName: 'token',
		signed: true,
	},
});

app.register(fastifyCookie);



app.register(imoveisRoutes, { prefix: 'imoveis' });


export default app;
