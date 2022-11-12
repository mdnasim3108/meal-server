const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Meals = require("./models/meals.model");
const { response } = require("express");
require("dotenv").config();
const app = express();
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb' }));
app.use(cors({ origin: true, credentials: true }));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));
//conecting mongodb database using connection string
mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) throw err;
        console.log("MongoDB connection established");
    }
);
app.post("/addmeals", async (req, res) => {
    
    let {
        id,
        name,
        description,
        price
    } = req.body;

    const newMeal = new Meals( {
        id,
        name,
        description,
        price
    });
    const savedMeals = await newMeal.save();
    res.json(savedMeals);
})
app.get("/listmeals", async (req, res) => {

        var meals = await Meals.find()
        res.json(meals)

})
app.delete("/deletemeals", async (req, res) => {
    let {name} =req.body
    var meals = await Meals.deleteMany({name:name})
    res.json(meals)
})