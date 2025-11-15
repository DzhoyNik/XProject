const Router = require("express")
const router = new Router()
const usersContoller = require("../controllers/usersController")
const authMiddleware = require("../middlewares/authMiddleware")

router.post("/sign_up", usersContoller.sign_up)
router.post("/sign_in", usersContoller.sign_in)
router.get("/", usersContoller.getAll)
router.get("/auth", authMiddleware, usersContoller.check)

module.exports = router