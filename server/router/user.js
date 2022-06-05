import  Express  from "express";
import {getAllController, logInContriller, registerController} from '../controller/userController.js'

const userRouter = Express.Router();

userRouter.post('/register', registerController)
userRouter.post('/login',logInContriller)
userRouter.get("/get-all-user",getAllController)


export default userRouter;