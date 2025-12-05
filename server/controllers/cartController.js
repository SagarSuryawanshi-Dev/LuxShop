import Cart from "../models/cartModels.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    console.log("Body", req.body);

    if ( !productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "All feilds are Required",
      });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      const newCart = await Cart.create({
        userId,
        products: [{ productId, quantity, price: 0 }],
      });
      return res.status(201).json({
        success: true,
        message: "Cart Created Successfully",
        newCart,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
