import "dotenv/config"
import "./db"
import "./models/Video"
import  app from "./server"


const PORT = 4000
const showDomain =() =>console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`);
app.listen(PORT,showDomain)