import app from "./app.js";
import connectDb from "./src/config/database.js"

const port = process.env.PORT || 3000;
(async ()=>{
    try {
        await connectDb();
        app.listen(port , ()=>{
            console.log(`app is running on http://localhost:${port}`)
        })
    }catch(err){
        console.log(err);
        process.exit(1);
    }
})();