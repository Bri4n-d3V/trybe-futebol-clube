import * as express from 'express';
import leaderboardController from '../controllers/leaderboardController';

const route = express.Router();

route.get('/home', leaderboardController);

export default route;
