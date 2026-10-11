import { Router } from "express";
import {
    FetchWishlistItems,
    ToggleItemAddRemove,
    ClearEntireWishlist
} from "../controllers/Wishlist.controller.js";
import { Verifyjwt } from "../middleware/auth.middleware.js";

const router = Router();

// Protect all wishlist routes
router.use(Verifyjwt);

// Wishlist Routes
router.route("/")
    .get(FetchWishlistItems)
    .delete(ClearEntireWishlist);

router.route("/toggle/:productId")
    .post(ToggleItemAddRemove);

router.route("/clear")
    .delete(ClearEntireWishlist);

export default router;
