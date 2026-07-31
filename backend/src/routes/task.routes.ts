import { Router } from "express"
import {
    _create,
    _get,
    _getAll,
    _markCompletion,
    _rename,
    _priority,
    _getPriority,
    _date,
    _getDate,
    _delete
} from "../controller/task/task.controller"

const router: Router = Router()

router.post("/create",_create)
router.get("/get",_get)
router.get("/getall",_getAll)
router.patch("/markcompletion",_markCompletion)
router.patch("/rename",_rename)
router.patch("/priority",_priority)
router.get("/getpriority",_getPriority)
router.patch("/date",_date)
router.get("/getdate",_getDate)
router.delete("/delete",_delete)

export default router
