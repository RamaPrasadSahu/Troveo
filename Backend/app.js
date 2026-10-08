import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"    
import errorHandler from "./src/middleware/ErrorHandler.middleware.js"
const app =express()

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended : true , limit : "16kb" }))
app.use(cookieParser())

import Userrouter from "./src/routes/user.routes,js"
app.use(errorHandler)
import authrouter from "./src/routes/auth.route.js"
import Adminrouter from "./src/routes/AdminDashboard.routes.js"
import Cartrouter from "./src/routes/Cart.routes.js"
import OrderPaymentrouter from "./src/routes/Order&Payment.routes.js"
import Productrouter from "./src/routes/product.route.js"
import Wishlistrouter from "./src/routes/Wishlist.routes.js"


app.use("/api/v1/profile",Userrouter)
app.use("/api/v1/auth",authrouter)
app.use("/api/v1/Admin",Adminrouter)
app.use("/api/v1/CartDetails",Cartrouter)
app.use("/api/v1/OrderPayment",OrderPaymentrouter)
app.use("/api/v1/ProductDetails",Productrouter)
app.use("/api/v1/Wishlist",Wishlistrouter)

export {app}
