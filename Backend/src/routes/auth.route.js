import { Router } from "express";
import {
    registeruser,
    Login,
    logOut,
    RefreshAccesstoken,
    ForgotPassword,
    Resetpassword
} from "../controllers/auth.controller.js";
import { Verifyjwt } from "../middleware/auth.middleware.js";

const router = Router();

// Authentication Routes
router.route("/register").post(registeruser);
router.route("/login").post(Login);
router.route("/logout").post(Verifyjwt, logOut);
router.route("/refresh-token").post(RefreshAccesstoken);
router.route("/forgot-password").post(ForgotPassword);
router.route("/reset-password/:token").post(Resetpassword);

export default router;
