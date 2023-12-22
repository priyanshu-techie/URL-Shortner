import { Router } from 'express';
const router = Router();
import linkDb from '../Model/linkSchema.js';
import { customAlphabet,isUrl } from '../utils/utils.js';
const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 5);


// get the main page
router.get('/',(req,res)=>{
    res.render('main.ejs');
})

// get analytics page
router.get('/getAnalytics',(req,res)=>{
    res.render('getAnalytics.ejs');
})


// post the url
router.post('/submitUrl',async (req,res)=>{
    let url = req.body.longUrl;
    if(isUrl(url)){
        // 1.generate code  2.save in db 3. send to user
        const id=nanoid();
        
        const completeUrl = `${req.protocol}://${req.hostname}/`;
        const shortened = completeUrl + id ;
        console.log(shortened);
        const details = await linkDb.create({ originalLink:url, shortLink:shortened, uniqueId:id });
        res.render('success.ejs',{details});
    }
    // send the error msg with the button to redirect to the home page 
    else{
        res.render('error.ejs',{message:"Provided URL is not a correct URL !! URL's are of the form : https://www.example.com OR https://example.com"});
    }
});

router.post('/getAnalytics',async (req,res)=>{
    // check if url, if yes continue else error.ejs
    let url = req.body.shortUrl;
    if(isUrl(url)){
        // take out the id and find in db and then redirect to ananlytics
        const data = new URL(url);
        const id = data.pathname.substring(1);
        res.redirect( `/analytics/${id}`);
    }
    else{
        res.render('error.ejs',{message:"Provided URL is not a correct URL !! URL's are of the form : https://www.example.com OR https://example.com"})
    }
})


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
        res.redirect('/');
    }
})


router.get('/analytics/:id',async (req,res)=>{
    // find the id from the db
    const document = await linkDb.find({uniqueId:req.params.id}).lean();
    if(document.length !== 0 ){
        res.render('analytics.ejs',{document:document[0]})
    }
    else{
        // no page found wit that link 
        res.render('error.ejs',{message:"No Data Found !!!"});
    }
})

// 404
router.get('*',(req,res)=>{
    res.render('page404.ejs');
})

export default router;
