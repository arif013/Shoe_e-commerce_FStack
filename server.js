import dotenv from 'dotenv'
dotenv.config()
// Imports
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
const app = express();

// Middleware
app.use(express.json())
app.use(cors())
// Database 
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true,
useUnifiedTopology: true,
}).then(() => {
    console.log('Database connected');
    app.listen(3001, () => {
      console.log('Server started on port 3001');
    });
  })
  .catch((error) => {
    console.log(error);
  });

const shoeSchema = new mongoose.Schema({
    id: Number,
    title: String,
    price: Number,
    url: String,
})
const man = mongoose.model("man", shoeSchema)

app.get("/",(req,res)=>{
    man.find({}).then(
        items=>res.json(items)
    ).catch(err=>console.log(err))
    // res.send("express here")
})



// Static page for form to upload data
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploadform', express.static(path.join(__dirname, 'uploadForm')));

// Using multer to upload data to db
import multer from 'multer'

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb){
    return cb(null, `${Date.now()}-${file.originalname}`)
  },
});
const upload = multer({ storage: storage})
app.set("view engine", "html")
app.set("views", path.resolve("./uploadForm/views"))

// const upload = multer({ dest: 'uploads/' })

app.post("/uploadform",upload.single('image'),(req,res)=>{
  console.log(req.body);
  console.log(req.file);

  return res.redirect("/uploadform")
})





app.listen(3000,()=>console.log('Server started'));