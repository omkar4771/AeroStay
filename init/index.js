const mongoose = require("mongoose"); // require mongoose
const initData = require("../init/data"); //require data
const Listing = require("../models/listing"); //require model


//connection establish
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

const initDB = async () =>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data); //initData is object & we access key "data"
    console.log("data was initialized");
};

initDB(); //calling to function initDB
