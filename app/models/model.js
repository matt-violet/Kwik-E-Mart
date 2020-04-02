module.exports = (sequelize, Sequelize) => {
  const Grocery = sequelize.define("grocery", {
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    image: {
      type: Sequelize.STRING
    }
  });

  return Grocery;
};