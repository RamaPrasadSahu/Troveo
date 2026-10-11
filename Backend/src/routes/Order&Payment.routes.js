import { Router } from "express";
import {
    InitializePaymentIntent,
    PlaceOrder,
    UserOrderHistory,
    ViewSingleOrderDetails,
    CancelOrder,
    PaymentGatewayWebhook
} from "../controllers/Order&Payment.controller.js";
import { Verifyjwt } from "../middleware/auth.middleware.js";

const router = Router();

// Payment Webhook (Public / Verified by payment gateway signature)
router.route("/webhook").post(PaymentGatewayWebhook);

// Protected Order & Checkout Routes
router.route("/create-payment-intent").post(Verifyjwt, InitializePaymentIntent);
router.route("/").post(Verifyjwt, PlaceOrder);
router.route("/create-order").post(Verifyjwt, PlaceOrder);
router.route("/my-orders").get(Verifyjwt, UserOrderHistory);
router.route("/:orderId").get(Verifyjwt, ViewSingleOrderDetails);
router.route("/:orderId/cancel").put(Verifyjwt, CancelOrder);

export default router;
