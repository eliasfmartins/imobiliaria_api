import { FastifyReply, FastifyRequest } from 'fastify';
import { env } from '../env';
import jwt from 'jsonwebtoken';

export const checkAuth = async (request: FastifyRequest, reply: FastifyReply) => {
    try {

        const authHeader = request.headers['authorization'];
        console.log('Authorization header:', authHeader);

        if (!authHeader) {
            return reply.status(401).send({ error: 'Unauthorized: Token not found' });
        }

        // Verifica e decodifica o token JWT
        const decoded = jwt.verify(authHeader, env.JWT_SECRET);

        // Anexa o usuário decodificado à requisição
        request.user = decoded; 
        return;
    } catch (error:any) {
        // Se houver algum erro ao verificar o token, retorna um erro de autorização
        console.error('Erro ao verificar token:', error);
        return reply.status(401).send({ error: 'Unauthorized: Invalid token', details: error.message });
    }
};
