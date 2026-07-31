import { Router } from "express";
import {_signup,_signin,_get,_signout, _getno} from "../controller/user/user.controller"
import authMiddleware from "../middleware/auth.middleware"


const router:Router = Router();

router.post("/signup",_signup);
router.post("/signin",_signin);
router.post("/signout",authMiddleware,_signout);
router.get("/get",authMiddleware,_get);
router.get("/getno",authMiddleware,_getno);

export default router