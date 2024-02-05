const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });

const PropertyRental = artifacts.require("PropertyRental");
module.exports = function (deployer) {
  const backendAddress = process.env.BACKEND_ADDRESS;
  if (!backendAddress) {
    throw new Error("BACKEND_ADDRESS is not set in the .env file");
  }
  deployer.deploy(PropertyRental, backendAddress);
};
