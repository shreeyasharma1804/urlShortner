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
        console.log("Front Page");
        res.render('indexFront')
    }else{
        console.log("Url page");
        const shortUrls = await ShortUrl.findOne({full:fullUrl});
        console.log(shortUrls);
        res.render('index',{shortUrls:shortUrls})
    }
    
})

app.post('/short', async(req,res)=>{
    if(ShortUrl.findOne({full:req.body.fullURL}) !== null){
        await ShortUrl.create({ full: req.body.fullURL})
    }
    res.redirect('/?full_url='+req.body.fullURL);
})

app.get('/:shortUrl', async (req, res) => {
    console.log(req.params.shortUrl);
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    console.log(shortUrl);
    if (shortUrl == null) return res.sendStatus(404);
    res.redirect(shortUrl.full)
})

app.listen(3000);