const express = require("express")
const multer = require("multer")
const path = require("path")
const uuid4 = require("uuid4")

const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => 
        cb(null, path.join(__dirname, "../static/planner/images")),
    filename: (req, file, cb) => {
        const filename = uuid4() + path.extname(file.originalname)
        cb(null, filename)
    }
})

const upload = multer({ storage })

router.post("/image", upload.single("image"), (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" })
    res.json({ filename: req.file.filename, path: `/static/planner/images/${req.file.filename}` })
})

module.exports = router