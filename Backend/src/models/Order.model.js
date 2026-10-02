import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
    },
    { _id: false }
);

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        orderItems: {
            type: [orderItemSchema],
            validate: [
                (items) => items.length > 0,
                "Order must contain at least one item",
            ],
        },
        shippingAddress: {
            street: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
            postalCode: {
                type: String,
                required: true
            },
            country: {
                type: String,
                required: true
            },
        },
        paymentMethod: {
            type: String,
            required: true,
            enum: ["Stripe", "Razorpay", "COD"],
        },
        paymentResult: {
            id: {
                type: String
            },
            status: {
                type: String
            },
            update_time: {
                type: String
            },
        },
        itemsPrice: {
            type: Number,
            required: true,
            default: 0.0
        },
        taxPrice: {
            type: Number,
            required: true,
            default: 0.0
        },
        shippingPrice: {
            type: Number,
            required: true,
            default: 0.0
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0.0
        },
        orderStatus: {
            type: String,
            enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
            default: "Pending",
        },
        isPaid: {
            type: Boolean,
            default: false
        },
        paidAt: {
            type: Date
        },
        isDelivered: {
            type: Boolean, default: false
        },
        deliveredAt: { type: Date },
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;