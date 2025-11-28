import product from "../models/productModel.js";

export const createProduct = async (req, res) => {
  try {
    const { productName, description, price, rating, category } = req.body;

    if (!productName || !description || !price || !rating || !category) {
      return res.status(400).json({
        success: false,
        message: "all feilds are Required",
      });
    }

    const newProduct = await product.create({
      productName,
      description,
      price,
      rating,
      category,
    });
    return res.status(201).json({
      success: true,
      message: "Product Created Successfully",
      newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await product.find({}).skip(skip).limit(limit);
    return res.status(200).json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getProduct = async (req,res) => {
    try {
        const id = req.params.id;

        const productDetails = await product.findById(id)

        if(!productDetails){
            return res.status(404).json({
                success:false,
                message:"Product Not Found"
            })
        }
        return res.status(200).json({
            success:false,
            productDetails
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}
