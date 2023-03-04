import express from "express"
import Photo from "./models/Photo.js"
import mongoose from "mongoose"
import path from "path"
import fileUpload from "express-fileupload"
import fs from "fs"
const app = express()
const __dirname = path.resolve()

//connect to mongodb
mongoose.connect(
  "mongodb+srv://ogulcan:12qwaszx@database.xjxvdni.mongodb.net/pcatdb?retryWrites=true&w=majority"
)

//Template engine
app.set("view engine", "ejs")

//Middleware
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(fileUpload())

//Routes
//Get
app.get("/", async (req, res) => {
  const photos = await Photo.find({})
  res.render("index", { photos })
})
app.get("/about", (req, res) => {
  res.render("about")
})
app.get("/add", (req, res) => {
  res.render("add")
})
app.get("/photos/:id", async (req, res) => {
  const photo = await Photo.findById(req.params.id)
  res.render("photo", {
    photo,
  })
})

//Post
app.post("/photos", async (req, res) => {
  const uploadDir = "public/uploads"
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir)
  }

  let uploadeImage = req.files.image
  let uploadPath = __dirname + "/public/uploads/" + uploadeImage.name

  uploadeImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: "/uploads/" + uploadeImage.name,
    })
    res.redirect("/")
  })
})

const port = 3000
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
