import * as express from 'express';
import matchs from '../controllers/matchsController';

const route = express.Router();

route.get('/', matchs);

export default route;
