const router = require("express").Router();
const { getAllGroceries, addGroceryItem, deleteGroceryItem, updateGroceryItem } = require("../../../controllers/groceryController");

router.get("/", getAllGroceries);
router.post("/", addGroceryItem);
router.patch("/:id", updateGroceryItem);
router.delete("/:id", deleteGroceryItem);

module.exports = router;
