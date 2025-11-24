import app from "./app.js";
import connectDB from "./config/db.js"

const port = process.env.PORT || 6000;


app.listen(port,()=> {
    connectDB()
    console.log(`Server ins running on port ${port}`)
})






