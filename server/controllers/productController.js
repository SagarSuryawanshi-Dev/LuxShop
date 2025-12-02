import product from "../models/productModel.js";
import Category from "../models/categoryModels.js";

export const createProduct = async (req, res) => {
  try {
    const { productName, description, price, category, brand } = req.body;

    if (!productName || !description || !price || !category || !brand) {
      return res.status(400).json({
        success: false,
        message: "all feilds are Required",
      });
    }

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: "Category ID Not Found",
      });
    }
    const newProduct = await product.create({
      productName,
      description,
      price,
      category,
      brand,
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
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const productDetails = await product.findById(id);

    if (!productDetails) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }
    return res.status(200).json({
      success: false,
      productDetails,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const productExists = await product.findById(productId);
    if (!productExists) {
      return res.status(400).json({
        success: false,
        message: "Product Not Exists",
      });
    }
    await product.findByIdAndDelete(productId);

    return res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const categoryProduct = async (req, res) => {
  try {
    const  categoryId  = req.params.id;
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category Not Found",
      });
    }
    const categoryProduct = await product
      .find({ category: categoryId })
      .populate("category", "name slug")
      .lean();
    return res.status(200).json({
      success: true,
      category: category.name,
      count: categoryProduct.length,
      categoryProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
