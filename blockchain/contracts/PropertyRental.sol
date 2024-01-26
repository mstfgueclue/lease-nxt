// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PropertyRental {
    struct Property {
        uint256 id;
        address owner;
        string title;
        uint256 price;
        bool isRented;
    }

    Property[] public properties;
    uint256 public nextPropertyId;

    function registerProperty(string calldata _title, uint256 _price) external {
        properties.push(Property(nextPropertyId, msg.sender, _title, _price, false));
        nextPropertyId++;
    }

    function rentProperty(uint256 _id) external payable {
        Property storage property = properties[_id];
        require(msg.value == property.price, "Please submit the correct rent amount");
        require(!property.isRented, "Property is already rented");

        payable(property.owner).transfer(msg.value);
        property.isRented = true;
    }
}
