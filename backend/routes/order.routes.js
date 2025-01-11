const express = require("express");
const { placeOrder, showOrders } = require("../controllers/order.controller");
const authMiddleware = require("../middlewares/auth");
const router = express.Router();

router.post("/order",authMiddleware, placeOrder);
router.get("/orders",authMiddleware, showOrders);

module.exports = router;
