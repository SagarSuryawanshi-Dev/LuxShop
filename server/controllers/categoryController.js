import Category from "../models/categoryModels.js";
import slugify from "slugify";

export const createCategory = async (req, res) => {
  try {
    let { name, parent } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: "Name is required" });
    }

     name = name.trim();
    const slug = slugify(name, { lower: true, strict: true });

    const categoryExists = await Category.findOne({ slug });
    if (categoryExists) {
      return res.status(400).json({ success: false, message: "Category already exists" });
    }

    if (parent) {
      const parentExists = await Category.findById(parent);
      if (!parentExists) {
        return res.status(400).json({ success: false, message: "Invalid parent category" });
      }
    }

    const newCategory = new Category({
      name,
      slug,
      parent: parent || null
    });

    await newCategory.save();

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      category: newCategory
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllCategory = async(req,res)=> {
    try {
        const categories = await Category.find().populate('parent',"name")
        return res.status(200).json({
            success:true,
            categories
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

export const updatecategory = async(req,res) => {
    try {
        const {name,parent} = req.body;
        const id = req.params.id;
        const updated = await Category.findByIdAndUpdate(
            id,
            {name},
            {new:true}
        );

        return res.status(200).json({
            success:true,
            message:"Category updated Successfully",
            category:updated
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}



export const  deletecategory = async(req,res)=>{
    try {
        const {id} = req.params
         await Category.findByIdAndDelete(id)
         return res.status(200).json({
            success:true,
            message:"successfully Delete"
         })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}