import { Router } from "express";
import {
    GetUserCart,
    AddItemtoCart,
    UpdateItemQuantity,
    RemoveItemfromCart,
    ClearEntireCart
} from "../controllers/Cart.controller.js";
import { Verifyjwt } from "../middleware/auth.middleware.js";

const router = Router();

// Protect all cart routes
router.use(Verifyjwt);

// Cart Routes
router.route("/")
    .get(GetUserCart)
    .delete(ClearEntireCart);

router.route("/items")
    .post(AddItemtoCart);

router.route("/items/:productId")
    .put(UpdateItemQuantity)
    .delete(RemoveItemfromCart);

router.route("/clear")
    .delete(ClearEntireCart);

export default router;
