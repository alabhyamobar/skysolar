const app = require("./src/app");
const connectTODB = require("./src/config/database");

const PORT = process.env.PORT || 8000;

(async()=>{
    try {
        await connectTODB()
        app.listen(PORT,()=>{
            console.log(`server is running on port ${PORT}`);
        })
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
})()