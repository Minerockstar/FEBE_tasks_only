// const express = require("express")
// const dotenv = require("dotenv")
// const mongoose = require("mongoose")
// const router = require("./router")
// const cors = require("cors")
// const multer = require("multer")

// dotenv.config()
// const app = express()

// mongoose.connect(process.env.db, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//         .then(()=>{
//             console.log("Server is connected");
//         })
//         .catch(()=>{
//             console.log("Server is not connected");
//         })
// app.use(cors())
// app.use(express.json())

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "./fb_connection/src/images");
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + "-" + file.originalname);
//     },
//     });
    
//     app.post("/items", upload.single("images"), async (req, res) => {
// try {
//   // const { name, description } = req.body;
//   const imageUrl = req.file ? req.file.filename : null;


//   // const newItem = new Item({ name, description, imageUrl });
//   const newItem = new Item({ imageUrl });


//   await newItem.save();


//   res.status(201).json(newItem);
// } catch (error) {
//   res.status(500).json({ error: error.message });
// }
// });
//     const upload = multer({ storage: storage });
    
//     app.use("/api", router);
// app.listen(process.env.port, ()=>{
//     console.log(`Server is connected:${process.env.port}`);
// })

const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const router = require("./router");
const cors = require("cors");
const multer = require("multer");

dotenv.config();
const app = express();

mongoose.connect(process.env.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Server is connected");
})
.catch(() => {
  console.log("Server is not connected");
});

app.use(cors());
app.use(express.json());
app.use("/api", router);

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./fb_connection/src/images");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });
// const itemSchema = new mongoose.Schema({
//     //   name: String,
//     //   description: String,
//     imageUrl: String,
//     });
    
    
//     const Item = mongoose.model("Item", itemSchema);
// app.post("/items", upload.single("images"), async (req, res) => {
//   try {
//     const imageUrl = req.file ? req.file.filename : null;

//     const newItem = new Item({ imageUrl });

//     await newItem.save();

//     res.status(201).json(newItem);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

app.listen(process.env.port, ()=>{
        console.log(`Server is connected:${process.env.port}`);
    })