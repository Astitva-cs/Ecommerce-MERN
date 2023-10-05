import slugify from 'slugify';
import categoryModel from '../models/categoryModel.js'

export const createCategoryController=async(req,res)=>{
  try {
    const {name}=req.body;
    if(!name){
        return res.status(401).send({message:"Name is required"});
    }
    const isexistingcate=await categoryModel.findOne({name})
    if (isexistingcate) {
        return res.status(200).send({
          success: true,
          message: "Category Already Exisits",
        });  
      } 

      const category =await new categoryModel({name,slug:slugify(name)}).save();
      res.status(201).send({
        success:true,
        message:"new category created",
        category,
      })


}catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        error,
        message:"Error in category",
    });
  }
}

//updateCategoryController

export const updateCategoryController=async(req,res)=>{
    try {
        const {name}=req.body;
        const {id}=req.params;
        const category=await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
       res.status(200).send({
        success:true,
        message:'category Updated Successfully',
        category
       })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'error in updation',
            error
        })
    }

}

// get all cat
export const categoryControlller = async (req, res) => {
    try {
      const category = await categoryModel.find({});
      res.status(200).send({
        success: true,
        message: "All Categories List",
        category,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while getting all categories",
      });
    }
  };
  
  // single category
  export const singleCategoryController = async (req, res) => {
    try {
      const category = await categoryModel.findOne({ slug: req.params.slug });
      res.status(200).send({
        success: true,
        message: "Get SIngle Category SUccessfully",
        category,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error While getting Single Category",
      });
    }
  };
  
  //delete category
  export const deleteCategoryCOntroller = async (req, res) => {
    try {
      const { id } = req.params;
      const category=await categoryModel.findByIdAndDelete(id);
      res.status(200).send({
        success: true,
        message: "Category Deleted Successfully",
        category,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "error while deleting category",
        error,
      });
    }
  };
