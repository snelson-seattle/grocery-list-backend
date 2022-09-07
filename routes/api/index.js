const router = require("express").Router();
const groceryRoutes = require("./groceries");

router.use("/groceries", groceryRoutes);

module.exports = router;