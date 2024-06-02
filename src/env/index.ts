import 'dotenv/config';

import { z } from 'zod';

const envSchema = z.object({
	NODE_ENV: z.enum(['dev', 'production', 'test']).default('dev'),
	JWT_SECRET:z.string(),
	PORT: z.coerce.number().default(3333),
});

const _env = envSchema.safeParse(process.env);
// safe parse tenta validar se o process.env tem as informacoes
// que o envSchema esta pedindo caso ao contrario vai dar um
//thorw error
if (_env.success === false) {
	console.error('❌Invalid environment variables', _env.error.format());
	throw new Error('Invalid environment variables');
}
// esse thorw  serve para parar a aplicacao
//se passar daqui e sucesso

export const env = _env.data;

// apos salvo vc pode importar o env e utilizar as variaveis de ambiente
// em qualqer lugar da aplicacao
