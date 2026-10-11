import { Router } from "express";
import {
    DashboardAnalyticsMetrics,
    ListAllAdminProducts,
    CreateProduct,
    UpdateProduct,
    DeleteProduct,
    UpdateCategory,
    ListAllSystemOrders,
    UpdateOrderFulfillmentStatus,
    ListAllRegisteredUsers,
    UpdateUserRole
} from "../controllers/AdminDashboard.controller.js";
import { Verifyjwt } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

// Dashboard & Analytics
router.route("/dashboard").get(Verifyjwt, DashboardAnalyticsMetrics);
router.route("/stats").get(Verifyjwt, DashboardAnalyticsMetrics);

// Admin Product Management
router.route("/products")
    .get(Verifyjwt, ListAllAdminProducts)
    .post(Verifyjwt, upload.array("images", 5), CreateProduct);

router.route("/products/:id")
    .put(Verifyjwt, upload.array("images", 5), UpdateProduct)
    .delete(Verifyjwt, DeleteProduct);

// Category Management
router.route("/categories/:id")
    .put(Verifyjwt, upload.single("image"), UpdateCategory);

// Admin Order Management
router.route("/orders")
    .get(Verifyjwt, ListAllSystemOrders);

router.route("/orders/:orderId/status")
    .put(Verifyjwt, UpdateOrderFulfillmentStatus);

// User Management
router.route("/users")
    .get(Verifyjwt, ListAllRegisteredUsers);

router.route("/users/:userId/role")
    .put(Verifyjwt, UpdateUserRole);

export default router;
