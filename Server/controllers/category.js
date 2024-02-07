// const { Course_Status } = require("../../src/utils/constants")
const Category = require("../models/category")

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

exports.createCategory = async(req,res) =>{
    try{

        const {name,description}=req.body
        if(!name || !description){
            return res.json(402).json({
                success:false,
                message:"write both name and description"
            })
        }
        console.log("category")
        const newCategory = await Category.create({
            name:name,
            description:description
        })

        console.log("new category : ",newCategory)
        return res.status(200).json({
            success:true,
            message:"category created successfully"
        })
    } catch(error) {
        return res.status(401).json({
            success:false,
            message:error.message
        })
    }
}


// find all category 

exports.showAllCategory = async(req,res) => {
    try{
        const allCategory =  await Category.find({},{name:true,desc:true})
        res.status(200).json({
            success:true,
            message:"All Category Find Successfully ",
            data:allCategory
        })
    } catch(error) {
        console.log("errrpr",error)
        return res.status(401).json({
            success:false,
            message:error.message
        }) 
    }
}


// get specific category courses 

exports.categoryPageDetail = async(req,res) =>  {
    try{
        const categoryId = req.body.categoryId


         const selectedCategory = await Category.findById(categoryId)
        .populate(
            {
                path:"courses",
                match:{status:"Published"},
                populate:{
                    path:"ratingANDreviews"
                },
                populate:{
                    path:"category"
                }
            }
        ).exec();
        
        console.log("selected category",selectedCategory)
        if(!selectedCategory){
            return res.json({
                success:false,
                message:"Data not Found"
            })
        }


        

        // get different courses 

        const categoriesExceptSelected = await Category.find({
                                    _id:{$ne:categoryId}
        })

        const differentCategory = await Category.findOne(categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]._id).populate({
            path:"courses",
            match:{status:"Published"},
            populate:{
                path:"category"
            }
        }).exec()



        // // top selling courses 

        const allCategories = await Category.find()
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: {
            path: "instructor",
          },
          populate:{
            path:"category"
        }
        })
        .exec()
        
        const allCourses = allCategories.flatMap((category) => category.courses)

        const mostSellingCourses = allCourses
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 10)
            // yha p dekhna h sold khya h mere hissab se student eroolled ki length check honi chahiye 

        


        // return 
        if (selectedCategory.courses.length === 0) {
            console.log("No courses found for the selected category.")
            return res.status(200).json({
                success:true,
                data:{
                    selectedCategory,
                    differentCategory,
                    mostSellingCourses
                }
            })
        }

        return res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                differentCategory,
                mostSellingCourses
            }
        })
    } catch(error){
        console.log("error occur find specific category course : ",error)
        return res.status(401).json({
            success:false,
            message:error.message
        })
    }
}