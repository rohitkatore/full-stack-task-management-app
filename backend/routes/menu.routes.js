const express = require("express") ;
const { showMenu, addMenu, editMenu, deleteMenu } = require("../controllers/menu.controller");
const authMiddleware = require("../middlewares/auth");
const router = express.Router() ;

router.get("/menu",showMenu) ;
router.post("/menu",authMiddleware,addMenu) ;
router.put("/menu/:id",authMiddleware,editMenu) ;
router.delete("/menu/:id",authMiddleware,deleteMenu) ;

module.exports = router;