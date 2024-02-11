// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PropertyRental {
    address private backendAddress; // Address of the backend server allowed to call applyToRent

    struct Property {
        string id; 
        address payable owner;
        uint256 price;
        bool isRented;
    }

    struct RentalApplication {
        string propertyId; 
        address applicant;
        bool isApproved;
    }

    Property[] public properties;

    // Array to store rental applications
    RentalApplication[] public rentalApplications;

    // Mapping to relate properties' IDs to their index in the array for quick lookup
    mapping(string => uint256) private propertyIndex;

    // Define events for property registration and rental application
    event PropertyRegistered(string indexed propertyId, address indexed owner, uint256 price);
    event RentalRequested(uint256 indexed applicationId, string indexed propertyId, address indexed applicant);
    event RentalApproved(string indexed propertyId, address indexed applicant);
    event RentalDeclined(string indexed propertyId, address indexed applicant);

    // Define events for verbose logging
    event LogApplyToRentAttempt(string propertyId, address applicant);
    event LogApplyToRentFailure(string propertyId, address applicant, string reason);


    constructor(address _backendAddress) {
        backendAddress = _backendAddress;
    }

    modifier onlyBackend() {
        require(msg.sender == backendAddress, "This function is restricted to the backend");
        _;
    }

    function registerProperty(string calldata _id, address payable _owner, uint256 _price) external {
        require(propertyIndex[_id] == 0, "Property ID already exists");
        properties.push(Property(_id, _owner, _price, false));
        // Use the length of the properties array as an index reference
        propertyIndex[_id] = properties.length - 1;
        emit PropertyRegistered(_id, _owner, _price);
    }

    function applyToRent(string calldata _propertyId, address _applicant) external onlyBackend {
        // Log an attempt to apply to rent
        emit LogApplyToRentAttempt(_propertyId, _applicant);

        uint256 index = propertyIndex[_propertyId];
        if (index == 0 && keccak256(abi.encodePacked(properties[0].id)) != keccak256(abi.encodePacked(_propertyId))) {
            emit LogApplyToRentFailure(_propertyId, _applicant, "Property not found");
            revert("Property not found");
        }

        Property storage property = properties[index];
        if (property.isRented) {
            emit LogApplyToRentFailure(_propertyId, _applicant, "Property is already rented");
            revert("Property is already rented");
        }

       if (_applicant == property.owner) {
            emit LogApplyToRentFailure(_propertyId, _applicant, "Owner cannot apply to rent their own property");
            revert("Owner cannot apply to rent their own property");
        }

        rentalApplications.push(RentalApplication(_propertyId, _applicant, false));
        uint256 applicationId = rentalApplications.length - 1;
        emit RentalRequested(applicationId, _propertyId, _applicant);
    }

    function approveRental(uint256 _applicationId) external {
        RentalApplication storage application = rentalApplications[_applicationId];
        uint256 index = propertyIndex[application.propertyId];
        Property storage property = properties[index];
        
        require(msg.sender == property.owner, "Only the property owner can approve rentals");
        require(!property.isRented, "Property is already rented");
        require(!application.isApproved, "Application is already approved");

        application.isApproved = true;
        property.isRented = true;
        emit RentalApproved(application.propertyId, application.applicant);
    }

    function declineRental(uint256 _applicationId) external {
        RentalApplication storage application = rentalApplications[_applicationId];
        uint256 index = propertyIndex[application.propertyId];
        Property storage property = properties[index];

        require(msg.sender == property.owner, "Only the property owner can decline rentals");
        require(!application.isApproved, "Application is already approved");

        emit RentalDeclined(application.propertyId, application.applicant);
    }

    // Additional helper functions might be needed for managing string IDs effectively.
}
