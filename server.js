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
// const db = mongoose.connection
// db.on('error',(error)=>console.error(error));
// db.once('open',()=>console.log('connected to database'));

// const mainapp = require('./app');
// import mainapp from './app.js'
// app.use('/app', mainapp);

app.listen(3000,()=>console.log('Server started'));