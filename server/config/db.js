const mongoose = require("mongoose");
require("dotenv").config();

 exports.connect = async () => {
     await mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("DB Connected Successfully"))
    .catch( (error) => {
        console.log(`${`DB Connection Failed ${error}`}`);
        console.error(error.message);
        process.exit(1);
    } )
};