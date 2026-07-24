import { Router } from "express";
import {_create} from "../controller/signup.controller"


const router:Router = Router();

router.post("/create",_create);

export default router