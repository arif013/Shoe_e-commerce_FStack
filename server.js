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
    gender: String,
    desc: String,
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
import multer from 'multer';
import { log } from 'console';
// import mongoose from 'mongoose';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });
app.set("view engine", "html");
app.set("views", path.resolve("./uploadForm/views"));

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const Shoe = mongoose.model('Shoe', shoeSchema);

app.post("/uploadform", upload.single('image'), (req, res) => {
  console.log(req.body);
  // console.log(req.body);
  console.log(req.file);

  // Create a new shoe document
  const shoe = new Shoe({
    title: req.body.title,
    price: req.body.price,
    gender: req.body.gender,
    desc: req.body.desc,
    image: req.file.filename,
  });

  // Save the shoe document to the database using promises
  shoe.save()
    .then(() => {
      console.log('Shoe data saved successfully');
      return res.redirect("/uploadform");
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send('Error saving shoe data');
    });
});






app.listen(3000,()=>console.log('Server started'));