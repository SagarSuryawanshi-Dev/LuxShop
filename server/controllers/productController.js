import Category from "../models/categoryModels.js";
import Product from "../models/productModel.js";
import uploadOnCLoudinary from "../utlis/cloudinary.js";

export const createProduct = async (req, res) => {
  try {
    const { productName, description, price, category, brand } = req.body;

    console.log("Body", req.body);
    console.log("reqFile", req.file);

    if (!productName || !description || !price || !category || !brand) {
      return res.status(400).json({
        success: false,
        message: "all feilds are Required",
      });
    }

    let imageUrl; // declare outside
    if (req.file) {
      const localFilePath = req.file.path;
      const uploadimage = await uploadOnCLoudinary(localFilePath);

      if (!uploadimage) {
        return res.status(500).json({
          success: false,
          message: "Image Upload Failed",
        });
      }

      imageUrl = uploadimage.secure_url;
    }

    console.log("Uploaded_Image", imageUrl);

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: "Category ID Not Found",
      });
    }
    const newProduct = await Product.create({
      productName,
      description,
      price,
      category,
      brand,
      image: imageUrl,
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
    const categoryId = req.params.id;
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

export const filterProduct = async (req, res) => {
  try {
    let {
      category,
      brand,
      rating,
      minPrice,
      maxPrice,
      sort,
      search,
      page = 1,
      limit = 10,
    } = req.query;

    // Build filter object
    const filterObject = {};

    if (category) filterObject.category = category;
    if (brand) filterObject.brand = brand;
    if (rating) filterObject.rating = { $gte: rating };

    if (minPrice || maxPrice) {
      filterObject.price = {};
      if (minPrice) filterObject.price.$gte = Number(minPrice);
      if (maxPrice) filterObject.price.$lte = Number(maxPrice);
    }

    // Search text (case insensitive)
    if (search) {
      filterObject.productName = { $regex: search, $options: "i" };
    }

    // Sorting
    let sortObject = {};
    if (sort === "price_low") sortObject.price = 1;
    if (sort === "price_high") sortObject.price = -1;
    if (sort === "rating_high") sortObject.rating = -1;
    if (sort === "rating_low") sortObject.rating = 1;
    if (sort === "newest") sortObject.createdAt = -1;

    // Pagination
    page = Number(page);
    limit = Number(limit);
    const skip = (page - 1) * limit;

    // Fetch products from DB
    const products = await Product.find(filterObject);

    const totalProducts = await Product.countDocuments(filterObject);
    const totalPages = Math.ceil(totalProducts / limit);

    return res.status(200).json({
      success: true,
      message: "Products fetched",
      // filterUsed: filterObject,
      // page,
      // limit,
      // totalProducts,
      // totalPages,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Error in getProducts:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
