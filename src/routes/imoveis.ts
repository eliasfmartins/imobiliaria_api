import { FastifyInstance } from 'fastify';
import { listImoveis } from '../http/controllers/list-imoveis';
import { register } from '../http/controllers/register-imoveis';
import { updateImoveis } from '../http/controllers/update-imoveis';
import { deleteImoveis } from '../http/controllers/delete-imoveis';
import { authUser } from '../http/controllers/authenticate';
import { checkAuth } from '../middlewares/chek-auth';
import { searchImoveis } from '../http/controllers/search-imoveis';
import { getImovelById } from '../http/controllers/imoveis-id';

export async function imoveisRoutes(app: FastifyInstance) {
	app.get('/', listImoveis);
	app.get('/:id', getImovelById);
	app.post('/search', searchImoveis);
	app.post('/auth', authUser);
	app.post('/', register);
	app.patch('/:id', { preHandler: [checkAuth] }, updateImoveis);
	app.delete('/:id', deleteImoveis);
	
}
