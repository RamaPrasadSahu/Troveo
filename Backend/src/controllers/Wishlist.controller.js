import {asyncHandler} from "../utils/AsyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {User} from "../models/user.model.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import { generateAccessAndRefreshToken } from "./auth.controller.js"


const FetchWishlistItems = asyncHandler( async(requestAnimationFrame,res)=>{

})

const ToggleItemAddRemove	 = asyncHandler( async(requestAnimationFrame,res)=>{

})

const ClearEntireWishlist	 = asyncHandler( async(requestAnimationFrame,res)=>{

})