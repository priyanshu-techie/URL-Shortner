import { Router } from 'express';
const router = Router();
import linkDb from '../Model/linkSchema.js';
import { customAlphabet,isUrl } from '../utils/utils.js';
const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 5);


// get the main page
router.get('/',(req,res)=>{
    res.render('main.ejs');
})


// post the url
router.post('/submitUrl',async (req,res)=>{
    let url = req.body.longUrl;
    console.log("given: ", url);
    if(isUrl(url)){
        console.log('entered if')
        // 1.generate code  2.save in db 3. send to user
        const id=nanoid();
        const shortened = `${req.url}/${id}`;
        console.log(shortened);
        const details = await linkDb.create({ originalLink:url, shortLink:shortened, uniqueId:id });
        res.render('success.ejs',{details});
    }
    // send the error msg with the button to redirect to the home page 
    else{
        res.render('failure.ejs');
    }
});


// redirect to the original of the shortened url 
router.get('/:id',async (req,res)=>{
    // find the id from the db
    const document = await linkDb.find({uniqueId:req.params.id});
    if(document.length !== 0 ){
        // redirect to the original , increase the count
        await linkDb.findOneAndUpdate({uniqueId:req.params.id},{ $inc:{visits:1}});
        res.redirect(document[0].originalLink);
    }
    else{
        // no page found wit that link 
        res.render('noPage.ejs');
    }
})

// 404
router.get('*',(req,res)=>{
    res.render('page404.ejs');
})

export default router;
