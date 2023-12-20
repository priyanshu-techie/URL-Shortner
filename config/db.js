import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({path:"./config/.env"})

export default function connect(){
    mongoose.connect( process.env.DB_STRING )
    .then(()=>console.log('Connected to MongoDB')) // no callbacks used now, instead use promise or async await
    .catch(err=>console.error('Could not connect to MongoDB',err));
}

