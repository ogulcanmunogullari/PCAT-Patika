import express from "express"
import Photo from "./models/Photo.js"
import mongoose from "mongoose"

const app = express()

//connect to mongodb
mongoose.connect("mongodb://localhost/pcat-test-db")

//Template engine
app.set("view engine", "ejs")

//Middleware
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Routes
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
app.post("/photos", async (req, res) => {
  await Photo.create(req.body)
  res.redirect("/")
})

const port = 3000
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
