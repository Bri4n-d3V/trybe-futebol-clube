import * as express from 'express';
import * as leaderboardController from '../controllers/leaderboardController';

const route = express.Router();

route.get('/home', leaderboardController.getHomeLeaderboard);
route.get('/away', leaderboardController.getAwayLeaderboard);
route.get('/', leaderboardController.getAllLeaderboard);

export default route;
