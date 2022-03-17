import * as express from 'express';
import * as login from '../controllers/loginController';

const route = express.Router();

route.post('/', login.createLogin);
route.get('/validate', login.loginValidate);

export default route;
