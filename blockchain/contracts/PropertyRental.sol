// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PropertyRental {
    struct Property {
        uint256 id;
        address owner;
        string name;
        uint256 rent;
        bool isRented;
    }

    Property[] public properties;
    uint256 public nextPropertyId;

    function registerProperty(string calldata _name, uint256 _rent) external {
        properties.push(Property(nextPropertyId, msg.sender, _name, _rent, false));
        nextPropertyId++;
    }

    function rentProperty(uint256 _id) external payable {
        Property storage property = properties[_id];
        require(msg.value == property.rent, "Please submit the correct rent amount");
        require(!property.isRented, "Property is already rented");

        payable(property.owner).transfer(msg.value);
        property.isRented = true;
    }
}
