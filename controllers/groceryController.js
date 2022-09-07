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
    return res.status(201).json(groceryItem);
  } else {
    return res.status(400).json({ message: "Unable to add grocery item." });
  }
});

// @desc Update a grocery item
// @route PATCH /groceries/:id
const updateGroceryItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { checked } = req.body;

  // confirm grocery item exists to update
  const item = await Grocery.findById(id).exec();
  if (!item) {
    return res.status(400).json({ message: "Item not found." });
  }

  //update the item
  item.checked = checked;
  const updatedItem = await item.save();

  res.json({message: "Successfully updated item.", updatedItem});
});

// @desc Remove a grocery item
// @route DELETE /groceries/:id
const deleteGroceryItem = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // confirm grocery item exists to delete
  const item = await Grocery.findById(id).exec();
  if (!item) {
    return res.status(400).json({ message: "Item not found." });
  }

  // if item exists, delete the item
  const result = await item.deleteOne();

  // send response to user
  const reply = `Item: ${result.item} with ID ${result._id} was deleted`;
  res.json(reply);
});

module.exports = {
  getAllGroceries,
  addGroceryItem,
  updateGroceryItem,
  deleteGroceryItem,
};
