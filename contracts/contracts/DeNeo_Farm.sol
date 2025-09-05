// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title DeNeo Farm Company Smart Contract 
/// @author Danstanco-dev
/// @notice core  Farm Logic for DeNeo-Company Farm Protocol 
/// @dev Built with OpenZeppelin + Chainlink    


import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./DeNeoPriceData.sol";

contract DeNeo_Farm is ERC721,  ERC721URIStorage, DeNeoPriceData {
 
       // Overridering the supportsInterface and tokenURI because it has duplicate functions to avoid errors 
     function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns(bool) {
       return super.supportsInterface(interfaceId);
      }
   
   function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns(string memory) {
       return super.tokenURI(tokenId);
     }

    
    // DeNeo_Farm company address
    address private _owner; 

    // DeNeo_Farm Company State Locations Company Locations
    string  private  _abuja_location;
    string  private _lagos_location;
    string  private _enugu_location;
    string private  _portharcout_location;
    string private  _kano_location;
    string private  _niger_location;
    string private  _sokoto_location;

   // DeNeo_Farm Comapany Swtich-able Location State Addresses  
    string private  _abuja_location_address;
    string private  _lagos_location_address;
    string private  _enugu_location_address;
    string private  _portharcout_location_address;
    string private  _kano_location_address;
    string private  _niger_location_address;
    string private  _sokoto_location_address;
   
   // DeNeo_Farm Company Insurance Collection
   string private _TokenImage;

   // DeNeo_Farm Company Constructor
    constructor(
        string memory _abuja,
        string memory _lagos,
        string memory _enugu,
        string memory _portharcount,
        string memory _kano,
        string memory _niger,
        string memory _sokoto, 
        string memory _token_Image,
        address _price_address 
        )  ERC721("DeNeo Farm Coin", "DFC") DeNeoPriceData(_price_address)  {
        _owner = msg.sender;
        _abuja_location = _abuja;
        _lagos_location = _lagos;
        _enugu_location = _enugu;
        _portharcout_location = _portharcount;
        _kano_location = _kano;
        _niger_location = _niger;
        _sokoto_location = _sokoto;
        _TokenImage = _token_Image;
    }


    // DeNeo_Farm General Errors
    error DeNeo__InValidAddress(address _caller);
    error DeNeo__ContractAddress_Not_Allowed(address _caller);
    error DeNeo__Sorry_Only_For_DeNeo_Only(address _caller);

    // DeNeo_Farm Modifier
    modifier DeNeo_Only(address _caller) {
        if (_owner != _caller) {
            revert DeNeo__Sorry_Only_For_DeNeo_Only(_caller);
        }
        _;
    }

   /* Request For ETH -> USDT Price Data from Oracle Network */  
   function PriceFor_ETH_USD() public view override returns (uint256) {
        (, int answer, , , ) = _aggregator_address.latestRoundData();
        return (uint256(answer * 1e10));
    }

 /* ----------------------------------------------  DeNeo Farm ----------------------------------------------- */
   // DeNeo_Farm FarmProvider Data Holder
    struct FarmProvider {
        address _farmProvider;
        string _name;
        uint256 _FP_ID;
        string _FP_Proof;
        string _Face_Photo;
        uint256 _Num_Products;
        bool _sacked;
        string[] _name_Products;
        uint256 _FP_Y_experience;
        string _F_Size;
    }

    // DeNeo_Farm FarmProvider Data Holder
    struct FarmConsumer {
        address _fc_consumer;
        string _name;
        uint256 _FC_ID;
        string _email;
        uint256[] boughtLen;
    }
    
    // DeNeo_Farm ProductListing Data Holder
    struct ProductListing {
        string[] productName;
        string[] aboutproduct;
        string[] productContent;
        uint256[] productWholePrice;
        uint256[] productSinglePrice;
        uint256[] productQuantity;
    }

    // DeNeo_Farm FarmProvider routing
    mapping(uint256 => FarmProvider) private farmprovider;
    // DeNeo_Farm FarmConsumer routing
    mapping(uint256 => FarmConsumer) private farmconsumer;
    // DeNeo_Farm ProductListing   
    mapping(address => ProductListing) private productlisting;

    // DeNeo_Farm FarmConsumer Count
    uint256 private constant _FCCount = 0;

    // DeNeo_Farm FarmConsumer Identification
    uint256 private _Your_FC_ID;

    // DeNeo_Farm FarmProvider Count
    uint256 private constant _FPCount = 0;

    // DeNeo_Farm FarmProvider Identification
    uint256 private _Your_FP_ID;

    // DeNeo_Farm FarmProvider Array
    FarmProvider[] private _fp_array;

    // DeNeo_Farm Array Track number of consumers volume
    uint256[] private consumersVolume;

    // DeNeo_Farm FP_Registeration Fee
    uint256 private constant _FP_Registeration_fee = 0.1 ether;

    // DeNeo_Farm FP_Product Listing price
    uint256 private constant _FP_Listing_Fee = 0.01 ether;

    // DeNeo_Farm  Product Request
    bool private request_initized;
    
    // DeNeo_Farm  yourRequestName
    string private yourRequestName;
    // DeNeo_Farm yourRequestdestination
    string private yourRequestdestination;
    // DeNeo_Farm  yourContactNumber1
    uint256 private yourContactNumber1;
    // DeNeo_Farm  yourContactNumber2
    uint256 private yourContactNumber2;
    // DeNeo_Farm yourNationalState
    string private yourNationalState;
     
     // DeNeo_Farm FarmProviders Payment Address
    address private payFP_address;
    // DeNeo_Farm  FarmProviders Payment Price
    uint256 private payFP_Price;
    // DeNeo_Farm homepickup_fee
    uint256 private constant homepickup_fee = 0.010 ether;

    // Push Request Data to PickUp
    // DeNeo_Farm yourRequestNamePickUp
    string[] private yourRequestNamePickUp;
    // DeNeo_Farm yourRequestdestinationPickUp
    string[] private yourRequestdestinationPickUp;
    // DeNeo_Farm  yourContactNumber1PickUp
    uint256[] private yourContactNumber1PickUp;
    // DeNeo_Farm yourContactNumber2PickUp
    uint256[] private yourContactNumber2PickUp;
    // DeNeo_Farm   yourNationalStatePickUp
    string[] private yourNationalStatePickUp;

    //DeNeo_Farm productAcquired state
    bool private productAcquired;

 
   // DeNeo_Farm event --> Emitted when FarmProvider is Registered
    event FarmProviderRegisteringEmitted(
        string indexed name,
        uint256 indexed Fd_id,
        address indexed caller
    );

  // DeNeo_Farm event --> Emitted when FarmConsumer is Registered
    event FarmConsumerRegistered(
        address indexed caller,
        string indexed name,
        uint256 indexed yourId
    );
  
  // DeNeo_Farm event --> Emitted when ProductListingEvent1 is occured 
    event ProductListingEvent1(
        string indexed FP_name,
        string indexed aboutContent,
        string indexed contentURL
    );
   
   // DeNeo_Farm event --> Emitted when ProductListingEvent2 is occured 
    event ProductListingEvent2(
        uint256 indexed wholePrice,
        uint256 indexed singlePrice,
        uint256 indexed productQuantity
    );
   
   // DeNeo_Farm event --> Emitted when AbujaRecieved is been assigned 
    event AbujaRecieved(string indexed _pickupAbuja);
   // DeNeo_Farm event --> 
    event LagosRecieved(string indexed _pickupLagos);

    event EnuguRecieved(string indexed _pickupEnugu);

    event PortHarcoutRecieved(string indexed _pickupPortHarcout);

    event KanoReceived(string indexed _pickupKano);

    event NigerReceived(string indexed _pickupNiger);

    event SokotoReceived(string indexed _pickupsokoto);

    event FC_ProductRequestEmitted(
        string indexed _nationalState,
        string indexed _Yourlocation,
        string indexed _YourName
    );

    event FC_CancelRequestEmitted(
        string indexed _nationalState,
        string indexed _Yourlocation,
        string indexed _YourName
    );

    event BuyProductRequestedEmitted(bool indexed _productAcquired);

    event HomePickUpEmitted(
        string indexed _name,
        string indexed _location,
        string indexed _state
    );

    event NotifyCompany_Admin_ToView_HomepickOrderEmitted(
        string indexed _notifyMsg
    );

    event ViewHomePickOrderEmitted(
        string indexed _name,
        string indexed _location,
        string indexed _state
    );

    event Add_State_Location_AddressEmitted(bool indexed _AddLocation);

    string private _clientName;
    string private _clientLocation;
    uint256 private _clientContactNum1;
    uint256 private _clientContactNum2;
    string private _clientNationalState;

    bool private pickYourSelf_locationAdded;

    error DeNeo__RequestInitializerMustBeTrue(
        bool requestNotTrue,
        string failRequestMsg
    );
    error DeNeo__FP_WithFailed(bool withdrawState, address fp_address);
    error DeNeo__ProductAcquiredFasle(
        bool productAcquiredState_False,
        string acquiredFailedMsg
    );
    error DeNeo__NOVALUESINCLIENTSTATE(string clientErrorMsg);
    error DeNeo__PickStateAddressFalse(string pickUpStateFalseMsg);
    error DeNeo__YouMustGiveUsOneValue(string oneValueOnly);
    error DeNeo__YouHaveToClickZeroToStartAction(uint256 _zero, string errMsg);
    error DeNeo__YouCanNotCallThisFunc(address caller, string _errMsg);
    error RegisterFarmProviderNOETHER(address caller, uint256 amount); 
    error HomePickUpNOETHER(address caller, uint256 amount);
    error FP_ProductListingNOETHER(address caller, uint256 amount);


    function RegisterFarmProvider(
        string memory _name,
        string memory _proof_FP,
        string memory _face_photo,
        uint256 _num_products,
        string[] memory _name_products,
        uint256 _fp_y_experience,
        string memory _farmSize
    ) external payable returns (string memory) {
        if (address(0) == msg.sender) {
            revert DeNeo__InValidAddress(msg.sender);
        }
        if (msg.sender == _owner) {
            revert DeNeo__ContractAddress_Not_Allowed(msg.sender);
        }
        if (msg.value < _FP_Registeration_fee) {
            revert RegisterFarmProviderNOETHER(msg.sender, msg.value);
        }


        uint256 _FPCountId = _FPCount + 1;

        _Your_FP_ID = _FPCountId;

        FarmProvider storage _FP = farmprovider[_FPCountId];

        _FP._farmProvider = msg.sender;
        _FP._name = _name;
        _FP._FP_ID = _FPCountId;
        _FP._FP_Proof = _proof_FP;
        _FP._Face_Photo = _face_photo;
        _FP._Num_Products = _num_products;
        _FP._sacked = false;
        _FP._FP_Y_experience = _fp_y_experience;
        _FP._F_Size = _farmSize;
        _FP._name_Products = _name_products; 

        emit FarmProviderRegisteringEmitted(_name, _FPCountId, msg.sender);

        return ("Thanks for being a Farm Provider");
    }

    function RegisterFarmConsumer(
        string memory _name,
        string memory _email
    ) external returns (string memory) {
        if (address(0) == msg.sender) {
            revert DeNeo__InValidAddress(msg.sender);
        }
        if (msg.sender == _owner) {
            revert DeNeo__ContractAddress_Not_Allowed(msg.sender);
        }

        uint256 fcCount_ID = _FCCount + 1;

        FarmConsumer storage _FC = farmconsumer[fcCount_ID];
        _FC._fc_consumer = msg.sender;
        _FC._name = _name;
        _FC._FC_ID = fcCount_ID;
        _FC._email = _email;

        consumersVolume.push(fcCount_ID);

        _Your_FC_ID = fcCount_ID;

        emit FarmConsumerRegistered(msg.sender, _name, fcCount_ID);

        return (
            "Thanks for being a part of DeNeo Family, our job is simplifying living with blockchain and Al"
        );
    } 

    function FP_ProductListing(
        string memory _productName,
        string memory _aboutproduct,
        string memory _productContent,
        uint256 _productWholePrice,
        uint256 _productQuantity,
        uint256 _productSinglePrice
    )
        external
        payable
        returns (string memory, string memory, string memory, uint256, uint256, uint256)
    {
        if (address(0) == msg.sender) {
            revert DeNeo__InValidAddress(msg.sender);
        }
        if (msg.sender == _owner) {
            revert DeNeo__ContractAddress_Not_Allowed(msg.sender);
        }
        
        if (farmconsumer[_Your_FC_ID]._fc_consumer == msg.sender) {
            revert DeNeo__YouCanNotCallThisFunc(
                msg.sender,
                "This function is for Farm Providers only!"
            );
        }
         if(msg.value < _FP_Listing_Fee) { 
          revert FP_ProductListingNOETHER(msg.sender, msg.value); 
         }

        ProductListing storage pLG = productlisting[msg.sender];
        pLG.productName.push(_productName);
        pLG.aboutproduct.push(_aboutproduct);
        pLG.productContent.push(_productContent);
        pLG.productWholePrice.push(_productWholePrice);
        pLG.productSinglePrice.push(_productSinglePrice);
        pLG.productQuantity.push(_productQuantity);

        emit ProductListingEvent1(_productName, _aboutproduct, _productContent);
        emit ProductListingEvent2(
            _productWholePrice,
            _productSinglePrice,
            _productQuantity
        );

        return (
            _productName,
            _aboutproduct,
            _productContent,
            _productWholePrice,
            _productSinglePrice,
            _productQuantity
        );
    }

    function FC_ProductRequest(
        string memory _your_destination,
        string memory _your_name,
        uint256 your_contact_number1,
        uint256 your_contact_number2,
        address productOwner,
        uint256 productPrice,
        uint256 productQuantity,
        string memory _National_State
    ) external returns (string memory) {
        if (address(0) == msg.sender) {
            revert DeNeo__InValidAddress(msg.sender);
        }
        if (msg.sender == _owner) {
            revert DeNeo__ContractAddress_Not_Allowed(msg.sender);
        }

        yourRequestName = _your_name;
        yourRequestdestination = _your_destination;
        yourContactNumber1 = your_contact_number1;
        yourContactNumber2 = your_contact_number2;
        yourNationalState = _National_State;

        payFP_address = productOwner;
        payFP_Price = productPrice;

        request_initized = true;

        yourRequestNamePickUp.push(yourRequestName);
        yourRequestdestinationPickUp.push(yourRequestdestination);
        yourContactNumber1PickUp.push(yourContactNumber1);
        yourContactNumber2PickUp.push(yourContactNumber2);
        yourNationalStatePickUp.push(yourNationalState);

        emit FC_ProductRequestEmitted(
            _National_State,
            _your_destination,
            _your_name
        );
        return ("You have initized a request buy now!");
    }

    function FC_CancelRequest() external returns (string memory) {
        if (address(0) == msg.sender) {
            revert DeNeo__InValidAddress(msg.sender);
        }
        if (msg.sender == _owner) {
            revert DeNeo__ContractAddress_Not_Allowed(msg.sender);
        }
        yourRequestName = "";
        yourRequestdestination = "";
        yourNationalState = "";
        yourContactNumber1 = 0;
        yourContactNumber2 = 0;
        payFP_address = address(0);
        payFP_Price = 0;

        request_initized = false;

        emit FC_CancelRequestEmitted(
            yourNationalState,
            yourRequestdestination,
            yourRequestName
        );

        return ("You have canceled initized request, what's wrong!");
    }

    function BuyProductRequested() external payable returns (bool) {
        if (address(0) == msg.sender) {
            revert DeNeo__InValidAddress(msg.sender);
        }
        if (msg.sender == _owner) {
            revert DeNeo__ContractAddress_Not_Allowed(msg.sender);
        }
        if (request_initized != true) {
            revert DeNeo__RequestInitializerMustBeTrue(
                request_initized,
                "You must initialize the request to buy what you want!"
            );
        }

        (bool success, ) = payable(payFP_address).call{value: payFP_Price}("");

        yourRequestName = "";
        yourRequestdestination = "";
        yourNationalState = "";
        yourContactNumber1 = 0;
        yourContactNumber2 = 0;
        payFP_address = address(0);
        payFP_Price = 0;

        request_initized = false;
        productAcquired = true;
        if (!success) {
            revert DeNeo__FP_WithFailed(success, payFP_address);
        }

        emit BuyProductRequestedEmitted(productAcquired);

        return (true);
    }



    function HomePickUp(uint16 _zero) public payable returns (bool) {
             if (address(0) == msg.sender) {
            revert DeNeo__InValidAddress(msg.sender);
        }
        if (msg.sender == _owner) {
            revert DeNeo__ContractAddress_Not_Allowed(msg.sender);
        }
        if (productAcquired == false) {
            revert DeNeo__ProductAcquiredFasle(
                productAcquired,
                "You have to request and buy product to seek a door step pickup!"
            );
        }
        if (_zero != 0) {
            revert DeNeo__YouHaveToClickZeroToStartAction(
                _zero,
                "The value you enter must be a zero value for homepickup thank you!"
            );
        }
        if (msg.value < homepickup_fee) {
            revert HomePickUpNOETHER(msg.sender, msg.value);
        }

        string memory clientName = yourRequestNamePickUp[_zero];
        string memory clientDestination = yourRequestdestinationPickUp[_zero];
        uint256  clientContact = yourContactNumber1PickUp[_zero];
        uint256  clientContactNum2 = yourContactNumber2PickUp[_zero];
        string memory clientNationalState = yourNationalStatePickUp[_zero];

        _clientName = clientName;
        _clientLocation = clientDestination;
        _clientContactNum1 = clientContact;
        _clientContactNum2 = clientContactNum2;
        _clientNationalState = clientNationalState;

        productAcquired = false;
        delete yourRequestNamePickUp;
        delete yourRequestdestinationPickUp;
        delete yourContactNumber1PickUp;
        delete yourContactNumber2PickUp;
        delete yourNationalStatePickUp;

        emit HomePickUpEmitted(
            _clientName,
            _clientLocation,
            _clientNationalState
        );

        return (true);
    }
     
    
     function InitializeYourPickUp_State(uint256 _zero) external returns(bool) {
        if (address(0) == msg.sender) {
            revert DeNeo__InValidAddress(msg.sender);
        }

         if (productAcquired == false) {
            revert DeNeo__ProductAcquiredFasle(
                productAcquired,
                "You have to request and buy product to seek a door step pickup!"
            );
        }
        
         if (pickYourSelf_locationAdded == false) {
            revert DeNeo__PickStateAddressFalse(
                "DeNeo Company has not yet uploaded the location!"
            );
        }

        
        string memory clientName = yourRequestNamePickUp[_zero];
        string memory clientDestination = yourRequestdestinationPickUp[_zero];
        uint256  clientContact = yourContactNumber1PickUp[_zero];
        uint256  clientContactNum2 = yourContactNumber2PickUp[_zero];
        string memory clientNationalState = yourNationalStatePickUp[_zero];

        _clientName = clientName;
        _clientLocation = clientDestination;
        _clientContactNum1 = clientContact;
        _clientContactNum2 = clientContactNum2;
        _clientNationalState = clientNationalState;

        productAcquired = false;
        delete yourRequestNamePickUp;
        delete yourRequestdestinationPickUp;
        delete yourContactNumber1PickUp;
        delete yourContactNumber2PickUp;
        delete yourNationalStatePickUp;
    
    return(true);
     }


    function PickYourSelf() external returns (string memory) {
        if (address(0) == msg.sender) {
            revert DeNeo__InValidAddress(msg.sender);
        }
        if (
            bytes(_clientName).length == 0 &&
            bytes(_clientLocation).length == 0 &&
            _clientContactNum1 == 0 &&
            _clientContactNum2 == 0 &&
            bytes(_clientNationalState).length == 0
        ) {
            revert DeNeo__NOVALUESINCLIENTSTATE(
                "We found Values in the client States"
            );
        }

        if (pickYourSelf_locationAdded == false) {
            revert DeNeo__PickStateAddressFalse(
                "DeNeo Company has not yet uploaded the location!"
            );
        }
      

        string memory _pickupAbuja;
        string memory _pickupLagos;
        string memory _pickupEnugu;
        string memory _pickupPortHarcout;
        string memory _pickupKano;
        string memory _pickupNiger;
        string memory _pickupsokoto;

        if (
            keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_abuja_location)) ||
            keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_lagos_location)) ||
            keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_enugu_location)) ||
            keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_portharcout_location)) ||
            keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_kano_location)) ||
            keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_niger_location)) ||
            keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_sokoto_location))
        ) {
            _pickupAbuja = _abuja_location_address;
        }

        if (
            keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_abuja_location)) ||
            keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_lagos_location)) ||
            keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_enugu_location)) ||
            keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_portharcout_location)) ||
            keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_kano_location)) ||
            keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_niger_location)) ||
            keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_sokoto_location))
        ) {
            _pickupLagos = _enugu_location_address;
        }

        if (
            keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_abuja_location)) ||
            keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_lagos_location)) ||
            keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_enugu_location)) ||
            keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_portharcout_location)) ||
            keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_kano_location)) ||
            keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_niger_location)) ||
            keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_sokoto_location))
        ) {
            _pickupEnugu = _enugu_location_address;
        }

        if (
            keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_abuja_location)) ||
            keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_lagos_location)) ||
            keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_enugu_location)) ||
            keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_portharcout_location)) ||
            keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_kano_location)) ||
            keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_niger_location)) ||
            keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_sokoto_location))
        ) {
            _pickupPortHarcout = _portharcout_location_address;
        }

        if (
                      keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_abuja_location)) ||
            keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_lagos_location)) ||
            keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_enugu_location)) ||
            keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_portharcout_location)) ||
            keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_kano_location)) ||
            keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_niger_location)) ||
            keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_sokoto_location))
        ) {
            _pickupKano = _kano_location_address;
        }

        if (
                      keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_abuja_location)) ||
            keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_lagos_location)) ||
            keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_enugu_location)) ||
            keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_portharcout_location)) ||
            keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_kano_location)) ||
            keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_niger_location)) ||
            keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_sokoto_location))
        ) {
            _pickupNiger = _niger_location_address;
        }

        if (
                   keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_abuja_location)) ||
            keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_lagos_location)) ||
            keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_enugu_location)) ||
            keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_portharcout_location)) ||
            keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_kano_location)) ||
            keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_niger_location)) ||
            keccak256(abi.encodePacked(_clientNationalState)) == keccak256(abi.encodePacked(_sokoto_location))
        ) {
            _pickupsokoto = _sokoto_location_address;
        }

        // Emit Events, check which Events are emitted
        emit AbujaRecieved(_pickupAbuja);
        emit LagosRecieved(_pickupLagos);
        emit EnuguRecieved(_pickupEnugu);
        emit PortHarcoutRecieved(_pickupPortHarcout);
        emit KanoReceived(_pickupKano);
        emit NigerReceived(_pickupNiger);
        emit SokotoReceived(_pickupsokoto);

        pickYourSelf_locationAdded = false;

        return (
            "Pls view the location you are to come and get your goods in the following state you gave!"
        );
    }

    function NotifyCompany_Admin_ToView_HomepickOrder()
        external
        DeNeo_Only(msg.sender)
        returns (string memory)
    {
        if (address(0) == msg.sender) {
            revert DeNeo__InValidAddress(msg.sender);
        }
        if (
            bytes(_clientName).length == 0 &&
            bytes(_clientLocation).length == 0 &&
            _clientContactNum1 == 0 &&
            _clientContactNum2 == 0 &&
            bytes(_clientNationalState).length == 0
        ) {
      revert DeNeo__NOVALUESINCLIENTSTATE(                "We found Values in the client States");
        }
        emit NotifyCompany_Admin_ToView_HomepickOrderEmitted(
            "We found a product order to fulfill!"
        );
        return ("We have a product order to successfully attend to! ");
    }

    function ViewHomePickOrder()
        public
        DeNeo_Only(msg.sender)
        returns (string memory, string memory, uint256, uint256)
    {
        if (address(0) == msg.sender) {
            revert DeNeo__InValidAddress(msg.sender);
        }
        string memory _buyerName = _clientName;
        string memory _buyerLocation = _clientLocation;
        uint256 _buyerContact1 = _clientContactNum1;
        uint256 _buyerContact2 = _clientContactNum2;
        string memory _buyersState = _clientNationalState;

        _clientName = "";
        _clientLocation = "";
        _clientContactNum1 = 0;
        _clientContactNum2 = 0;
        _clientNationalState = "";

        emit ViewHomePickOrderEmitted(_buyerName, _buyerLocation, _buyersState);
        return (_buyerName, _buyerLocation, _buyerContact1, _buyerContact2);
    }

    function Add_State_Location_Address(
        string memory _abuja__address,
        string memory _lagos__address,
        string memory _enugu__address,
        string memory _portharcout__address,
        string memory _kano__address,
        string memory _niger__address,
        string memory _sokoto__address
    ) public DeNeo_Only(msg.sender) returns (bool) {
        if (address(0) == msg.sender) {
            revert DeNeo__InValidAddress(msg.sender);
        }
        _abuja_location_address = _abuja__address;
        _lagos_location_address = _lagos__address;
        _enugu_location_address = _enugu__address;
        _portharcout_location_address = _portharcout__address;
        _kano_location_address = _kano__address;
        _niger_location_address = _niger__address;
        _sokoto_location_address = _sokoto__address;

        pickYourSelf_locationAdded = true;

        emit Add_State_Location_AddressEmitted(pickYourSelf_locationAdded);

        return (true);
    }

    // Farming Getter Functions
    function ProductL_NA() external view returns (uint256) {
        return productlisting[msg.sender].productName.length;
    }

    function ProductL_AP() external view returns (uint256) {
        return productlisting[msg.sender].aboutproduct.length;
    }

    function ProductL_PC() external view returns (uint256) {
        return productlisting[msg.sender].productContent.length;
    }

    function ProductL_PWP() external view returns (uint256) {
        return productlisting[msg.sender].productWholePrice.length;
    }

    function ProductL_PSP() external view returns (uint256) {
        return productlisting[msg.sender].productSinglePrice.length;
    }

    function ProductL_PQ() external view returns (uint256) {
        return productlisting[msg.sender].productQuantity.length;
    }

    function FC_Count() external view returns (uint256) {
        return _FCCount;
    }

    function YFC_ID() external view returns (uint256) {
        return _Your_FC_ID;
    }

    function FP_Array() external view returns (uint256) {
        return _fp_array.length;
    }

    function Consumers_V() external view returns (uint256) {
        return consumersVolume.length;
    }

    function FP_Reg_fee() external view returns (uint256) {
        return _FP_Registeration_fee;
    }

    function FP_List_fee() external view returns (uint256) {
        return _FP_Listing_Fee;
    }

    // Product Request
    function Req_Ini() external view returns (bool) {
        return request_initized;
    }

    function Y_Req_Name() external view returns (string memory) {
        yourRequestName;
    }

    function Y_Req_destination() external view returns (string memory) {
        return yourRequestdestination;
    }

    function Y_Req_Contact1() external view returns (uint256) {
        return yourContactNumber1;
    }

    function Y_Req_Contact2() external view returns (uint256) {
        return yourContactNumber2;
    }

    function Y_National_S() external view returns (string memory) {
        return yourNationalState;
    }

    function PayFP_Address() external view returns (address) {
        return payFP_address;
    }

    function payFP_PriceFunc() external view returns (uint256) {
        return payFP_Price;
    }

    function homepickup_feeFunc() external view returns (uint256) {
        return homepickup_fee;
    }

    function yourRequestNamePickUp_Length() external view returns (uint256) {
        return yourRequestNamePickUp.length;
    }

  

    function yourRequestdestinationPickUp_Length()
        external
        view
        returns (uint256)
    {
        return yourRequestdestinationPickUp.length;
    }


    function yourContactNumber1PickUp_Length() external view returns (uint256) {
        return yourContactNumber1PickUp.length;
    }

   

    function yourContactNumber2PickUp_Length() external view returns (uint256) {
        yourContactNumber2PickUp.length;
    }

 

    function yourNationalStatePickUp_Length() external view returns (uint256) {
        return yourNationalStatePickUp.length;
    }

    // Product Acquired
    function productAcquiredFunc() external view returns (bool) {
        return productAcquired;
    }

    function _clientNameFunc() external view returns (string memory) {
        return _clientName;
    }

    function _clientLocationFunc() external view returns (string memory) {
        return _clientLocation;
    }

    function _clientContactNum1Func() external view returns (uint256) {
        return _clientContactNum1;
    }

    function _clientContactNum2Func() external view returns (uint256) {
        return _clientContactNum2;
    }

    function _clientNationalStateFunc() external view returns (string memory) {
        return _clientNationalState;
    }

    function pickYourSelf_locationAddedFunc() external view returns (bool) {
        return pickYourSelf_locationAdded;
    }


        /* --------------------------  DENEO SYSTEM LAYERS -------------------------- */
        
        struct SFPC {
            address sfpc_address; 
            uint256 sfpc_identification_Id; 
            string  sfpc_name; 
            bool sfpc_contributor;
        }

        struct FPC { 
            address fpc_address;
            uint256 fpc_identification_Id; 
            string fpc_name;
            bool fpc_contributor;
        }
       
       struct PFPC {
          address  pfpc_address; 
          uint256 pfpc_identification_Id; 
          string pfpc_name;
          bool pfpc_contributor;
         }

        uint256 private constant _sfpc_id_Gen = mulmod(3, 5, 7);
        uint256 private constant _fpc_id_Gen = addmod(4, 2, 6);
        uint256 private constant _pfpc_id_Gen = 0; 
           
           // Mapping 
        mapping(uint256 => SFPC) private _sfpc_routing; 
        mapping(uint256 => FPC) private _fpc_routing; 
        mapping(uint256 => PFPC) private _pfpc_routing; 

        uint256 private constant pfpc_registeration_fee = 0.5 ether;             
        
        uint256 private sfpc_contributor_Id; 
        uint256 private fpc_contributor_Id; 
        uint256 private pfpc_contributor_Id; 
         
         // Arrays
         string[] private sfpc_registered_names;
         string[] private fpc_registered_names;
         string[] private pfpc_registered_names;

         // Events 
         event CongratsSFPC_EIMTTED(string indexed name, uint256 indexed sfpc_Id, address indexed sfpc_address);
         event CongratsFPC_EIMTTED(string indexed name, uint256 indexed fpc_Id, address indexed fpc_address);
         event CongratsPFPC_EIMTTED(string indexed name, uint256 indexed pfpc, address indexed pfpc_address); 

         // errors
         error DeNeo__SFPC_AlreadyRegistered(address sfpc_address);
         error DeNeo__FPC_AlreadyRegistered(address fpc_address);
         error DeNeo__PFPC_AlreadyRegistered(address pfpc_address);
         error DeNeo__PFPC_HAS_NO_FUNDS(address pfpc_address, uint256 amount); 
         error DeNeo__YOU_DONTHAVE_SFPC_CODE_NUMBER(uint256 codeNumber);
         error DeNeo__YOU_DONTHAVE_FPC_CODE_NUMBER(uint256 codeNumber);
         error DeNeo__YOU_DONTHAVE_PFPC_CODE_NUMBER(uint256 codeNumber);
         error DeNeo__NO_FUNDS_FOUND(address caller, uint256 no_funds_);

    uint256 private constant sfpcCodeNumber = 10;  
    uint256 private constant fpcCodeNumber = 15; 
    uint256 private constant pfpcCodeNumber = 20;
       
    string[] private sfpc_submitted_Names;
    string[] private fpc_submitted_Names;
    string[] private pfpc_submitted_Names;
    string[] private pfpc_requestArray;

    uint256 private sfpc_submit_name_fee = 0.05 ether;
    uint256 private fpc_submit_name_fee = 0.05 ether;
    uint256 private pfpc_submit_name_fee = 0.05 ether;
    uint256 private constant request_pfpc_fee = 0.005 ether;
    
   

      function SFPC_SUBMIT_NAME(string memory name, uint256 sfpc_code) payable external returns(string memory submitted_name) {

          if (address(0) == msg.sender) {
            revert DeNeo__InValidAddress(msg.sender);
           }

         if(_sfpc_routing[sfpc_contributor_Id].sfpc_contributor == true) {
            revert DeNeo__SFPC_AlreadyRegistered(msg.sender); 
             }
         
           if(_fpc_routing[fpc_contributor_Id].fpc_contributor == true) {
            revert DeNeo__FPC_AlreadyRegistered(msg.sender);
           }

           if(_pfpc_routing[pfpc_contributor_Id].pfpc_contributor == true) {
              revert DeNeo__PFPC_AlreadyRegistered(msg.sender);
           }

           if(sfpc_code != sfpcCodeNumber) {
            revert DeNeo__YOU_DONTHAVE_SFPC_CODE_NUMBER(sfpc_code);
           }
           
           if(msg.value < sfpc_submit_name_fee) {
            revert DeNeo__NO_FUNDS_FOUND(msg.sender, msg.value);
           }
           sfpc_submitted_Names.push(name);
            
            submitted_name = "Thanks for submitting DeNeo will view your data and register you as SFPC";

            return(submitted_name);
      }

       function FPC_SUBMIT_NAME(string memory name, uint256 fpc_code) external payable returns(string memory submitted_name) {

          if (address(0) == msg.sender) {
            revert DeNeo__InValidAddress(msg.sender);
           }

         if(_sfpc_routing[sfpc_contributor_Id].sfpc_contributor == true) {
            revert DeNeo__SFPC_AlreadyRegistered(msg.sender); 
             }
         
           if(_fpc_routing[fpc_contributor_Id].fpc_contributor == true) {
            revert DeNeo__FPC_AlreadyRegistered(msg.sender);
           }

           if(_pfpc_routing[pfpc_contributor_Id].pfpc_contributor == true) {
              revert DeNeo__PFPC_AlreadyRegistered(msg.sender);
           }

           if(fpc_code != fpcCodeNumber) {
            revert DeNeo__YOU_DONTHAVE_SFPC_CODE_NUMBER(fpc_code);
           }
           
           if(msg.value < fpc_submit_name_fee) {
            revert DeNeo__NO_FUNDS_FOUND(msg.sender, msg.value);
           }
           fpc_submitted_Names.push(name);
            
            submitted_name = "Thanks for submitting DeNeo will view your data and register you in the layer DeNe Builder";

            return(submitted_name);
      }


       function PFPC_SUBMIT_NAME(string memory name, uint256 pfpc_code) payable external returns(string memory submitted_name) {

          if (address(0) == msg.sender) {
            revert DeNeo__InValidAddress(msg.sender);
           }

         if(_sfpc_routing[sfpc_contributor_Id].sfpc_contributor == true) {
            revert DeNeo__SFPC_AlreadyRegistered(msg.sender); 
             }
         
           if(_fpc_routing[fpc_contributor_Id].fpc_contributor == true) {
            revert DeNeo__FPC_AlreadyRegistered(msg.sender);
           }

           if(_pfpc_routing[pfpc_contributor_Id].pfpc_contributor == true) {
              revert DeNeo__PFPC_AlreadyRegistered(msg.sender);
           }

           if(pfpc_code != pfpcCodeNumber) {
            revert DeNeo__YOU_DONTHAVE_SFPC_CODE_NUMBER(pfpc_code);
           }
           
           if(msg.value < pfpc_submit_name_fee) {
            revert DeNeo__NO_FUNDS_FOUND(msg.sender, msg.value);
           }
           pfpc_submitted_Names.push(name);
            
            submitted_name = "Thanks for submitting DeNeo will view your data and register you in the layer DeNeo Builder";

            return(submitted_name);
      }
    

   function RequestPFPC(string memory pfpc_request_note) external payable returns(string memory pfpc_request_msg){
      if (address(0) == msg.sender) {
            revert DeNeo__InValidAddress(msg.sender);
     }

     if(msg.value < request_pfpc_fee) {
        revert DeNeo__NO_FUNDS_FOUND(msg.sender, msg.value); 
     }
  
       pfpc_requestArray.push(pfpc_request_note); 
    pfpc_request_msg = "Thanks for requesting to join the team will contact you";

    return(pfpc_request_msg); 
   }
     
     function deposit__To_DeNeo() public payable returns(string memory _msg) {
        if (address(0) == msg.sender) {
            revert DeNeo__InValidAddress(msg.sender);
        }
        if(msg.value < 0) {
              revert DeNeo__NO_FUNDS_FOUND(msg.sender, msg.value); 
        }
        _msg = "Thanks for funding DeNeo";
        return(_msg);
     }

     address[] private _SFPC_Addresses; 
        function Register_SFPC(string memory sfpc_name) public DeNeo_Only(msg.sender) returns(string memory deneo_sfpc_msg) {

          if (address(0) == msg.sender) {
            revert DeNeo__InValidAddress(msg.sender);
             }

          if(_sfpc_routing[sfpc_contributor_Id].sfpc_contributor == true) {
            revert DeNeo__SFPC_AlreadyRegistered(msg.sender); 
             }
         
           if(_fpc_routing[fpc_contributor_Id].fpc_contributor ==  true) {
            revert DeNeo__FPC_AlreadyRegistered(msg.sender);
           }

           if(_pfpc_routing[pfpc_contributor_Id].pfpc_contributor == true) {
              revert DeNeo__PFPC_AlreadyRegistered(msg.sender);
           }
            
        uint256 _sfpc_Id_value =  _sfpc_id_Gen + 1; 

        SFPC storage _sfpc_holder = _sfpc_routing[_sfpc_Id_value]; 
        _sfpc_holder.sfpc_address = msg.sender; 
        _sfpc_holder.sfpc_identification_Id = _sfpc_Id_value; 
        _sfpc_holder.sfpc_name = sfpc_name;
        _sfpc_holder.sfpc_contributor = true;
      
       sfpc_contributor_Id = _sfpc_Id_value;
        
        sfpc_registered_names.push(sfpc_name);
        
        _SFPC_Addresses.push(msg.sender);

       deneo_sfpc_msg = "Congrats on being a member of DeNeo SFPC your DeNeo Backbone member and a life earner"; 
        
       emit  CongratsSFPC_EIMTTED(sfpc_name, _sfpc_Id_value, msg.sender);

           return(deneo_sfpc_msg); 
        }

        address[] private _FPC_Addresses; 

         function Register_FPC(string memory fpc_name) public DeNeo_Only(msg.sender) returns(string memory deneo_fpc_msg) {

          if (address(0) == msg.sender) {
            revert DeNeo__InValidAddress(msg.sender);
             }

          if(_sfpc_routing[sfpc_contributor_Id].sfpc_contributor == true) {
            revert DeNeo__SFPC_AlreadyRegistered(msg.sender); 
             }
         
           if(_fpc_routing[fpc_contributor_Id].fpc_contributor == true) {
            revert DeNeo__FPC_AlreadyRegistered(msg.sender);
           }

           if(_pfpc_routing[pfpc_contributor_Id].pfpc_contributor == true) {
              revert DeNeo__PFPC_AlreadyRegistered(msg.sender);
           }
           
        uint256 _fpc_Id_value =  _fpc_id_Gen + 1; 

        FPC storage _fpc_holder = _fpc_routing[_fpc_Id_value]; 
        _fpc_holder.fpc_address = msg.sender; 
        _fpc_holder.fpc_identification_Id = _fpc_Id_value; 
        _fpc_holder.fpc_name = fpc_name;
        _fpc_holder.fpc_contributor = true;
      
       fpc_contributor_Id = _fpc_Id_value;

       fpc_registered_names.push(fpc_name);

        _FPC_Addresses.push(msg.sender);
       deneo_fpc_msg = "Congrats on being a member of DeNeo FPC your DeNeo Backbone Layer member and a life earner"; 
        
       emit  CongratsFPC_EIMTTED(fpc_name, _fpc_Id_value, msg.sender);

           return(deneo_fpc_msg); 
        }

        address[] private _PFPC_Addresses; 
       
         function Register_PFPC(string memory pfpc_name) external payable DeNeo_Only(msg.sender) returns(string memory deneo_pfpc_msg) {

          if (address(0) == msg.sender) {
            revert DeNeo__InValidAddress(msg.sender);
             }

          if(_sfpc_routing[sfpc_contributor_Id].sfpc_contributor == true) {
            revert DeNeo__SFPC_AlreadyRegistered(msg.sender); 
             }
         
           if(_fpc_routing[fpc_contributor_Id].fpc_contributor == true) {
            revert DeNeo__FPC_AlreadyRegistered(msg.sender);
           }

           if(_pfpc_routing[pfpc_contributor_Id].pfpc_contributor == true) {
              revert DeNeo__PFPC_AlreadyRegistered(msg.sender);
           }

           if(msg.value < pfpc_registeration_fee) {
            revert DeNeo__PFPC_HAS_NO_FUNDS(msg.sender, msg.value);
           }
           
        uint256 _pfpc_Id_value =  _pfpc_id_Gen + 1; 

        PFPC storage _pfpc_holder = _pfpc_routing[_pfpc_Id_value]; 
        _pfpc_holder.pfpc_address = msg.sender; 
        _pfpc_holder.pfpc_identification_Id = _pfpc_Id_value; 
        _pfpc_holder.pfpc_name = pfpc_name;
        _pfpc_holder.pfpc_contributor = true;
      
       pfpc_contributor_Id = _pfpc_Id_value;
       
       _PFPC_Addresses.push(msg.sender);

       pfpc_registered_names.push(pfpc_name);

       deneo_pfpc_msg = "Congrats on being a member of DeNeo FPC your DeNeo Backbone Layer member and a life earner"; 
        
       emit  CongratsPFPC_EIMTTED(pfpc_name, _pfpc_Id_value, msg.sender);

           return(deneo_pfpc_msg); 
        }
      uint256 private constant _sfpc_wages = 0.00005 ether;

     error DeNeo__Farm_PaySFPC_Transfer_Error(address _caller, uint256 _amount);

     event PaySFPC_Emitted(address indexed _sfpc_address, uint256 indexed _amount);

     function PaySFPC() public payable  DeNeo_Only(msg.sender) returns(bool) {
         if (address(0) == msg.sender) {
            revert DeNeo__InValidAddress(msg.sender);
             }

        SFPC memory _sfpc_state =  _sfpc_routing[sfpc_contributor_Id];

        for(uint256 x = 0; x < _SFPC_Addresses.length; x++) {
            (bool success, )  = payable(_SFPC_Addresses[x]).call{value: _sfpc_wages}("");

            if(success == false) { 
                revert DeNeo__Farm_PaySFPC_Transfer_Error(msg.sender, _sfpc_wages); 
            }
        }
         emit PaySFPC_Emitted(_sfpc_state.sfpc_address, _sfpc_wages);

        return true;
     }

     uint256 private constant _fpc_wages = 0.00005 ether;
     
     error DeNeo__Farm_PayFPC_Transfer_Error(address _caller, uint256 _amount);

     event PayFPC_Emitted(address indexed _fpc, uint256 indexed _amount);

     function PayFPC() public payable  DeNeo_Only(msg.sender) returns(bool) {
         if (address(0) == msg.sender) {
            revert DeNeo__InValidAddress(msg.sender);
             }

               FPC memory _fpc_state =  _fpc_routing[fpc_contributor_Id];
        
        for(uint256 x = 0; x < _FPC_Addresses.length; x++) {
            (bool success, )  = payable(_FPC_Addresses[x]).call{value: _fpc_wages}("");

            if(success == false) { 
                revert DeNeo__Farm_PayFPC_Transfer_Error(msg.sender, _fpc_wages); 
            }
        }
       
       emit PayFPC_Emitted(_fpc_state.fpc_address, _fpc_wages);

        return true;
     }


      uint256 private constant _pfpc_wages = 0.005 ether;
     
     error DeNeo__Farm_PayPFPC_Transfer_Error(address _caller, uint256 _amount);
     
     event PayPFPC_Emitted(address indexed _pfpc_Address, uint256 indexed _amount);

     function PayPFPC() public payable  DeNeo_Only(msg.sender) returns(bool) {
         if (address(0) == msg.sender) {
            revert DeNeo__InValidAddress(msg.sender);
             }
        
           PFPC memory _pfpc_state =  _pfpc_routing[pfpc_contributor_Id];
 
        for(uint256 x = 0; x < _PFPC_Addresses.length; x++) {
            (bool success, )  = payable(_PFPC_Addresses[x]).call{value: _pfpc_wages}("");

            if(success == false) { 
                revert DeNeo__Farm_PayPFPC_Transfer_Error(msg.sender, _pfpc_wages); 
            }
        }
        
        emit PayPFPC_Emitted(_pfpc_state.pfpc_address, _pfpc_wages);

        return true;
     }

     
    /* --------------------------- DeNeo AWI (Animal Welfare Insurance) -------------------------------*/
   
    struct Large_Life_Stock {
     address _animal_owner; 
     string[] _animal; 
     string[] _animal_Health; 
     string[] _animal_details; 
     string[] _insurance_type;
     uint256 _LLS_id; 
     bool _animal_health_Confirmed;
     uint256 _number; 
     bool monthly_insurance_State;
     bool _LLS_inspection_Confirmed;
     string[] _LLS_inspection_Location;
    }
    mapping(address => Large_Life_Stock) private _routing_LLS; 

     uint256 private _Large_LifeStock_Count = 0;
     uint256 private _LLS_Id; 

    struct Small_Life_Stock {
     address _animal_owner; 
     string[] _animal; 
     string[] _animal_Health; 
     string[] _animal_details; 
     string[] _insurance_type;
     uint256 _SLS_id; 
     uint256 _number;   
     bool _animal_health_Confirmed;
     bool monthly_insurance_State;
     bool _SLS_inspection_Confirmed;
    string[] _SLS_inspection_Location;
    }
   mapping(address => Small_Life_Stock) private _routing_SLS; 

   uint256 private _Small_LifeStock_Count = 0;
   uint256 private  _SLS_Id;

    struct Poultry_Birds { 
     address _animal_owner; 
     string[] _animal; 
     string[] _animal_Health; 
     string[] _animal_details; 
     string[] _insurance_type;
     uint256 _PB_id;   
     uint256 _number; 
     bool _animal_health_Confirmed;
     bool monthly_insurance_State;
     bool  _PB_inspection_Confirmed;
    string[] _PB_inspection_Location;
    }
   mapping(address => Poultry_Birds) private _routing_PB;

     uint256 private _Poultry_Birds_Count = 0;
     uint256 private _PB_Id; 

    struct Farm_Animals {
     address _animal_owner; 
     string[] _animal; 
     string[] _animal_Health; 
     string[] _animal_details; 
     string[] _insurance_type;
     uint256 _FA_id; 
     uint256 _number; 
     bool _animal_health_Confirmed;
     bool monthly_insurance_State;
     bool _FA_inspection_Confirmed;
     string[] _FA_inspection_Location;
    }
   mapping(address => Farm_Animals) private _routing_FA; 

    uint256 private _Farm_Animal_Count = 0; 
    uint256 private _FA_Id; 

    // LLS insurance fee for  5 animal monthly  
    uint256 private _LLS_Five_Fee = 0.4 ether;

    // LLS insurance fee for 10 animal monthly 
    uint256 private _LLS_Ten_Fee = 0.9 ether; 

    // SLS insurance fee for 5 animal monthly 
    uint256 private _SLS_Five_Fee = 0.3 ether; 

    // SLS insurance fee for 10 animal monthly 
    uint256 private _SLS_Ten_Fee = 0.6 ether;

    // Birds insurance fee for 5 birds monthly 
    uint256 private _Birds_Five_Fee = 0.2 ether;
    
    // Birds insurance fee for 10 birds monthly 
    uint256 private _Birds_Ten_Fee = 0.5 ether; 

    // Farm Animals fee for 5 animals  monthly 
    uint256 private _Farm_Animals_Five_Fee = 0.5 ether;

    // Farm Animals fee for 10 animals monthly 
    uint256 private _Farm_Animals_Ten_Fee = 0.9 ether; 
   
   // Animals Registeration Fee 
   uint256 private _Animal_Registeration_Fee = 0.4 ether; 

 
   error DeNeo__NOREGISTERATION_ON_INSURANCE(address _caller, bool _insur_true);
   error DeNeo__Client_Must_Enter_Monthly_InSurance_Type(string _monthly_type);
   error DeNeo__YOU_HAVE_A_CURRENT_Animal_Register_Id(address _caller, uint256 _register_id);
   error DeNeo__INSPECTION_ID_ACTIVATION_FAILED(string _msg);
   error DeNeo__Animal_Health_NOT_INSPECTED_YET(bool _health_false);
   error DeNeo__NO_INSPECTEION(bool _inspection_False);
   error DeNeo__Animal_Length_Should_Equal_Five(uint256 _animals_len);
   error DeNeo__Animal_Length_Should_Equal_Ten(uint256 _animals_len);

  uint256 private _LLS_Inspection_ID;
  uint256 private _SLS_Inspection_ID;
  uint256 private _PB_Inspection_ID;
  uint256 private _FA_Inspection_ID;
 
 
 /* ------------------------------------------------------------------------------------ */
                          // LARGE_LIFESTOCK --> LLS
          bool private _lls_confirmed_Inspection_detials;
    
     function Request_LLS_Registeration_Inspection(string memory _farm_location) external returns(string memory){
     if (address(0) == msg.sender) {
            revert DeNeo__InValidAddress(msg.sender);
     }
     if(_routing_LLS[msg.sender]._LLS_id != _LLS_Id) {
       revert DeNeo__YOU_HAVE_A_CURRENT_Animal_Register_Id(msg.sender, _routing_LLS[msg.sender]._LLS_id);
     }
       _LLS_Inspection_ID = 1;

    Large_Life_Stock storage _lls_var = _routing_LLS[msg.sender];
    _lls_var._LLS_inspection_Location.push(_farm_location);
     _lls_var._LLS_inspection_Confirmed = false;
     return("You have Successfully requested for Inspection registeration the inspection team will contact your location for further action.");
  }

 function LLS_Registeration_Inspection_Confirmed() public DeNeo_Only(msg.sender) {
     if (address(0) == msg.sender) {
            revert DeNeo__InValidAddress(msg.sender);
     }
     if(_LLS_Inspection_ID != 1) {
        revert DeNeo__INSPECTION_ID_ACTIVATION_FAILED("You have not requested for animal inspection");
     }
    
     _LLS_Inspection_ID = 0;

       _lls_confirmed_Inspection_detials = true;
 } 

  function Register_LLS(string memory _client_animal, string memory _client_animal_Health, string memory _client_animal_details, string memory _client_insurance_type) external payable returns(string memory _Registeration_Msg) {
     if (address(0) == msg.sender) {
            revert DeNeo__InValidAddress(msg.sender);
     }
     if(_routing_LLS[msg.sender].monthly_insurance_State == true) {
       revert DeNeo__NOREGISTERATION_ON_INSURANCE(msg.sender, _routing_LLS[msg.sender].monthly_insurance_State);
     }
     if(keccak256(abi.encode(_client_insurance_type)) != keccak256(abi.encode("Monthly"))) {
      revert DeNeo__Client_Must_Enter_Monthly_InSurance_Type(_client_insurance_type);
     }
      if(_lls_confirmed_Inspection_detials != true) {
        revert("The Inspection has not yet been confirmed yet!");
      }
     if(msg.value < _Animal_Registeration_Fee) {
       revert DeNeo__NO_FUNDS_FOUND(msg.sender, msg.value);    
     }
     
     uint256 _LLS_Value_ID =   _Large_LifeStock_Count + 1;

      _LLS_Id = _LLS_Value_ID;

 Large_Life_Stock  storage _lls_var = _routing_LLS[msg.sender];

 _lls_var._animal_owner = msg.sender; 
 _lls_var._animal.push(_client_animal);
 _lls_var._animal_Health.push(_client_animal_Health);
 _lls_var._animal_details.push(_client_animal_details);
 _lls_var._insurance_type.push(_client_insurance_type);
 _lls_var._LLS_id = _LLS_Value_ID;
 _lls_var._animal_health_Confirmed = false;
 _lls_var._number++;
 _lls_var.monthly_insurance_State = false;
 _lls_var._LLS_inspection_Confirmed = false;

 _Registeration_Msg = "Thanks for Registering LLS";

   return(_Registeration_Msg); 
  }
  uint256 private _TokenCount_LLS_Five;
  uint256 private _Token_ID_LLS_Five;
  uint256 private _TokenCount_LLS_Ten; 
  uint256 private _Token_ID_LLS_Ten; 

  function RequestMonthly_LLS_InSurance_Five_Animals() external payable returns(string memory) {
    if (address(0) == msg.sender) {
            revert DeNeo__InValidAddress(msg.sender);
     }
     if(_routing_LLS[msg.sender]._LLS_id != _LLS_Id) {
        revert("You don't have any current Registeration Id");
     }
     if(_routing_LLS[msg.sender]._animal.length < 5) {
        revert DeNeo__Animal_Length_Should_Equal_Five(_routing_LLS[msg.sender]._animal.length);
     }
     if(_routing_LLS[msg.sender]._animal.length >= 6) {
        revert("Plsease use the LLS 10 insurance function instead");
     }
     if(msg.value < _LLS_Five_Fee) {
      revert DeNeo__NO_FUNDS_FOUND(msg.sender, msg.value); 
     }

     Large_Life_Stock  storage _lls_var = _routing_LLS[msg.sender];
     _lls_var.monthly_insurance_State = true; 

     uint256 new_TokenCount = _TokenCount_LLS_Five++;
     _Token_ID_LLS_Five = new_TokenCount;

     _mint(msg.sender, new_TokenCount);
     _setTokenURI(new_TokenCount, _TokenImage);

     return("Your Monthly Insurance was successful for 5 LLS"); 
  }

   function RequestMonthly_LLS_InSurance_Ten_Animals() external payable returns(string memory) {
    if (address(0) == msg.sender) {
            revert DeNeo__InValidAddress(msg.sender);
     }
     if(_routing_LLS[msg.sender]._LLS_id != _LLS_Id) {
        revert("You don't have any current Registeration Id");
     }
     if(_routing_LLS[msg.sender]._animal.length < 10) {
        revert DeNeo__Animal_Length_Should_Equal_Ten(_routing_LLS[msg.sender]._animal.length);
     }
     if(_routing_LLS[msg.sender]._animal.length >= 11) {
        revert("Sorry you can not create insurance for more than ten LLS");
     }
     if(msg.value < _LLS_Ten_Fee) {
      revert DeNeo__NO_FUNDS_FOUND(msg.sender, msg.value); 
     }

     Large_Life_Stock  storage _lls_var = _routing_LLS[msg.sender];
     _lls_var.monthly_insurance_State = true; 

     uint256 new_TokenCount = _TokenCount_LLS_Ten++;
     _Token_ID_LLS_Ten = new_TokenCount;

     _mint(msg.sender, new_TokenCount);
     _setTokenURI(new_TokenCount, _TokenImage);

     return("Your Monthly Insurance was successful for 10 LLS"); 
  }
/* ------------------------------------------------------------------------------------ */

/* ------------------------------------------------------------------------------------- */
                   // SMALL_LIFESTOCK --> SLS
    bool private _sls_confirmed_Inspection_detials;
    
     function Request_SLS_Registeration_Inspection(string memory _farm_location) external returns(string memory){
     if (address(0) == msg.sender) {
            revert DeNeo__InValidAddress(msg.sender);
     }
     if(_routing_SLS[msg.sender]._SLS_id != _SLS_Id) {
       revert DeNeo__YOU_HAVE_A_CURRENT_Animal_Register_Id(msg.sender, _routing_SLS[msg.sender]._SLS_id);
     }
       _SLS_Inspection_ID = 1;

    Small_Life_Stock storage _sls_var = _routing_SLS[msg.sender];
    _sls_var._SLS_inspection_Location.push(_farm_location);
     _sls_var._SLS_inspection_Confirmed = false;
     return("You have Successfully requested for Inspection registeration the inspection team will contact your location for further action.");
  }

 function SLS_Registeration_Inspection_Confirmed() public DeNeo_Only(msg.sender) {
     if (address(0) == msg.sender) {
            revert DeNeo__InValidAddress(msg.sender);
     }
     if(_SLS_Inspection_ID != 1) {
        revert DeNeo__INSPECTION_ID_ACTIVATION_FAILED("You have not requested for animal inspection");
     }
    
     _SLS_Inspection_ID = 0;

       _sls_confirmed_Inspection_detials = true;
 } 

  function Register_SLS(string memory _client_animal, string memory _client_animal_Health, string memory _client_animal_details, string memory _client_insurance_type) external payable returns(string memory _Registeration_Msg) {
     if (address(0) == msg.sender) {
            revert DeNeo__InValidAddress(msg.sender);
     }
     if(_routing_SLS[msg.sender].monthly_insurance_State == true) {
       revert DeNeo__NOREGISTERATION_ON_INSURANCE(msg.sender, _routing_SLS[msg.sender].monthly_insurance_State);
     }
     if(keccak256(abi.encode(_client_insurance_type)) != keccak256(abi.encode("Monthly"))) {
      revert DeNeo__Client_Must_Enter_Monthly_InSurance_Type(_client_insurance_type);
     }
      if(_sls_confirmed_Inspection_detials != true) {
        revert("The Inspection has not yet been confirmed yet!");
      }
     if(msg.value < _Animal_Registeration_Fee) {
       revert DeNeo__NO_FUNDS_FOUND(msg.sender, msg.value);    
     }
     
     uint256 _SLS_Value_ID =   _Small_LifeStock_Count + 1;

      _SLS_Id = _SLS_Value_ID;

 Small_Life_Stock  storage _sls_var = _routing_SLS[msg.sender];
 _sls_var._animal_owner = msg.sender; 
 _sls_var._animal.push(_client_animal);
 _sls_var._animal_Health.push(_client_animal_Health);
 _sls_var._animal_details.push(_client_animal_details);
 _sls_var._insurance_type.push(_client_insurance_type);
 _sls_var._SLS_id = _SLS_Value_ID;
 _sls_var._animal_health_Confirmed = false;
 _sls_var._number++;
 _sls_var.monthly_insurance_State = false;
 _sls_var._SLS_inspection_Confirmed = false;

 _Registeration_Msg = "Thanks for Registering SLS";

   return(_Registeration_Msg); 
  }
  uint256 private _TokenCount_SLS_Five;
  uint256 private _Token_ID_SLS_Five;
  uint256 private _TokenCount_SLS_Ten; 
  uint256 private _Token_ID_SLS_Ten; 

  function RequestMonthly_SLS_InSurance_Five_Animals() external payable returns(string memory) {
    if (address(0) == msg.sender) {
            revert DeNeo__InValidAddress(msg.sender);
     }
     if(_routing_SLS[msg.sender]._SLS_id != _SLS_Id) {
        revert("You don't have any current Registeration Id");
     }
     if(_routing_SLS[msg.sender]._animal.length < 5) {
        revert DeNeo__Animal_Length_Should_Equal_Five(_routing_SLS[msg.sender]._animal.length);
     }
     if(_routing_SLS[msg.sender]._animal.length >= 6) {
        revert("Plsease use the LLS 10 insurance function instead");
     }
     if(msg.value < _SLS_Five_Fee) {
      revert DeNeo__NO_FUNDS_FOUND(msg.sender, msg.value); 
     }

     Small_Life_Stock  storage _sls_var = _routing_SLS[msg.sender];
     _sls_var.monthly_insurance_State = true; 

     uint256 new_TokenCount = _TokenCount_SLS_Five++;
     _Token_ID_SLS_Five = new_TokenCount;

     _mint(msg.sender, new_TokenCount);
     _setTokenURI(new_TokenCount, _TokenImage);

     return("Your Monthly Insurance was successful for 5 LLS"); 
  }

   function RequestMonthly_SLS_InSurance_Ten_Animals() external payable returns(string memory) {
    if (address(0) == msg.sender) {
            revert DeNeo__InValidAddress(msg.sender);
     }
     if(_routing_SLS[msg.sender]._SLS_id != _SLS_Id) {
        revert("You don't have any current Registeration Id");
     }
     if(_routing_SLS[msg.sender]._animal.length < 10) {
        revert DeNeo__Animal_Length_Should_Equal_Ten(_routing_SLS[msg.sender]._animal.length);
     }
     if(_routing_SLS[msg.sender]._animal.length >= 11) {
        revert("Sorry you can not create insurance for more than ten SLS");
     }
     if(msg.value < _SLS_Ten_Fee) {
      revert DeNeo__NO_FUNDS_FOUND(msg.sender, msg.value); 
     }

     Small_Life_Stock  storage _sls_var = _routing_SLS[msg.sender];
     _sls_var.monthly_insurance_State = true; 

     uint256 new_TokenCount = _TokenCount_SLS_Ten++;
     _Token_ID_SLS_Ten = new_TokenCount;

     _mint(msg.sender, new_TokenCount);
     _setTokenURI(new_TokenCount, _TokenImage);

     return("Your Monthly Insurance was successful for 10 SLS"); 
  }

  /* ----------------------------------------------------------------------------------- */ 
 
  /* ------------------------------------------------------------------------------------- */
                   // Poulty_Bird --> PB
bool private _pb_confirmed_Inspection_detials;
    
     function Request_PB_Registeration_Inspection(string memory _farm_location) external returns(string memory){
     if (address(0) == msg.sender) {
            revert DeNeo__InValidAddress(msg.sender);
     }
     if(_routing_PB[msg.sender]._PB_id != _PB_Id) {
       revert DeNeo__YOU_HAVE_A_CURRENT_Animal_Register_Id(msg.sender, _routing_PB[msg.sender]._PB_id);
     }
       _PB_Inspection_ID = 1;

    Poultry_Birds storage _pb_var = _routing_PB[msg.sender];
    _pb_var._PB_inspection_Location.push(_farm_location);
     _pb_var._PB_inspection_Confirmed = false;

     return("You have Successfully requested for Inspection registeration the inspection team will contact your location for further action.");
  }

 function PB_Registeration_Inspection_Confirmed() public DeNeo_Only(msg.sender) {
     if (address(0) == msg.sender) {
            revert DeNeo__InValidAddress(msg.sender);
     }
     if(_PB_Inspection_ID != 1) {
        revert DeNeo__INSPECTION_ID_ACTIVATION_FAILED("You have not requested for animal inspection");
     }
    
     _PB_Inspection_ID = 0;

      _pb_confirmed_Inspection_detials = true; 
 } 
  

  function Register_PB(string memory _client_animal, string memory _client_animal_Health, string memory _client_animal_details, string memory _client_insurance_type) external payable returns(string memory _Registeration_Msg) {
     if (address(0) == msg.sender) {
            revert DeNeo__InValidAddress(msg.sender);
     }
     if(_routing_PB[msg.sender].monthly_insurance_State == true) {
       revert DeNeo__NOREGISTERATION_ON_INSURANCE(msg.sender, _routing_PB[msg.sender].monthly_insurance_State);
     }
     if(keccak256(abi.encode(_client_insurance_type)) != keccak256(abi.encode("Monthly"))) {
      revert DeNeo__Client_Must_Enter_Monthly_InSurance_Type(_client_insurance_type);
     }
      if(_pb_confirmed_Inspection_detials != true) {
       revert("The inspection has not yet been confirmed!"); 
      }
     if(msg.value < _Animal_Registeration_Fee) {
       revert DeNeo__NO_FUNDS_FOUND(msg.sender, msg.value);    
     }
     
     uint256 _PB_Value_ID =   _Poultry_Birds_Count + 1;

      _PB_Id = _PB_Value_ID;

 Poultry_Birds  storage _pb_var = _routing_PB[msg.sender];
 _pb_var._animal_owner = msg.sender; 
 _pb_var._animal.push(_client_animal);
 _pb_var._animal_Health.push(_client_animal_Health);
 _pb_var._animal_details.push(_client_animal_details);
 _pb_var._insurance_type.push(_client_insurance_type);
 _pb_var._PB_id = _PB_Value_ID;
 _pb_var._animal_health_Confirmed = false;
 _pb_var._number++;
 _pb_var.monthly_insurance_State = false;
 _pb_var._PB_inspection_Confirmed = false;

 _Registeration_Msg = "Thanks for Registering PB";

   return(_Registeration_Msg); 
  }
  uint256 private _TokenCount_PB_Five;
  uint256 private _Token_ID_PB_Five;
  uint256 private _TokenCount_PB_Ten; 
  uint256 private _Token_ID_PB_Ten; 

  function RequestMonthly_PB_InSurance_Five_Animals() external payable returns(string memory) {
    if (address(0) == msg.sender) {
            revert DeNeo__InValidAddress(msg.sender);
     }
     if(_routing_PB[msg.sender]._PB_id != _PB_Id) {
        revert("You don't have any current Registeration Id");
     }
     if(_routing_PB[msg.sender]._animal.length < 5) {
        revert DeNeo__Animal_Length_Should_Equal_Five(_routing_PB[msg.sender]._animal.length);
     }
     if(_routing_PB[msg.sender]._animal.length >= 11) {
        revert("Plsease use the LLS 10 insurance function instead");
     }
     if(msg.value < _Birds_Five_Fee) {
      revert DeNeo__NO_FUNDS_FOUND(msg.sender, msg.value); 
     }

     Poultry_Birds  storage _pb_var = _routing_PB[msg.sender];
     _pb_var.monthly_insurance_State = true; 

     uint256 new_TokenCount = _TokenCount_PB_Five++;
     _Token_ID_PB_Five = new_TokenCount;

     _mint(msg.sender, new_TokenCount);
     _setTokenURI(new_TokenCount, _TokenImage);

     return("Your Monthly Insurance was successful for 5 PB"); 
  }

   function RequestMonthly_PB_InSurance_Ten_Animals() external payable returns(string memory) {
    if (address(0) == msg.sender) {
            revert DeNeo__InValidAddress(msg.sender);
     }
     if(_routing_PB[msg.sender]._PB_id != _PB_Id) {
        revert("You don't have any current Registeration Id");
     }
     if(_routing_PB[msg.sender]._animal.length <  10) {
        revert DeNeo__Animal_Length_Should_Equal_Ten(_routing_PB[msg.sender]._animal.length);
     }
     if(_routing_PB[msg.sender]._animal.length >= 11) {
        revert("Sorry you can not create insurance for more than ten PB");
     }
     if(msg.value < _Birds_Ten_Fee) {
      revert DeNeo__NO_FUNDS_FOUND(msg.sender, msg.value); 
     }

     Poultry_Birds  storage _pb_var = _routing_PB[msg.sender];
     _pb_var.monthly_insurance_State = true; 

     uint256 new_TokenCount = _TokenCount_PB_Ten++;
     _Token_ID_PB_Ten = new_TokenCount;

     _mint(msg.sender, new_TokenCount);
     _setTokenURI(new_TokenCount, _TokenImage);

     return("Your Monthly Insurance was successful for 10 PB"); 
  }

  /* ----------------------------------------------------------------------------------- */ 
 
  /* ------------------------------------------------------------------------------------- */
                   // Farm_Animals --> FA
bool private _fa_confirmed_Inspection_detials;

     function Request_FA_Registeration_Inspection(string memory _farm_location) external returns(string memory){
     if (address(0) == msg.sender) {
            revert DeNeo__InValidAddress(msg.sender);
     }
     if(_routing_FA[msg.sender]._FA_id != _FA_Id) {
       revert DeNeo__YOU_HAVE_A_CURRENT_Animal_Register_Id(msg.sender, _routing_FA[msg.sender]._FA_id);
     }
       _FA_Inspection_ID = 1;

    Farm_Animals storage _fa_var = _routing_FA[msg.sender];
    _fa_var._FA_inspection_Location.push(_farm_location);
     _fa_var._FA_inspection_Confirmed = false;

     return("You have Successfully requested for Inspection registeration the inspection team will contact your location for further action.");
  }

 function FA_Registeration_Inspection_Confirmed() public DeNeo_Only(msg.sender) {
     if (address(0) == msg.sender) {
            revert DeNeo__InValidAddress(msg.sender);
     }
     if(_FA_Inspection_ID != 1) {
        revert DeNeo__INSPECTION_ID_ACTIVATION_FAILED("You have not requested for animal inspection");
     }
    
     _FA_Inspection_ID = 0;

   _fa_confirmed_Inspection_detials = true;

 } 
  

  function Register_FA(string memory _client_animal, string memory _client_animal_Health, string memory _client_animal_details, string memory _client_insurance_type) external payable returns(string memory _Registeration_Msg) {
     if (address(0) == msg.sender) {
            revert DeNeo__InValidAddress(msg.sender);
     }
     if(_routing_FA[msg.sender].monthly_insurance_State == true) {
       revert DeNeo__NOREGISTERATION_ON_INSURANCE(msg.sender, _routing_FA[msg.sender].monthly_insurance_State);
     }
     if(keccak256(abi.encode(_client_insurance_type)) != keccak256(abi.encode("Monthly"))) {
      revert DeNeo__Client_Must_Enter_Monthly_InSurance_Type(_client_insurance_type);
     }
      if(_fa_confirmed_Inspection_detials != true) {
        revert("The inspection has not yet been confirmed yet!"); 
      }
     if(msg.value < _Animal_Registeration_Fee) {
       revert DeNeo__NO_FUNDS_FOUND(msg.sender, msg.value);    
     }
     
     uint256 _FA_Value_ID =   _Farm_Animal_Count + 1;

      _FA_Id = _FA_Value_ID;

 Farm_Animals storage _fa_var = _routing_FA[msg.sender];
 _fa_var._animal_owner = msg.sender; 
 _fa_var._animal.push(_client_animal);
 _fa_var._animal_Health.push(_client_animal_Health);
 _fa_var._animal_details.push(_client_animal_details);
 _fa_var._insurance_type.push(_client_insurance_type);
 _fa_var._FA_id = _FA_Value_ID;
 _fa_var._animal_health_Confirmed = false;
 _fa_var._number++;
 _fa_var.monthly_insurance_State = false;
 _fa_var._FA_inspection_Confirmed = false;

 _Registeration_Msg = "Thanks for Registering PB";

   return(_Registeration_Msg); 
  }
  uint256 private _TokenCount_FA_Five;
  uint256 private _Token_ID_FA_Five;
  uint256 private _TokenCount_FA_Ten; 
  uint256 private _Token_ID_FA_Ten; 

  function RequestMonthly_FA_InSurance_Five_Animals() external payable returns(string memory) {
    if (address(0) == msg.sender) {
            revert DeNeo__InValidAddress(msg.sender);
     }
     if(_routing_FA[msg.sender]._FA_id != _FA_Id) {
        revert("You don't have any current Registeration Id");
     }
     if(_routing_FA[msg.sender]._animal.length < 5) {
        revert DeNeo__Animal_Length_Should_Equal_Five(_routing_FA[msg.sender]._animal.length);
     }
     if(_routing_FA[msg.sender]._animal.length >= 11) {
        revert("Plsease use the LLS 10 insurance function instead");
     }
     if(msg.value < _Farm_Animals_Five_Fee) {
      revert DeNeo__NO_FUNDS_FOUND(msg.sender, msg.value); 
     }

     Farm_Animals  storage _fa_var = _routing_FA[msg.sender];
     _fa_var.monthly_insurance_State = true; 

     uint256 new_TokenCount = _TokenCount_FA_Five++;
     _Token_ID_FA_Five = new_TokenCount;

     _mint(msg.sender, new_TokenCount);
     _setTokenURI(new_TokenCount, _TokenImage);

     return("Your Monthly Insurance was successful for 5 FA"); 
  }

   function RequestMonthly_FA_InSurance_Ten_Animals() external payable returns(string memory) {
    if (address(0) == msg.sender) {
            revert DeNeo__InValidAddress(msg.sender);
     }
     if(_routing_FA[msg.sender]._FA_id != _FA_Id) {
        revert("You don't have any current Registeration Id");
     }
     if(_routing_FA[msg.sender]._animal.length < 10) {
        revert DeNeo__Animal_Length_Should_Equal_Ten(_routing_FA[msg.sender]._animal.length);
     }
     if(_routing_FA[msg.sender]._animal.length >= 11) {
        revert("Sorry you can not create insurance for more than ten FA");
     }
     if(msg.value < _Farm_Animals_Ten_Fee) {
      revert DeNeo__NO_FUNDS_FOUND(msg.sender, msg.value); 
     }

     Farm_Animals  storage _fa_var = _routing_FA[msg.sender];
     _fa_var.monthly_insurance_State = true; 

     uint256 new_TokenCount = _TokenCount_FA_Ten++;
     _Token_ID_FA_Ten = new_TokenCount;

     _mint(msg.sender, new_TokenCount);
     _setTokenURI(new_TokenCount, _TokenImage);

     return("Your Monthly Insurance was successful for 10 FA"); 
  }

  /* ----------------------------------------------------------------------------------- */ 

   function ReSetMonthly_Insurance() public DeNeo_Only(msg.sender) returns(bool) {
      if (address(0) == msg.sender) {
            revert DeNeo__InValidAddress(msg.sender);
     }

     Large_Life_Stock  storage _lls_var = _routing_LLS[msg.sender];
     _lls_var.monthly_insurance_State = false;

     Small_Life_Stock storage _sls_var = _routing_SLS[msg.sender];
     _sls_var.monthly_insurance_State  = false;

     Poultry_Birds storage _pb_var = _routing_PB[msg.sender];
     _pb_var.monthly_insurance_State = false;

      Farm_Animals storage _fa_var = _routing_FA[msg.sender]; 
        _fa_var.monthly_insurance_State  = false;

      return(true); 
   }

   function _update(address to, uint256 tokenId, address auth) internal virtual override returns (address) {
     
        if(_ownerOf(tokenId) != address(0) && address(0) != to) {
            revert("You can not Transfer NFT card, only mint and burn");
        }
        
        return super._update(to, tokenId, auth);
    }
     
       /* -----------------Animal Welfare Insurance(AWI) Getter Functions ----------------*/
      
       // --> LLS 
    function ViewLLS_Animal_Len() external view returns(uint256) {
        return(_routing_LLS[msg.sender]._animal.length);
    }       
     
     function ViewLLS_Animal_Health_Len() external view returns(uint256) { 
        uint256 lls_animals_health_len = _routing_LLS[msg.sender]._animal_Health.length;
        return(lls_animals_health_len);
     }

     function ViewLLS_Animal_Details_Len() external view returns(uint256) { 
        return(_routing_LLS[msg.sender]._animal_details.length);
     }

     function ViewLLS_Insurance_Type() external view returns(uint256) {
        return(_routing_LLS[msg.sender]._insurance_type.length);
     }

     function ViewLLS_Register_id() external view returns(uint256) {
        return(_routing_LLS[msg.sender]._LLS_id);
     }

     function ViewLLS_NumberOFRegisteration() external view returns(uint256) {
        return(_routing_LLS[msg.sender]._number);
     }

      function ViewLLS_Animal_Health_State() external view returns(uint256) { 
        return(_routing_LLS[msg.sender]._animal_Health.length); 
     }
 
     function ViewLLS_Monthly_Insurance_State() external view returns(bool) { 
        return(_routing_LLS[msg.sender].monthly_insurance_State);
     }

     function ViewLLS_Inspection_Confirmed_State() external view returns(bool) {
        return(_routing_LLS[msg.sender]._LLS_inspection_Confirmed);
     }

      function ViewLLS_Total_Inspection_Location_Len() external view returns(uint256) {
        return(_routing_LLS[msg.sender]._LLS_inspection_Location.length);
     } 

     function ViewLLS_Insurance_Animals_Five_Fee() external view returns(uint256) { 
        return(_LLS_Five_Fee);
     }

     function ViewLLS_Insurance_Animal_Ten_Fee() external view returns(uint256) { 
        return(_LLS_Ten_Fee);
     }

     function Animal_Registeration_Fee() external view returns(uint256) { 
        return(_Animal_Registeration_Fee); 
     }

     function ViewLLS_Inspection_ID() external view returns(uint256) {
        return(_LLS_Inspection_ID);
     }

     function ViewLLS_TokenCount_Five() external view returns(uint256) {
        return(_TokenCount_LLS_Five);
     }

     function ViewLLS_Token_ID_Five() external view returns(uint256) { 
        return(_Token_ID_LLS_Five);
     }

     function ViewLLS_TokenCount_Ten() external view returns(uint256) {
        return(_TokenCount_LLS_Ten);
     }

     function ViewLLS_Token_ID_Ten() external view returns(uint256) { 
        return(_Token_ID_LLS_Ten);
     }

     /* ---------------------------------------------- */

     /* ------------------------------------------- */
     // --> SLS 
     
         function ViewSLS_Animal_Len() external view returns(uint256) {
        return(_routing_SLS[msg.sender]._animal.length);
    }       
     
     function ViewSLS_Animal_Health_Len() external view returns(uint256) { 
        return(_routing_SLS[msg.sender]._animal_Health.length);
     }

     function ViewSLS_Animal_Details_Len() external view returns(uint256) { 
        return(_routing_SLS[msg.sender]._animal_details.length);
     }

     function ViewSLS_Insurance_Type() external view returns(uint256) {
        return(_routing_SLS[msg.sender]._insurance_type.length);
     }

     function ViewSLS_Register_id() external view returns(uint256) {
        return(_routing_SLS[msg.sender]._SLS_id);
     }

     function ViewSLS_NumberOFRegisteration() external view returns(uint256) {
        return(_routing_SLS[msg.sender]._number);
     }

      function ViewSLS_Animal_Health_State() external view returns(uint256) { 
        return(_routing_SLS[msg.sender]._animal_Health.length); 
     } 

     function ViewSLS_Monthly_Insurance_State() external view returns(bool) { 
        return(_routing_SLS[msg.sender].monthly_insurance_State);
     }

     function ViewSLS_Inspection_Confirmed_State() external view returns(bool) {
        return(_routing_SLS[msg.sender]._SLS_inspection_Confirmed);
     }

      function ViewSLS_Total_Inspection_Location_Len() external view returns(uint256) {
        return(_routing_SLS[msg.sender]._SLS_inspection_Location.length);
     } 

     function ViewSLS_Insurance_Animals_Five_Fee() external view returns(uint256) { 
        return(_SLS_Five_Fee);
     }

     function ViewSLS_Insurance_Animal_Ten_Fee() external view returns(uint256) { 
        return(_SLS_Ten_Fee);
     }

     function ViewSLS_Inspection_ID() external view returns(uint256) {
        return(_SLS_Inspection_ID);
     }

     function ViewSLS_TokenCount_Five() external view returns(uint256) {
        return(_TokenCount_SLS_Five);
     }

     function ViewSLS_Token_ID_Five() external view returns(uint256) { 
        return(_Token_ID_SLS_Five);
     }

     function ViewSLS_TokenCount_Ten() external view returns(uint256) {
        return(_TokenCount_SLS_Ten);
     }

     function ViewSLS_Token_ID_Ten() external view returns(uint256) { 
        return(_Token_ID_SLS_Ten);
     }

     /* -------------------------------------------------- */ 
    
    /* ------------------------------------------- */
     // --> PB 
     
         function ViewPB_Animal_Len() external view returns(uint256) {
        return(_routing_PB[msg.sender]._animal.length);
    }       
     
    function ViewPB_Animal_Health_Len() external view returns(uint256) { 
        return(_routing_PB[msg.sender]._animal_Health.length);
     } 

      function ViewPB_Animal_Details_Len() external view returns(uint256) { 
        return(_routing_PB[msg.sender]._animal_details.length);
     } 

      function ViewPB_Insurance_Type() external view returns(uint256) {
        return(_routing_PB[msg.sender]._insurance_type.length);
     }
 
      function ViewPB_Register_id() external view returns(uint256) {
        return(_routing_PB[msg.sender]._PB_id);
     } 

      function ViewPB_NumberOFRegisteration() external view returns(uint256) {
        return(_routing_PB[msg.sender]._number);
     } 

      function ViewPB_Animal_Health_State() external view returns(uint256) { 
        return(_routing_PB[msg.sender]._animal_Health.length); 
     }
 
     function ViewPB_Monthly_Insurance_State() external view returns(bool) { 
        return(_routing_PB[msg.sender].monthly_insurance_State);
     } 

      function ViewPB_Inspection_Confirmed_State() external view returns(bool) {
        return(_routing_PB[msg.sender]._PB_inspection_Confirmed);
     } 

      function ViewPB_Total_Inspection_Location_Len() external view returns(uint256) {
        return(_routing_PB[msg.sender]._PB_inspection_Location.length);
     } 

      function ViewPB_Insurance_Animals_Five_Fee() external view returns(uint256) { 
        return(_Birds_Five_Fee);
     } 

      function ViewPB_Insurance_Animal_Ten_Fee() external view returns(uint256) { 
        return(_Birds_Ten_Fee);
     } 

      function ViewPB_Inspection_ID() external view returns(uint256) {
        return(_PB_Inspection_ID);
     } 

      function ViewPB_TokenCount_Five() external view returns(uint256) {
        return(_TokenCount_PB_Five);
     } 

      function ViewPB_Token_ID_Five() external view returns(uint256) { 
        return(_Token_ID_PB_Five);
     } 

      function ViewPB_TokenCount_Ten() external view returns(uint256) {
        return(_TokenCount_PB_Ten);
     } 

      function ViewPB_Token_ID_Ten() external view returns(uint256) { 
        return(_Token_ID_PB_Ten);
     } 

     /* -------------------------------------------------- */ 

  
   /* ------------------------------------------- */
     // --> FA 
     
         function ViewFA_Animal_Len() external view returns(uint256) {
        return(_routing_FA[msg.sender]._animal.length);
    }       
     
      function ViewFA_Animal_Health_Len() external view returns(uint256) { 
        return(_routing_FA[msg.sender]._animal_Health.length);
     } 
 
     function ViewFA_Animal_Details_Len() external view returns(uint256) { 
        return(_routing_FA[msg.sender]._animal_details.length);
     } 

      function ViewFA_Insurance_Type() external view returns(uint256) {
        return(_routing_FA[msg.sender]._insurance_type.length);
     } 

      function ViewFA_Register_id() external view returns(uint256) {
        return(_routing_FA[msg.sender]._FA_id);
     } 

      function ViewFA_NumberOFRegisteration() external view returns(uint256) {
        return(_routing_FA[msg.sender]._number);
     } 

     function ViewFA_Animal_Health_State() external view returns(uint256) { 
        return(_routing_FA[msg.sender]._animal_Health.length); 
     } 

      function ViewFA_Monthly_Insurance_State() external view returns(bool) { 
        return(_routing_FA[msg.sender].monthly_insurance_State);
     } 

     function ViewFA_Inspection_Confirmed_State() external view returns(bool) {
        return(_routing_FA[msg.sender]._FA_inspection_Confirmed);
     }

      function ViewFA_Total_Inspection_Location_Len() external view returns(uint256) {
        return(_routing_FA[msg.sender]._FA_inspection_Location.length);
     } 

      function ViewFA_Insurance_Animals_Five_Fee() external view returns(uint256) { 
        return(_Farm_Animals_Five_Fee);
     } 

      function ViewFA_Insurance_Animal_Ten_Fee() external view returns(uint256) { 
        return(_Farm_Animals_Ten_Fee);
     } 

      function ViewFA_Inspection_ID() external view returns(uint256) {
        return(_FA_Inspection_ID);
     } 

      function ViewFA_TokenCount_Five() external view returns(uint256) {
        return(_TokenCount_FA_Five);
     } 

      function ViewFA_Token_ID_Five() external view returns(uint256) { 
        return(_Token_ID_FA_Five);
     } 

     function ViewFA_TokenCount_Ten() external view returns(uint256) {
        return(_TokenCount_FA_Ten);
     }
 
     function ViewFA_Token_ID_Ten() external view returns(uint256) { 
        return(_Token_ID_FA_Ten);
     } 

     /* -------------------------------------------------- */ 

        // Automatically called when ETH is sent with empty calldata
          receive() external payable {
          deposit__To_DeNeo();
          } 

        // Called when ETH is sent with non-matching function call
             fallback() external payable {
          deposit__To_DeNeo();
         }  
    }
    