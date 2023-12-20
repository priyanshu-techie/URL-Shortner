import express, { urlencoded, json } from 'express';
const app = express();
import connect from './config/db.js';
import router from './Routes/routes.js';

// connecting to db
connect();
app.use(express.static('public'));

// for accessin req.body
app.use(urlencoded({extended:true}))
app.use(json());


app.set('view engine','ejs')

app.use('/',router);
app.listen(3000,()=>{
    console.log('go checkout http://localhost:3000');
})

