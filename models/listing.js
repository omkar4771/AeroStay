const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title : {
        type : String,
        required : true,
    },
    description : String,
    image :{ 
        type : String,
        default : "https://media.istockphoto.com/id/1150545984/photo/upscale-modern-mansion-with-pool.jpg?s=1024x1024&w=is&k=20&c=t-C3iLfiSNYwsjNNW4WnojYsFcj3ty4wVb3PQUUOaBM=",
        set :(v) => v === "" 
        ? "https://media.istockphoto.com/id/1150545984/photo/upscale-modern-mansion-with-pool.jpg?s=1024x1024&w=is&k=20&c=t-C3iLfiSNYwsjNNW4WnojYsFcj3ty4wVb3PQUUOaBM=" 
        : v, 
        //ternary operator check if link is blank then set default link
    },
    price : Number,
    location : String,
    country : String,
});

const Listing  = mongoose.model("Listing", listingSchema);
module.exports = Listing;

