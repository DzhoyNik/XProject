const Router = require("express")
const router = new Router()
const usersRouter = require("./usersRouter")
const servicesRouter = require("./servicesRouter")
const plannerRouter = require("./plannerRouter")
const uploadRouter = require("./imageRouter")

router.use("/users", usersRouter)
router.use("/services", servicesRouter)
router.use("/planner", plannerRouter)
router.use("/upload", uploadRouter)

module.exports = router