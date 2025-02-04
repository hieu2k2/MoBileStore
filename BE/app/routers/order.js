const orderController = require("../controllers/orderController");
const router = require("express").Router();

router.get("/user/:id", orderController.getOrderByUser);
router.post('/search', orderController.getAllOrder);
router.get("/searchByName", orderController.searchOrderByName);

router.get('/:id',  orderController.getOrderById);
router.post('/', orderController.createOrder)
router.put('/:id', orderController.updateOrder)
router.delete("/:id", orderController.deleteOrder);

module.exports = router;