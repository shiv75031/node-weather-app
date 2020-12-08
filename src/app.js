const path=require('path');
const express=require('express');
const hbs=require('hbs');
const geocode= require('./utils/geocode');
const forecast= require('./utils/forecast');

const app=express();
const port= process.env.PORT || 3000;

//Path for express config
const publicDirectryPath=path.join(__dirname,"../public");
const viewsPath=path.join(__dirname,"../templates/views");
const partialsPath=path.join(__dirname,"../templates/partials")

//setup handlebar engine & view location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory 
app.use(express.static(publicDirectryPath));

app.get('',(req,res)=>{
    res.render('index',{
        title:"weather app",
        name:"shivendra"
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"about",
        name:"shivendra"
    });
});

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help",
        message:"Happy to help you",
        name:"shivendra"
    })
})

app.get("/help/*",(req,res)=>{
    res.render("404",{
        name:"shivendra",
        title:"404",
        errorMessage:"Help article not avalable"
    });
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"You must provide an address!"
        });
    }

    geocode(req.query.address,(error,{ latitude, longitude, location}={})=>{
        if(error){
            return res.send({error});
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error});
            }

            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            });
        });
    });
});

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"You must provide a search term"
        });
    }

    console.log(req.query.search);
    res.send({
        products:[]
    });
});

app.get('*',(req,res)=>{
    res.render("404",{
        name:"shivendra",
        title:"404",
        errorMessage:"Page not found"
    });
})


app.listen(port,()=>{
    console.log("Server is up on port"+port);
});