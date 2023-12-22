import linkSchema from "./Model/linkSchema.js";
import connect from "./config/db.js";

connect();

async function getData(){
    const data= await linkSchema.find({})
    console.log(data);
}

getData();
