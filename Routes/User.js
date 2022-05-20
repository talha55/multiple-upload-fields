// Express Router
const express = require("express");
const router = express.Router();

// Add Multer
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './Uploads/' + file.fieldname.charAt(0).toUpperCase() + file.fieldname.slice(1))
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const extention = file.originalname.split('.').pop()
        cb(null, file.fieldname + '-' + uniqueSuffix + "." + extention)
    }
})
const upload = multer({ storage: storage })

// Middleware
const jwtAuth = require("../Middleware/JWT")

// Controller
const UserController = require("../Controllers/UserController")

// Routes
router.post("/register", upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'document', maxCount: 1 },
    { name: 'resume', maxCount: 1 },
    { name: 'cnic', maxCount: 1 }
]), UserController.register)
router.post("/login", UserController.login)
router.get("/user", jwtAuth, UserController.userInfo)

module.exports = router