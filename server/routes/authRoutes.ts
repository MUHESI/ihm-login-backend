import express from "express";
import { validRegister } from "../middleware/valid";
import autCtrl from "../controllers/auth/authCtrl";
import userIHMCtrl from "../controllers/user/UserIHMCtrl";

const router = express.Router();

// for IHM
router.post("/ihm/login", userIHMCtrl.loginUser);
router.post("/ihm/register", userIHMCtrl.register);

export default router;
