import express from "express"
import { add_Product, add_to_cart, delete_products, get_order, get_products, get_user_cart, make_order, register_complaint, update_cart_quantity, update_order_status, update_products } from "../../controllers/cirqleStore/productmangeControllers.js";


const router = express.Router();

router.post("/add_product" ,add_Product);
router.get("/get_product", get_products);
router.put("/update_product",update_products)
router.delete("/delete_product",delete_products)

router.post("/add_to_cart" ,add_to_cart);
router.get("/get_user_cart" ,get_user_cart);
router.put("/update_cart_quantity" ,update_cart_quantity);
router.post("/place_order" ,make_order);
router.get("/get_order" ,get_order);
router.put("/update_order_status",update_order_status)
router.post("/register_complaint",register_complaint)

export default router;