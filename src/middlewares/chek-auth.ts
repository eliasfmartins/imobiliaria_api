import { FastifyReply, FastifyRequest } from 'fastify';
import { env } from '../env';
import jwt from 'jsonwebtoken';

export const checkAuth = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        // Verifica o token nos cookies
        const token = request.cookies.token;

        // Verifica o token nos headers (caso necessário)
        const authHeader = request.headers['authorization'];
        const cookie = request.cookies;
        console.log('Token from cookie:', token);
        console.log('Authorization header:', authHeader);

        if (!token) {
            console.log('Token not found in cookies', token, cookie);
            return reply.status(401).send({ error: 'Unauthorized: Token not found' });
        }

        // Verifica e decodifica o token JWT
        const decoded = jwt.verify(token, env.JWT_SECRET);

        // Anexa o usuário decodificado à requisição
        request.user = decoded; 
        return;
    } catch (error) {
        // Se houver algum erro ao verificar o token, retorna um erro de autorização
        console.error('Erro ao verificar token:', error);
        return reply.status(401).send({ error: 'Unauthorized: Invalid token', details: error.message });
    }
};
