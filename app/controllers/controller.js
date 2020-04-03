const db = require("../models");
const Grocery = db.groceries;
const Op = db.Sequelize.Op;

// Create and Save a new Grocery
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
    return;
  }

  // Create a Grocery
  const grocery = {
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    price: req.body.price,
  };

  // Save Grocery in the database
  Grocery.create(grocery)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Grocery."
      });
    });
};

// Retrieve all Groceries from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  Grocery.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving groceries."
      });
    });
};

// Find a single Grocery with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Grocery.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Grocery with id=" + id
      });
    });
};

// Update a Grocery by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Grocery.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Grocery was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Grocery with id=${id}. Maybe Grocery was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Grocery with id=" + id
      });
    });
};

// Delete a Grocery with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Grocery.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Grocery was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Grocery with id=${id}. Maybe Grocery was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Grocery with id=" + id
      });
    });
};

// Delete all Groceries from the database.
exports.deleteAll = (req, res) => {
  Grocery.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Groceries were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all groceries."
      });
    });
};
