import {asyncHandler} from "../utils/AsyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {User} from "../models/user.model.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import { generateAccessAndRefreshToken } from "./auth.controller.js"

const InitializePaymentIntent	 = asyncHandler ( async(req,res) =>{

})

const PlaceOrder = asyncHandler ( async(req,res) =>{

})

const UserOrderHistory= asyncHandler ( async(req,res) =>{

})

const ViewSingleOrderDetails	 = asyncHandler ( async(req,res) =>{

})

const CancelOrder= asyncHandler ( async(req,res) =>{

})

const PaymentGatewayWebhook= asyncHandler ( async(req,res) =>{

})