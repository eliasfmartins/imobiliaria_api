import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../../app';
import { z } from 'zod';

export const searchImoveis = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  // Definindo o esquema de validação para os parâmetros de pesquisa
  const searchBodySchema = z.object({
    id: z.string().optional(),
    title: z.string().optional(),   // Título é opcional
    rooms: z.string().optional(),   // Número de quartos é opcional
    minValue: z.string().optional(), // Valor mínimo é opcional
    maxValue: z.string().optional()  // Valor máximo é opcional
  });

  try {
    // Valida o corpo da requisição
    const { id, title, rooms, minValue, maxValue } = searchBodySchema.parse(request.body);

    // Construindo o filtro de consulta dinamicamente
    const filters: any = {};

    // Adicionando filtro por ID
    if (id) {
      filters.id = id;
    }

    // Adicionando filtro por título
    if (title) {
      filters.title = {
        contains: title,
        mode: 'insensitive'
      };
    }

    // Adicionando filtro por número de quartos
    if (rooms) {
      filters.rooms = parseInt(rooms, 10);
    }

    // Adicionando filtro por valor mínimo e máximo
    if (minValue || maxValue) {
      filters.value = {};
      if (minValue) {
        filters.value.gte = parseFloat(minValue);
      }
      if (maxValue) {
        filters.value.lte = parseFloat(maxValue);
      }
    }

    // Consulta ao banco de dados
    const imoveis = await prisma.property.findMany({
      where: filters
    });

    // Retorna a resposta
    return reply.status(200).send({
      success: true,
      count: imoveis.length,
      data: imoveis,
    });
  } catch (e: any) {
    // Tratamento de erros
    console.error(e);
    return reply.status(500).send({
      success: false,
      error: 'Erro ao buscar os imóveis',
      details: e.message,
    });
  }
};
