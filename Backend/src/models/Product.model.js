import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
    {
        average: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },

        count: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    { _id: false }
);


const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        description: {
            type: String,
            default: "",
            trim: true,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        discountPrice: {
            type: Number,
            default: null,
            min: 0,
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },

        brand: {
            type: String,
            trim: true,
            default: "",
        },

        stock: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
        },

        images: {
            type: [String],
            default: [],
        },

        ratings: {
            type: ratingSchema,
            default: () => ({
                average: 0,
                count: 0,
            }),
        },

        isFeatured: {
            type: Boolean,
            default: false,
        },

        attributes: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        },
    },
    {
        timestamps: true,
    }
);


const Product = mongoose.model("Product", productSchema);

export default Product;