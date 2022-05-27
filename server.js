const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.urlencoded({ extended: false }))
mongoose.connect('mongodb://localhost/urlShortener', {
  useNewUrlParser: true, useUnifiedTopology: true
})

const ShortUrl = require('./models/shortUrl');



app.set('view engine', 'ejs');

app.get('/',async (req,res)=>{
    fullUrl = req.query.full_url;
    console.log(fullUrl);
    if(fullUrl == null){
        res.render('indexFront')
    }else{
        const shortUrls = await ShortUrl.findOne({full:fullUrl});
        res.render('index',{shortUrls:shortUrls})
    }
    
})

app.post('/short', async(req,res)=>{
    if(ShortUrl.findOne({full:req.body.fullURL}) !== null){
        await ShortUrl.create({ full: req.body.fullURL})
    }
    res.redirect('/?full_url='+req.body.fullURL);
})

app.get('/:shortUrl', async(req,res)=>{

    const urlObject = await ShortUrl.find({short:req.params.shortUrl})
    if(urlObject == null){
        res.sendStatus(404);
    }
    res.redirect(urlObject.full);

})

app.listen(3000);