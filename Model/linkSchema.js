import { Schema,model } from "mongoose";

const linkSchema = new Schema({
    originalLink:{
        type:String,
        required:true
    },
    shortLink:{
        type:String,
        required:true
    },
    uniqueId:{
        type:String,
        required:true
    },
    visits:{
        type:Number,
        default:0
    }
});

export default model("links",linkSchema);