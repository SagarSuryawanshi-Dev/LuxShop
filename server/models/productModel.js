import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
    index: true,
  },
  images: [
    {
      url: String,
      public_id: String
    }
  ],
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
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
  },
  stock: {
    type: Number,
    min: 0,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: { type: String },
      url: { type: String },
    }
  ],
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      name: { type: String },
      rating: { type: Number },
      comment: { type: String },
    }
  ],
  createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  }
},
{ timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;
