const { Grocery } = require("../models");
const asyncHandler = require("express-async-handler");

// @desc Get all grocery items
// @route GET /groceries
const getAllGroceries = asyncHandler(async (req, res) => {
  const groceries = await Grocery.find().lean();

  // If no grocery items are found
  if (!groceries?.length) {
    return res.status(400).json({ message: "No grocery items were found." });
  }

  res.json(groceries);
});


// @desc Add a new grocery item
// @route POST /groceries
const addGroceryItem = asyncHandler(async (req, res) => {
  const { item } = req.body;

  // confirm data
  if (!item) {
    return res
      .status(400)
      .json({ message: "An item description is required." });
  }

  // check for duplicate item
  const duplicate = await Grocery.findOne({ item }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate item description" });
  }

  // Create and store grocery item
  const groceryItem = await Grocery.create({ item });

  if (groceryItem) {
    return res.status(201).json({ message: "New grocery item added." });
  } else {
    return res.status(400).json({ message: "Unable to add grocery item." });
  }
});

module.exports = {
  getAllGroceries,
  addGroceryItem,
};
