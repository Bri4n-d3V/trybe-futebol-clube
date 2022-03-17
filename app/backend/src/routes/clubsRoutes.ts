import * as express from 'express';
import * as clubs from '../controllers/clubsController';

const route = express.Router();

route.get('/', clubs.getAllClubs);
route.get('/:id', clubs.getClubById);

export default route;
