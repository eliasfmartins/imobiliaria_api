import { FastifyInstance } from 'fastify';
import { listImoveis } from '../http/controllers/list-imoveis';
import { register } from '../http/controllers/register-imoveis';
import { updateImoveis } from '../http/controllers/update-imoveis copy';
import { deleteImoveis } from '../http/controllers/delete-imoveis';

export async function imoveisRoutes(app: FastifyInstance) {
	
	app.get('/', listImoveis);
	app.post('/', register);
	app.patch('/:id', updateImoveis);
	app.delete('/:id', deleteImoveis);
}
