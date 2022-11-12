const mongoose = require("mongoose");
//datas and their data type which are stored our monoose database
const mealSchema = new mongoose.Schema({
  id: {type : String},
  name: {type : String},
  description: {type : String},
  price: {type: Number}
});

module.exports = Meals = mongoose.model("meals", mealSchema);
