const router = require("express").Router();
const { getAllGroceries, addGroceryItem } = require("../../../controllers/groceryController");

router.get("/", getAllGroceries);
router.post("/", addGroceryItem);

module.exports = router;
