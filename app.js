const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("../AeroStay_Project/models/listing");
const path = require("path");
const methodOverride = require("method-override"); //method override for PUT request 
const ejsMate = require("ejs-mate");



const MONGO_URL = "mongodb://127.0.0.1:27017/aerostay";

//calling to main functiion 
main().then(() => {
    console.log("connected to DB"); 
}).catch((err) => {
    console.log(err);
});
async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine","ejs" );
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true})); //for url data encoded
app.use(methodOverride("_method")); //method Override
app.engine("ejs",ejsMate); //set ejs engine
app.use(express.static(path.join(__dirname,"/public")));

app.use("/",(req,res,next)=>{
    // res.send("i am root midleware");
    next();
});

app.get("/", (req,res)=>{
    res.send("Hi, i am root");
});

//inex Route
app.get("/listings",async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("listing/index.ejs", {allListings});
});

//new route
app.get("/listings/new", (req,res)=>{
    res.render("listing/new.ejs");
});

//show route
app.get("/listings/:id",async (req,res,next)=>{
    try{
        let {id} = req.params;
       if(id){
        const listing = await Listing.findById(id);
        res.render("listing/show.ejs",{listing});
        return next();
       }
       else{
        throw new Error("id not found")
       }
    }
    catch(err){
        next(new Error("page not found"))
    }
    
});

//create route
app.post("/listings",async (req,res)=> {
    const newListing = new Listing (req.body.listing);
    newListing.save();
    res.redirect("/listings");
});

//edit route 
app.get("/listings/:id/edit", async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listing/edit.ejs",{listing});
});

//update route
app.put("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
});

//Delete route
app.delete("/listings/:id", async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})

/* app.get("/testlisting", async (req,res)=>{
    let sampleListing = new Listing ({
        title : "My Dream Villa",
        description : "By the beach",
        price : 16000,
        lication : "maharashtra , pune",
        country : "India"
    });

    await sampleListing.save();
    console.log("Save in DB");
    res.send("Sucessful trsting"); 
}); */

//app started
app.listen(8080,()=>{
    console.log("server is listing to port 8080");
    
});

app.all("*",(req,res)=>{
    res.send("page not found");
})
//error handeling middleware
app.use((err,req,res,next)=>{
    let {message}=err;
    res.send(message);
})