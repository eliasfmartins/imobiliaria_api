import fastify, { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';


export const app: FastifyInstance = fastify();

export const prisma = new PrismaClient();




