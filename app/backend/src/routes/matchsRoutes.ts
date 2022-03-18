import * as express from 'express';
import * as matchs from '../controllers/matchsController';

const route = express.Router();

route.get('/', matchs.getAllMatchs);
route.post('/', matchs.saveMatch);
route.patch('/:id/finish', matchs.saveFinishedMatchById);

export default route;
