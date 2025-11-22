import app from "./app.js";
import { connectDB } from "./src/config/db.js";

const port = process.env.PORT || 6000;
connectDB();

app.listen(port,()=> {
    console.log(`Server ins running on port ${port}`)
})






