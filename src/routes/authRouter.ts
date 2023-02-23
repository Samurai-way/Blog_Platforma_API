import {Router} from "express";
import {authMiddleware} from "../middlewares/authMiddleware";
import {email, login, newPassword, password} from "../validators/validators";
import {ExpressErrorValidator} from "../middlewares/expressErrorValidator";
import {refreshTokenMiddleware} from "../middlewares/refreshTokenMiddleware";
import {requestAttemptsMiddleware} from "../middlewares/requestAttemptsMiddleware";
import {authController} from "../controllers/authController";


export const authRouter = Router({})

authRouter.get('/me', authMiddleware, authController.getUser.bind(authController))
authRouter.post('/login', requestAttemptsMiddleware, authController.loginUser.bind(authController))
authRouter.post('/refresh-token', refreshTokenMiddleware, authController.refreshToken.bind(authController))
authRouter.post('/registration', login, password, email, requestAttemptsMiddleware, ExpressErrorValidator, authController.registration.bind(authController))
authRouter.post('/registration-confirmation', requestAttemptsMiddleware, authController.registrationConfirmation)
authRouter.post('/registration-email-resending', requestAttemptsMiddleware, email, ExpressErrorValidator, authController.registrationEmailResending.bind(authController))
authRouter.post('/logout', refreshTokenMiddleware, authController.logout.bind(authController))
authRouter.post('/password-recovery', requestAttemptsMiddleware, email, ExpressErrorValidator, authController.passwordRecovery.bind(authController))
authRouter.post('/new-password', requestAttemptsMiddleware, newPassword, ExpressErrorValidator, authController.newPassword.bind(authController))