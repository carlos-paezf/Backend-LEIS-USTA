import { Router } from 'express';
import { authControllerPost } from '../controllers/auth/auth_post.controller';


class AuthRoutes {
    public authRouter: Router

    constructor() {
        this.authRouter = Router()
        this.config()
    }

    private config = () => {
        this.authRouter.post('/login', authControllerPost.loginWithEmailAndPassword)
    }
}


const authRoutes = new AuthRoutes()
export default authRoutes.authRouter