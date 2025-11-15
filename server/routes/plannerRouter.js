const Router = require("express")
const router = new Router()
const plannerController = require("../controllers/plannerContoller")

router.post("/chapter", plannerController.createChapter)
router.post("/chapter/:chapterId", plannerController.createSubchapter)
router.get("/chapters/:userId", plannerController.getAll)
router.get("/chapter/:chapterId", plannerController.getOne)
router.get("/chapter/:chapterId/subchapters", plannerController.getAllSubchapters)
router.get("/chapter/:chapterId/:noteId", plannerController.getOneNote)
router.put("/chapter/:chapterId/:noteId", plannerController.saveContent)
router.delete("/chapter/:chapterId", plannerController.deleteChapter)

module.exports = router