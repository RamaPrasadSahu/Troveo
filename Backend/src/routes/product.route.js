import { Router } from "express";
import {
    SearchFilterListProducts,
    ViewSingleProductDetails,
    FetchFeaturedProducts,
    FetchCategories,
    SubmitRatingReview,
    GetProductReviews
} from "../controllers/Product.controller.js";
import { Verifyjwt } from "../middleware/auth.middleware.js";

const router = Router();

// Public Product Exploration Routes
router.route("/").get(SearchFilterListProducts);
router.route("/featured").get(FetchFeaturedProducts);
router.route("/categories").get(FetchCategories);
router.route("/:id").get(ViewSingleProductDetails);

// Reviews & Ratings Routes
router.route("/:id/reviews")
    .get(GetProductReviews)
    .post(Verifyjwt, SubmitRatingReview);

export default router;
