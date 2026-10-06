import {asyncHandler} from "../utils/AsyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {User} from "../models/user.model.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import { generateAccessAndRefreshToken } from "./auth.controller.js"

const GetUserCart = asyncHandler ( async(req,res) =>{

})

const AddItemtoCart = asyncHandler ( async(req,res) =>{

})

const UpdateItemQuantity = asyncHandler ( async(req,res) =>{

})

const RemoveItemfromCart = asyncHandler ( async(req,res) =>{

})

const ClearEntireCart	 = asyncHandler ( async(req,res) =>{

})
