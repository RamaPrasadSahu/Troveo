import {asyncHandler} from "../utils/AsyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {User} from "../models/user.model.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"

const generateAccessAndRefreshToken = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const AccessToken =  user.generateAccessToken()
        const RefreshToken =  user.generateRefreshToken()
        user.refreshToken=refreshToken
        await user.save({validateBeforeSave : false})
        return {AccessToken,RefreshToken}
    } catch (error) {
        throw new ApiError(500,"Something Went Wrong While Generating Access And Refresh Token")
    }
}

const registeruser = asyncHandler( async(req,res)=>{

})

const Login = asyncHandler( async (req,res) =>{

})

const logOut = asyncHandler( async(req,res) =>{

})

const RefreshAccesstoken = asyncHandler ( async (req,res) =>{

}) 

const ForgotPassword = asyncHandler ( async(req,res)=>{

})

const Resetpassword = asyncHandler ( async(req,res) =>{

})

export {
    generateAccessAndRefreshToken,
    registeruser,
    Login,
    logOut,
    RefreshAccesstoken,
    ForgotPassword,
    Resetpassword
}