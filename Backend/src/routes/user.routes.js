import { Router } from "express";
import {
    GetUserProfile,
    UpdateProfileAndAvatar,
    ChnagePassword,
    GetSavedAddresses,
    AddSavedAddress,
    UpdateSavedAddress,
    DeleteSavedAddress
} from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { Verifyjwt } from "../middleware/auth.middleware.js";

const router = Router();

// Profile Routes
router.route("/").get(Verifyjwt, GetUserProfile).put(Verifyjwt, upload.single("avatar"), UpdateProfileAndAvatar);
router.route("/profile").get(Verifyjwt, GetUserProfile).put(Verifyjwt, upload.single("avatar"), UpdateProfileAndAvatar);
router.route("/change-password").put(Verifyjwt, ChnagePassword);

// Address Management Routes
router.route("/addresses").get(Verifyjwt, GetSavedAddresses).post(Verifyjwt, AddSavedAddress);
router.route("/addresses/:addressId").put(Verifyjwt, UpdateSavedAddress).delete(Verifyjwt, DeleteSavedAddress);

export default router;