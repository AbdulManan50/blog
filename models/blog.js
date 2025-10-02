const { Schema, model } = require("mongoose");


const blogSchema = new Schema({

    tital:{
        type:String,
        require:true
    },
    body:{
        type:String,
        require:true
    },
    coverImageUrl:{
        type:String,
        require:false  
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }

} ,{timestamps:true})

const Blog = model("blog",blogSchema)

module.exports= Blog