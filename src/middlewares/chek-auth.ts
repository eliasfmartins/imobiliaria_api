import { FastifyReply, FastifyRequest } from 'fastify';
import { env } from '../env';
import jwt from 'jsonwebtoken';


export const checkAuth = async (request: FastifyRequest, reply: FastifyReply) => {

    try {
            // console.log(request.cookies)
            const token = request.cookies.token;
            console.log(token)
            if (!token) {
                console.log('Deu RUim n auth')
                return reply.status(401).send({ error: 'Unauthorized n achei o token x.x' });
            }
    
            const decoded = jwt.verify(token, env.JWT_SECRET);
    
           
            request.user = decoded; 
            return;
        } catch (error) {
            // Se houver algum erro ao verificar o token, retornar um erro de autorização
            return reply.status(401).send({ error: 'Unauthorized cookies nao bate com jwt' });
        }
};
