const mongoose = require("mongoose");
const { Schema } = mongoose;

const grocerySchema = new Schema({
  item: {
    type: String,
    require: true,
  },
  checked: {
    type: Boolean,
    default: false,
  },
});


module.exports = mongoose.model("Grocery", grocerySchema);
