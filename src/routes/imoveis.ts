import { listImoveis } from '@/http/controllers/list-imoveis';
import { register } from '@/http/controllers/register-imoveis';
import { deleteImoveis } from '@/http/controllers/delete-imoveis';
import { FastifyInstance } from 'fastify';
import { updateImoveis } from '@/http/controllers/update-imoveis copy';

export async function imoveisRoutes(app: FastifyInstance) {
	
	app.get('/', listImoveis);
	app.post('/', register);
	app.patch('/:id', updateImoveis);
	app.delete('/:id', deleteImoveis);
}
