import express from 'express';
import { signIn, signUp ,signOut} from '../controllers/authcontroller.js';
const authRouter = express.Router();



authRouter.post('/signup', signUp);
authRouter.post('/signin', signIn);
authRouter.get('/signout', signOut);
export default authRouter;