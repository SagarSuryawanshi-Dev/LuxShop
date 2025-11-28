import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Product Name is Required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Product Description is required"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Product Price is required"],
    trim: true,
    min: 0,
  },
  category: {
    type: String,
    required: [true, "Product Category is required"],
    trim: true,
  },
  rating: {
    type: Number,
    default: 0,
    required:[true,"Product Rating is Required"],
    trim: true,
  },
  Stock: {
    type: Number,
    min: 0,
    trim: true,
  },
  brand: {
    type: String,
    trim: true,
  },
  images: [
    {
      public_id: { type: String },
      url: { type: String },
    }
  ],

  revewis: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"

      },
      name: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
    }
  ],
  cratedBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }
},
{timeStamps:true});


const product = mongoose.model("Product", productSchema);
export default product;
