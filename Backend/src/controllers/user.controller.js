import {asyncHandler} from "../utils/AsyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {User} from "../models/user.model.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import { generateAccessAndRefreshToken } from "./auth.controller.js"


const GetUserProfile = asyncHandler ( async(req,res) =>{

})

const UpdateProfileAndAvatar = asyncHandler ( async(req,res) =>{

})

const ChnagePassword = asyncHandler ( async(req,res)=>{

})

const GetSavedAddresses = asyncHandler ( async(req,res)=>{

})

const AddSavedAddress = asyncHandler ( async(req,res)=>{

})

const UpdateSavedAddress = asyncHandler ( async(req,res)=>{

})

const DeleteSavedAddress = asyncHandler( async(req,res)=>{

})

export {
    GetUserProfile,
    UpdateProfileAndAvatar,
    ChnagePassword,
    GetSavedAddresses,
    AddSavedAddress,
    UpdateSavedAddress,
    DeleteSavedAddress
}