import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { prisma } from '../../app';

export const authUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const authBodySchema = z.object({
        email: z.string().email(),
        password: z.string(),
    });

    try {
        const validatedData = authBodySchema.parse(request.body);
        const { email, password } = validatedData;
        const user = await prisma.user.findFirst({
            where: {
                email,
                password,
            },
        });

        if (!user) {
            return reply.status(401).send({
                success: false,
                message: 'Email ou senha incorretos',
            });
        }

        const token = await reply.jwtSign(
            {},
            {
                sign: {
                    sub: user.id,
                },
            }
        );

        reply.setCookie('token', token, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 7 dias em segundos
            httpOnly: true, // Para que o cookie não seja acessível via JavaScript no lado do cliente
            secure: process.env.NODE_ENV === 'production', // true se estiver em produção
            sameSite: 'strict', // Protege contra ataques CSRF
        });

        return reply.status(200).send({
            success: true,
            message: 'Usuário autenticado com sucesso!',
            token,
        });
    } catch (e: any) {
        return reply.status(400).send({
            success: false,
            message: 'Erro na autenticação',
            error: e.errors,
        });
    }
};
