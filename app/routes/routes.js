module.exports = app => {
  const groceries = require("../controllers/controller.js");

  var router = require("express").Router();

  // Create a new Grocery
  router.post("/", groceries.create);

  // Retrieve all Groceries
  router.get("/", groceries.findAll);

  // Retrieve a single Grocery with id
  router.get("/:id", groceries.findOne);

  // Update a Grocery with id
  router.put("/:id", groceries.update);

  // Delete a Grocery with id
  router.delete("/:id", groceries.delete);

  // Create a new Grocery
  router.delete("/", groceries.deleteAll);

  app.use('/api/groceries', router);
};
