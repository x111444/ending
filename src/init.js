import "dotenv/config"
import "./db.js"
import  app from "./server"


const PORT = 4000
const showDomain =() =>console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`);
app.listen(PORT,showDomain)