import { Router } from "express"
import { _create, _get, _delete } from "../controller/comment/comment.controller"

const router: Router = Router()

router.post("/create", _create)
router.get("/get", _get)
router.delete("/delete", _delete)

export default router
