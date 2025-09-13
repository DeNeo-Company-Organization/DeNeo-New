
const {ethers} = require("hardhat"); 
/* const {encodeCallback} = require("@chainlink/functions-toolkit"); */
const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const {expect} = require("chai");


describe("DENEO FARMING TESTING UNIT TESTING ", () => {

  const FIXTUREFUNC = async () => {
    // mock price feed
    const DECIMALS = 8;
    const INITIAL_PRICE = ethers.parseEther("2000", DECIMALS);
      const MockV3Aggregator =  await ethers.getContractFactory("DeNeoDataMock");
     const mockFeed = await MockV3Aggregator.deploy(DECIMALS, INITIAL_PRICE);
       await mockFeed.waitForDeployment();
      const mockFeedAddress = await mockFeed.getAddress(); 

    /* ------------------------------------------------------------------------- */
    /* ------------------------------------------------------------------------- */
  /* ----------------------------------------------------------------------------- */ 
     // Signers
      const [owner, signer1, signer2, signer3, signer4, signer5, signer6] = await ethers.getSigners(); 
      // ----------------------------------------------------------------------------- 
      const DENEO = await ethers.getContractFactory("DeNeo_Farm"); 
       
      let DeNeo_Farm;

    const Contract_Instance =   await DENEO.deploy("abuja", "lagos", "enugu", "portharcount", "kano", "niger", "sokoto", "nft_insurance", mockFeedAddress); 

    await Contract_Instance.waitForDeployment();

    DeNeo_Farm = Contract_Instance; 
     return{mockFeed, mockFeedAddress, owner, signer1, signer2, signer3, signer4, signer5, signer6, DENEO, DeNeo_Farm}
   } 

  it(" Testing the deployments state", async () => { 
    const { DeNeo_Farm, mockFeed} = await loadFixture(FIXTUREFUNC);
    console.log(mockFeed);
   console.log(DeNeo_Farm)
  });

    describe("TESTING THE PRICE_FEED", () => {

      it("should return mock initial price", async () => {
        const { INITIAL_PRICE,mockFeed} = await loadFixture(FIXTUREFUNC);
          const price = await mockFeed.getLatestPrice();
        expect(price == INITIAL_PRICE);
      })
      it("should update price when mock changes", async () => {
        const {DECIMALS, mockFeed,} = await loadFixture(FIXTUREFUNC);
        const NEW_PRICE =  ethers.parseUnits("2500", DECIMALS);

        const update_mockfeed = await mockFeed.updatePrice(NEW_PRICE);
         console.log(update_mockfeed);
        const price = await mockFeed.getLatestPrice();
        expect(price == NEW_PRICE);
      })
   }) 
 
    describe("This is the Unit Test for the DeNeo Farming Onchain", () => {

    it("This is the test for the RegisterFarmProvider, testing to ensure that a user can register to be a farmProvider and that the transaction is successfully mined.", async () => {
     const {DeNeo_Farm, signer1} = await loadFixture(FIXTUREFUNC);
      
     // Calling the Farm Provider 
     // Args 
     const name = "Noviga_Dan"; 
     const farmer_License = "Farmer Proof"; 
     const farmer_Face_Photo = "Farmer Photo"; 
     const Num_Products = 10; 
     const ProductsList = ["beans","cow","yam","goat","snails","turkey","rice","vegetable","5 bottle of milk", "ram"]; 
     const farmer_Experience = 4; 
     const farm_Size = "30 plots of land"; 

     const RegFarmProvider = await DeNeo_Farm.connect(signer1).RegisterFarmProvider(name, farmer_License, farmer_Face_Photo, Num_Products, ProductsList, farmer_Experience, farm_Size, {value: ethers.parseEther("0.5")}); 
      expect(RegFarmProvider); 
    });
    
    it("This is the test for the RegisterFarmConsumer, testing to ensure that the farm consumers can successfully register and that the transaction is mined.", async () => {

      const {DeNeo_Farm, signer1} = await loadFixture(FIXTUREFUNC); 

      // Consumer Calling to register
      // Args  
      const name  = "Noviga_Dan"; 
      const email = "danstancodan@gmail.com";  
      const RegConsumer = await DeNeo_Farm.connect(signer1).RegisterFarmConsumer(name, email);
      expect(RegConsumer);
    }); 
    
    it("This is the test for the FP_ProductListing, testing to ensure that the Farm Providers users are able to successfully list their products and the transaction is mined.", async () => {
      const {DeNeo_Farm, signer5, signer6} = await loadFixture(FIXTUREFUNC); 
         const name = "Noviga_Dan";     

       // Farm Consumer 
       
      const email = "danstancodan@gmail.com";  
      const RegConsumer = await DeNeo_Farm.connect(signer5).RegisterFarmConsumer(name, email);
      expect(RegConsumer);

      // Calling the Farm Provider 
     // Args 
  
     const farmer_License = "Farmer Proof"; 
     const farmer_Face_Photo = "Farmer Photo"; 
     const Num_Products = 10; 
     const ProductsList = ["beans","cow","yam","goat","snails","turkey","rice","vegetable","5 bottle of milk", "ram"]; 
     const farmer_Experience = 4; 
     const farm_Size = "30 plots of land"; 

     const RegFarmProvider = await DeNeo_Farm.connect(signer6).RegisterFarmProvider(name, farmer_License, farmer_Face_Photo, Num_Products, ProductsList, farmer_Experience, farm_Size, {value: ethers.parseEther("0.5")}); 
     expect(RegFarmProvider); 
     
      // Farm Provder calling to list product he/she has
      //Args 
      const productName = "mango"; 
      const aboutProduct = "Believe me you will fall in love with mango if you just try one"; 
      const productContent = "This is a fruit that's green in outer color and yellow inside when opened"; 
      const productWholePrice = 2000.00; 
      const productQuantity = 20; 
      const productSinglePrice = 1.0; 
     
      const FP_ProductListing_Func = await DeNeo_Farm.connect(signer6).FP_ProductListing(productName, aboutProduct, productContent, productWholePrice, productQuantity, productSinglePrice, {value: ethers.parseEther("0.5")});

     expect(FP_ProductListing_Func);
    }); 

    it("This is the test for the FC_ProductRequest,  testing to ensure that a consumer can request for a onchain farm product and the transaction is successfully mined.", async () => {
     const {DeNeo_Farm, signer1, signer2} = await loadFixture(FIXTUREFUNC); 

      // Consumer Calling to register
      // Args  
      const name  = "Noviga_Dan"; 
      const email = "danstancodan@gmail.com";  
      const RegConsumer = await DeNeo_Farm.connect(signer1).RegisterFarmConsumer(name, email);
      expect(RegConsumer);

      // Calling the FarmProvider 
      //Args
     const farmer_License = "Farmer Proof"; 
     const farmer_Face_Photo = "Farmer Photo"; 
     const Num_Products = 10; 
     const ProductsList = ["beans","cow","yam","goat","snails","turkey","rice","vegetable","5 bottle of milk", "ram"]; 
     const farmer_Experience = 4; 
     const farm_Size = "30 plots of land"; 

     const RegFarmProvider = await DeNeo_Farm.connect(signer2).RegisterFarmProvider(name, farmer_License, farmer_Face_Photo, Num_Products, ProductsList, farmer_Experience, farm_Size, {value: ethers.parseEther("0.5")}); 
     expect(RegFarmProvider);
      
     // Calling the FC_ProductRequest 
     //Args
     //Signer2 Farm Provider Address 
     const Signer2Address = await signer2.getAddress();
     
     const Your_destination = "Your location"; 
     const ReqName = "Dan"; 
     const Contact_Num1 = 0;
     const Contact_Num2 = 0; 
     const OwnerAddress = Signer2Address; 
     const OwnerProductPrice = 2000.00; 
     const OwnerProductQuantity = 20;
     const NationalState = "Enugu";
     
    const FC_ProductRequest_Func = await DeNeo_Farm.connect(signer1).FC_ProductRequest(Your_destination, ReqName, Contact_Num1, Contact_Num2, OwnerAddress, OwnerProductPrice, OwnerProductQuantity, NationalState);
    expect(FC_ProductRequest_Func);
    });

    it("This is the test for the FC_CancelRequest, this is use to cancel an initalize request from consumer ensuring it will cancel and the transaction will be successful", async () => {
        const {DeNeo_Farm, signer1, signer2} = await loadFixture(FIXTUREFUNC); 

      // Consumer Calling to register
      // Args  
      const name  = "Noviga_Dan"; 
      const email = "danstancodan@gmail.com";  
      const RegConsumer = await DeNeo_Farm.connect(signer1).RegisterFarmConsumer(name, email);
      expect(RegConsumer);

      // Calling the FarmProvider 
      //Args
     const farmer_License = "Farmer Proof"; 
     const farmer_Face_Photo = "Farmer Photo"; 
     const Num_Products = 10; 
     const ProductsList = ["beans","cow","yam","goat","snails","turkey","rice","vegetable","5 bottle of milk", "ram"]; 
     const farmer_Experience = 4; 
     const farm_Size = "30 plots of land"; 

     const RegFarmProvider = await DeNeo_Farm.connect(signer2).RegisterFarmProvider(name, farmer_License, farmer_Face_Photo, Num_Products, ProductsList, farmer_Experience, farm_Size, {value: ethers.parseEther("0.5")}); 
     expect(RegFarmProvider);
      
     // Calling the FC_ProductRequest 
     //Args
     //Signer2 Farm Provider Address 
     const Signer2Address = await signer2.getAddress();
     
     const Your_destination = "Your location"; 
     const ReqName = "Dan"; 
     const Contact_Num1 = 0;
     const Contact_Num2 = 0; 
     const OwnerAddress = Signer2Address; 
     const OwnerProductPrice = 2000.00; 
     const OwnerProductQuantity = 20;
     const NationalState = "Enugu";
     
    const FC_ProductRequest_Func = await DeNeo_Farm.connect(signer1).FC_ProductRequest(Your_destination, ReqName, Contact_Num1, Contact_Num2, OwnerAddress, OwnerProductPrice, OwnerProductQuantity, NationalState);
    expect(FC_ProductRequest_Func);
      
    // Cancel your Request 
    const FC_CancelRequest_Func = await DeNeo_Farm.connect(signer1).FC_CancelRequest(); 
    expect(FC_CancelRequest_Func); 
    });

    it("This is the test for the BuyProductRequested, testing if when a consumer initializes the request and clicks to buy the requested product from the provider as the funds will be automatically be forwarded to the provider registered wallet address", async () => {
        const {DeNeo_Farm, signer1, signer2} = await loadFixture(FIXTUREFUNC); 

      // Consumer Calling to register
      // Args  
      const name  = "Noviga_Dan"; 
      const email = "danstancodan@gmail.com";  
      const RegConsumer = await DeNeo_Farm.connect(signer1).RegisterFarmConsumer(name, email);
      expect(RegConsumer);

      // Calling the FarmProvider 
      //Args
     const farmer_License = "Farmer Proof"; 
     const farmer_Face_Photo = "Farmer Photo"; 
     const Num_Products = 10; 
     const ProductsList = ["beans","cow","yam","goat","snails","turkey","rice","vegetable","5 bottle of milk", "ram"]; 
     const farmer_Experience = 4; 
     const farm_Size = "30 plots of land"; 

     const RegFarmProvider = await DeNeo_Farm.connect(signer2).RegisterFarmProvider(name, farmer_License, farmer_Face_Photo, Num_Products, ProductsList, farmer_Experience, farm_Size, {value: ethers.parseEther("0.5")}); 
     expect(RegFarmProvider);
      
     // Calling the FC_ProductRequest 
     //Args
     //Signer2 Farm Provider Address 
     const Signer2Address = await signer2.getAddress();
     
     const Your_destination = "Your location"; 
     const ReqName = "Dan"; 
     const Contact_Num1 = 0;
     const Contact_Num2 = 0; 
     const OwnerAddress = Signer2Address; 
     const OwnerProductPrice = 2000.00; 
     const OwnerProductQuantity = 20;
     const NationalState = "Enugu";
     
    const FC_ProductRequest_Func = await DeNeo_Farm.connect(signer1).FC_ProductRequest(Your_destination, ReqName, Contact_Num1, Contact_Num2, OwnerAddress, OwnerProductPrice, OwnerProductQuantity, NationalState);
    expect(FC_ProductRequest_Func);

    // BuyProductRequested 
    const BuyProductRequested_Func = await DeNeo_Farm.connect(signer1).BuyProductRequested();
    expect(BuyProductRequested_Func); 
    }); 

    it("This is the test for the HomePickUp, testing to ensure that when a consumer buys Requested Product can demand to get the product to their specified location which was in the request and the company will automate the action and also ensure the transaction was successful", async () => {
        const {DeNeo_Farm, signer1, signer2} = await loadFixture(FIXTUREFUNC); 

      // Consumer Calling to register
      // Args  
      const name  = "Noviga_Dan"; 
      const email = "danstancodan@gmail.com";  
      const RegConsumer = await DeNeo_Farm.connect(signer1).RegisterFarmConsumer(name, email);
      expect(RegConsumer);

      // Calling the FarmProvider 
      //Args
     const farmer_License = "Farmer Proof"; 
     const farmer_Face_Photo = "Farmer Photo"; 
     const Num_Products = 10; 
     const ProductsList = ["beans","cow","yam","goat","snails","turkey","rice","vegetable","5 bottle of milk", "ram"]; 
     const farmer_Experience = 4; 
     const farm_Size = "30 plots of land"; 

     const RegFarmProvider = await DeNeo_Farm.connect(signer2).RegisterFarmProvider(name, farmer_License, farmer_Face_Photo, Num_Products, ProductsList, farmer_Experience, farm_Size, {value: ethers.parseEther("0.5")}); 
     expect(RegFarmProvider);
      
     // Calling the FC_ProductRequest 
     //Args
     //Signer2 Farm Provider Address 
     const Signer2Address = await signer2.getAddress();
     
     const Your_destination = "Your location"; 
     const ReqName = "Dan"; 
     const Contact_Num1 = 0;
     const Contact_Num2 = 0; 
     const OwnerAddress = Signer2Address; 
     const OwnerProductPrice = 2000.00; 
     const OwnerProductQuantity = 20;
     const NationalState = "Enugu";
     
    const FC_ProductRequest_Func = await DeNeo_Farm.connect(signer1).FC_ProductRequest(Your_destination, ReqName, Contact_Num1, Contact_Num2, OwnerAddress, OwnerProductPrice, OwnerProductQuantity, NationalState);
    expect(FC_ProductRequest_Func);

    // BuyProductRequested 
    const BuyProductRequested_Func = await DeNeo_Farm.connect(signer1).BuyProductRequested();
    expect(BuyProductRequested_Func);
 
    //Consumer Chooses the HomePickUp to -> get Product at doorstep of the specified location
    //Args 0 ->  insert zero to get the HomePickUp  
    const HomePickUp_Func = await DeNeo_Farm.connect(signer1).HomePickUp(0, {value: ethers.parseEther("1")});
    expect(HomePickUp_Func);
    }); 
    
    it("This is a test for the PickYourSelf, testing to ensure that when the consumer buys their requested product and chooses to PickYourSelf which means the company specifying DeNeo_Farm location to which the consumer will come get it making sure the function transaction works perfectly fine and is mined.", async () => {
    const {DeNeo_Farm, signer1, signer2, owner} = await loadFixture(FIXTUREFUNC); 

      // Consumer Calling to register
      // Args  
      const name  = "Noviga_Dan"; 
      const email = "danstancodan@gmail.com";  
      const RegConsumer = await DeNeo_Farm.connect(signer1).RegisterFarmConsumer(name, email);
      expect(RegConsumer);

      // Calling the FarmProvider 
      //Args
     const farmer_License = "Farmer Proof"; 
     const farmer_Face_Photo = "Farmer Photo"; 
     const Num_Products = 10; 
     const ProductsList = ["beans","cow","yam","goat","snails","turkey","rice","vegetable","5 bottle of milk", "ram"]; 
     const farmer_Experience = 4; 
     const farm_Size = "30 plots of land"; 

     const RegFarmProvider = await DeNeo_Farm.connect(signer2).RegisterFarmProvider(name, farmer_License, farmer_Face_Photo, Num_Products, ProductsList, farmer_Experience, farm_Size, {value: ethers.parseEther("0.5")}); 
     expect(RegFarmProvider);
      
    // Initailize DeNeo_Farm Location Add_State_Location_Address
    //Args
    const abuja_address = "Abuja Address"; 
    const Lagos_address = "Lagos Address"; 
    const enugu_address = "enugu_Address"; 
    const portharcout_address = "portharcout";
    const kano_address = "kano";
    const niger_address = "niger";
    const sokoto_address = "sokoto"; 

  const Add_State_Location_Address_Func = await DeNeo_Farm.connect(owner).Add_State_Location_Address(abuja_address, Lagos_address, enugu_address, portharcout_address, kano_address, niger_address, sokoto_address);
  expect(Add_State_Location_Address_Func);
  

     // Calling the FC_ProductRequest 
     //Args
     //Signer2 Farm Provider Address 
     const Signer2Address = await signer2.getAddress();
     
     const Your_destination = "Your location"; 
     const ReqName = "Dan"; 
     const Contact_Num1 = 0;
     const Contact_Num2 = 0; 
     const OwnerAddress = Signer2Address; 
     const OwnerProductPrice = 2000.00; 
     const OwnerProductQuantity = 20;
     const NationalState = "Enugu";
     
   
    
    const FC_ProductRequest_Func = await DeNeo_Farm.connect(signer1).FC_ProductRequest(Your_destination, ReqName, Contact_Num1, Contact_Num2, OwnerAddress, OwnerProductPrice, OwnerProductQuantity, NationalState);
    expect(FC_ProductRequest_Func);

    // BuyProductRequested 
    const BuyProductRequested_Func = await DeNeo_Farm.connect(signer1).BuyProductRequested();
    expect(BuyProductRequested_Func);
    
    // Initailize the PickLocation state 
    const InitializeYourPickUp_State_Func = await DeNeo_Farm.connect(signer1).InitializeYourPickUp_State(0); 
    expect(InitializeYourPickUp_State_Func);


    //Consumer Chooses the PickYourSelf to -> get Product at doorstep of the specified location
    //Args 1 ->  insert one to get the PickYourSelf location  
     const PickYourSelf_Func = await DeNeo_Farm.connect(signer1).PickYourSelf();
    expect(PickYourSelf_Func); 
    });

    
    it("This is a test for the NotifyCompany_Admin_ToView_HomepickOrder, testing to ensure that the function is able to be called by the company address to notify the company when there's a HomePickup. ", async () => {
    const {DeNeo_Farm, signer1, signer2, owner} = await loadFixture(FIXTUREFUNC); 

      // Consumer Calling to register
      // Args  
      const name  = "Noviga_Dan"; 
      const email = "danstancodan@gmail.com";  
      const RegConsumer = await DeNeo_Farm.connect(signer1).RegisterFarmConsumer(name, email);
      expect(RegConsumer);

      // Calling the FarmProvider 
      //Args
     const farmer_License = "Farmer Proof"; 
     const farmer_Face_Photo = "Farmer Photo"; 
     const Num_Products = 10; 
     const ProductsList = ["beans","cow","yam","goat","snails","turkey","rice","vegetable","5 bottle of milk", "ram"]; 
     const farmer_Experience = 4; 
     const farm_Size = "30 plots of land"; 

     const RegFarmProvider = await DeNeo_Farm.connect(signer2).RegisterFarmProvider(name, farmer_License, farmer_Face_Photo, Num_Products, ProductsList, farmer_Experience, farm_Size, {value: ethers.parseEther("0.5")}); 
     expect(RegFarmProvider);

     // Calling the FC_ProductRequest 
     //Args
     //Signer2 Farm Provider Address 
     const Signer2Address = await signer2.getAddress();
     
     const Your_destination = "Your location"; 
     const ReqName = "Dan"; 
     const Contact_Num1 = 0;
     const Contact_Num2 = 0; 
     const OwnerAddress = Signer2Address; 
     const OwnerProductPrice = 2000.00; 
     const OwnerProductQuantity = 20;
     const NationalState = "Enugu";
     
   
      // Client to request product 
    const FC_ProductRequest_Func = await DeNeo_Farm.connect(signer1).FC_ProductRequest(Your_destination, ReqName, Contact_Num1, Contact_Num2, OwnerAddress, OwnerProductPrice, OwnerProductQuantity, NationalState);
    expect(FC_ProductRequest_Func);

    // BuyProductRequested 
    const BuyProductRequested_Func = await DeNeo_Farm.connect(signer1).BuyProductRequested();
    expect(BuyProductRequested_Func);
  
  // HomePickUp initailized by the client 
       const HomePickUp_Func = await DeNeo_Farm.connect(signer1).HomePickUp(0, {value: ethers.parseEther("1")});
    expect(HomePickUp_Func);

    
       // Calling the NotifyCompany_Admin_ToView_HomepickOrder 
    const NotifyCompany_Admin_ToView_HomepickOrder_Func = await DeNeo_Farm.connect(owner).NotifyCompany_Admin_ToView_HomepickOrder(); 
    expect(NotifyCompany_Admin_ToView_HomepickOrder_Func);
   });
      
   it("This is a test for the  ViewHomePickOrder, testing if we can the DeNeo_Farm admin can view the homepick order and the transaction is successfully mined.", async () => {
    const {DeNeo_Farm, signer1, signer2, owner} = await loadFixture(FIXTUREFUNC); 

      // Consumer Calling to register
      // Args  
      const name  = "Noviga_Dan"; 
      const email = "danstancodan@gmail.com";  
      const RegConsumer = await DeNeo_Farm.connect(signer1).RegisterFarmConsumer(name, email);
      expect(RegConsumer);

      // Calling the FarmProvider 
      //Args
     const farmer_License = "Farmer Proof"; 
     const farmer_Face_Photo = "Farmer Photo"; 
     const Num_Products = 10; 
     const ProductsList = ["beans","cow","yam","goat","snails","turkey","rice","vegetable","5 bottle of milk", "ram"]; 
     const farmer_Experience = 4; 
     const farm_Size = "30 plots of land"; 

     const RegFarmProvider = await DeNeo_Farm.connect(signer2).RegisterFarmProvider(name, farmer_License, farmer_Face_Photo, Num_Products, ProductsList, farmer_Experience, farm_Size, {value: ethers.parseEther("0.5")}); 
     expect(RegFarmProvider);

     // Calling the FC_ProductRequest 
     //Args
     //Signer2 Farm Provider Address 
     const Signer2Address = await signer2.getAddress();
     
     const Your_destination = "Your location"; 
     const ReqName = "Dan"; 
     const Contact_Num1 = 0;
     const Contact_Num2 = 0; 
     const OwnerAddress = Signer2Address; 
     const OwnerProductPrice = 2000.00; 
     const OwnerProductQuantity = 20;
     const NationalState = "Enugu";
     
   
      // Client to request product 
    const FC_ProductRequest_Func = await DeNeo_Farm.connect(signer1).FC_ProductRequest(Your_destination, ReqName, Contact_Num1, Contact_Num2, OwnerAddress, OwnerProductPrice, OwnerProductQuantity, NationalState);
    expect(FC_ProductRequest_Func);

    // BuyProductRequested 
    const BuyProductRequested_Func = await DeNeo_Farm.connect(signer1).BuyProductRequested();
    expect(BuyProductRequested_Func);
  
  // HomePickUp initailized by the client 
       const HomePickUp_Func = await DeNeo_Farm.connect(signer1).HomePickUp(0, {value: ethers.parseEther("1")});
    expect(HomePickUp_Func);

    
       // Calling the NotifyCompany_Admin_ToView_HomepickOrder 
    const NotifyCompany_Admin_ToView_HomepickOrder_Func = await DeNeo_Farm.connect(owner).NotifyCompany_Admin_ToView_HomepickOrder(); 
    expect(NotifyCompany_Admin_ToView_HomepickOrder_Func);

    // Calling the ViewHomePickOrder by the DeNeo_Farm Admin 
    const ViewHomePickOrder_Func = await DeNeo_Farm.connect(owner).ViewHomePickOrder();
    expect(ViewHomePickOrder_Func);
   });

 it("This is a test for the  Add_State_Location_Address, testing to ensure that DeNeo_Farm Admin is able to call the function to assigning the company address location.", async () => {
    const {DeNeo_Farm, owner} = await loadFixture(FIXTUREFUNC);
    
    //Add_State_Location_Address
    //Args 
    const abuja_address = "Abuja Address"; 
    const lagos_address = "Lagos Address";
    const enugu_address = "enugu Address";
    const portharcout_address  = "portharcout Address"; 
    const kano_address = "kano Address"; 
    const niger_address = "Niger Address"; 
    const sokoto_address = "Sokoto Address"; 

     const Add_State_Location_Address_Func = await DeNeo_Farm.connect(owner).Add_State_Location_Address(abuja_address, lagos_address, enugu_address, portharcout_address, kano_address, niger_address, sokoto_address);
     expect(Add_State_Location_Address_Func);
   });
 }); 
  
 /* --------------------- DENEO LAYERS ----------------------- */
 
     describe("DENEO CONTRIBUTORS LAYERS TEST", () => {

     it("Testing SFPC_SUBMIT_NAME, to ensure the can submit name and their code to the platform for registeration and transaction is mined", async () => {
      const {DeNeo_Farm, signer1} = await loadFixture( FIXTUREFUNC);
       // Call SFPC_SUBMIT_NAME
       //Args
       const _sfpc_name = "Daniel"; 
       const _sfpc_code = 10;

      const SFPC_SUBMIT_NAME_Func = await DeNeo_Farm.connect(signer1).SFPC_SUBMIT_NAME(_sfpc_name, _sfpc_code,{ value: ethers.parseEther("1")});
      expect(SFPC_SUBMIT_NAME_Func);
     });

     it("Testing FPC_SUBMIT_NAME, to ensure the can submit name and their code to the platform for registeration and transaction is mined", async () => {
       const {DeNeo_Farm, signer1} = await loadFixture(FIXTUREFUNC);
       // Call FPC_SUBMIT_NAME
       // Args 
       const _fpc_name = "Daniel"; 
       const _fpc_code = 15;

       const FPC_SUBMIT_NAME = await DeNeo_Farm.connect(signer1).FPC_SUBMIT_NAME(_fpc_name, _fpc_code, {value: ethers.parseEther("1")});
       expect(FPC_SUBMIT_NAME); 
     });

      it("Testing PFPC_SUBMIT_NAME, to ensure the can submit name and their code to the platform for registeration and transaction is mined", async () => {
       const {DeNeo_Farm, signer1} = await loadFixture(FIXTUREFUNC);
       // Call FPC_SUBMIT_NAME
       // Args 
       const _pfpc_name = "Daniel"; 
       const _pfpc_code = 20;

       const PFPC_SUBMIT_NAME = await DeNeo_Farm.connect(signer1).PFPC_SUBMIT_NAME(_pfpc_name, _pfpc_code, {value: ethers.parseEther("1")});
       expect(PFPC_SUBMIT_NAME); 
     });
    
     it("Testing RequestPFPC, to ensure that client can request for membersship doing production and that the transaction is mined.", async () => {
      const {DeNeo_Farm, signer1} = await loadFixture(FIXTUREFUNC);

      // Call RequestPFPC
      // Args 
      const pfpc_request_note = "I want to join pfpc"; 
      const RequestPFPC_Func =  await DeNeo_Farm.connect(signer1).RequestPFPC(pfpc_request_note, {value: ethers.parseEther("1")});
      
      expect(RequestPFPC_Func);
     });

     it("Testing deposit__To_DeNeo, to ensure that the client can deposit to the contract ether and transaction is successfullly mined", async () => {
      const {DeNeo_Farm, signer1} = await loadFixture(FIXTUREFUNC); 

      // Calling deposit__To_DeNeo 
      const deposit__To_DeNeo_Func = await DeNeo_Farm.connect(signer1).deposit__To_DeNeo({value: ethers.parseEther("1")}); 
      expect(deposit__To_DeNeo_Func);
     });

    it("Testing Register_SFPC, to ensure that the submit sfpc name are registered by the admin and transaction is mined.", async () => {
      const {DeNeo_Farm, signer1, owner} = await loadFixture(FIXTUREFUNC); 
    
     // Call SFPC_SUBMIT_NAME
       //Args
       const _sfpc_name = "Daniel"; 
       const _sfpc_code = 10;

      const SFPC_SUBMIT_NAME_Func = await DeNeo_Farm.connect(signer1).SFPC_SUBMIT_NAME(_sfpc_name, _sfpc_code,{ value: ethers.parseEther("1")});
      expect(SFPC_SUBMIT_NAME_Func);

    // Call Register_SFPC
    // Args
    const Register_SFPC_Func = await DeNeo_Farm.connect(owner).Register_SFPC(_sfpc_name); 
    expect(Register_SFPC_Func)
    });
   
     it("Testing Register_FPC, to ensure that the submit sfpc name are registered by the admin and transaction is mined.", async () => {
      const {DeNeo_Farm, signer1, owner} = await loadFixture(FIXTUREFUNC); 
    
     // Call SFPC_SUBMIT_NAME
       //Args
       const _fpc_name = "Daniel"; 
       const _fpc_code = 15;

      const FPC_SUBMIT_NAME_Func = await DeNeo_Farm.connect(signer1).FPC_SUBMIT_NAME(_fpc_name, _fpc_code,{ value: ethers.parseEther("1")});
      expect(FPC_SUBMIT_NAME_Func);

    // Call Register_SFPC
    // Args
    const Register_FPC_Func = await DeNeo_Farm.connect(owner).Register_FPC(_fpc_name); 
    expect(Register_FPC_Func)
    });

     it("Testing Register_PFPC, to ensure that the submit sfpc name are registered by the admin and transaction is mined.", async () => {
      const {DeNeo_Farm, signer1, owner} = await loadFixture(FIXTUREFUNC); 
    
     // Call SFPC_SUBMIT_NAME
       //Args
       const _pfpc_name = "Daniel"; 
       const _pfpc_code = 20;

      const PFPC_SUBMIT_NAME_Func = await DeNeo_Farm.connect(signer1).PFPC_SUBMIT_NAME(_pfpc_name, _pfpc_code,{ value: ethers.parseEther("1")});
      expect(PFPC_SUBMIT_NAME_Func);

    // Call Register_PFPC
    // Args
    const Register_PFPC_Func = await DeNeo_Farm.connect(owner).Register_PFPC(_pfpc_name, {value: ethers.parseEther("1")}); 
    expect(Register_PFPC_Func);
    });

      it("Testing PaySFPC, to ensure that the Admin can call the function to pay all the SFPC members", async() => {
      const {DeNeo_Farm, signer1, owner, signer2,  signer3} = await loadFixture(FIXTUREFUNC); 
    
     // Call SFPC_SUBMIT_NAME, FPC_SUBMIT_NAME, PFPC_SUBMIT_NAME
       //Args
       const _pfpc_name = "Daniel"; 
       const _pfpc_code = 20;

       const _sfpc_name = "Daniel"; 
       const _sfpc_code = 10;
      
       const _fpc_name = "Daniel"; 
       const _fpc_code = 15;

      const SFPC_SUBMIT_NAME_Func = await DeNeo_Farm.connect(signer1).SFPC_SUBMIT_NAME(_sfpc_name, _sfpc_code, {value: ethers.parseEther("1")});
       expect(SFPC_SUBMIT_NAME_Func);

       const PFPC_SUBMIT_NAME_Func = await DeNeo_Farm.connect(signer2).PFPC_SUBMIT_NAME(_pfpc_name, _pfpc_code,{ value: ethers.parseEther("1")});
      expect(PFPC_SUBMIT_NAME_Func);
      
      const FPC_SUBMIT_NAME_Func = await DeNeo_Farm.connect(signer3).FPC_SUBMIT_NAME(_fpc_name, _fpc_code, {value: ethers.parseEther("1")});
      expect(FPC_SUBMIT_NAME_Func);

    // Call Register_SFPC
    // Args
    const Register_SFPC_Func = await DeNeo_Farm.connect(owner).Register_SFPC(_sfpc_name); 
    expect(Register_SFPC_Func); 

     // Calling PaySFPC
     const PaySFPC_Func = await DeNeo_Farm.connect(owner).PaySFPC(); 
    expect(PaySFPC_Func);  
    }) 
    
     it("Testing PayFPC, to ensure that the Admin can call the function to pay all the FPC members", async() => {
      const {DeNeo_Farm, signer1, owner, signer2,  signer3} = await loadFixture(FIXTUREFUNC); 
    
     // Call SFPC_SUBMIT_NAME, FPC_SUBMIT_NAME, PFPC_SUBMIT_NAME
       //Args
       const _pfpc_name = "Daniel"; 
       const _pfpc_code = 20;

       const _sfpc_name = "Daniel"; 
       const _sfpc_code = 10;
      
       const _fpc_name = "Daniel"; 
       const _fpc_code = 15;

      const SFPC_SUBMIT_NAME_Func = await DeNeo_Farm.connect(signer1).SFPC_SUBMIT_NAME(_sfpc_name, _sfpc_code, {value: ethers.parseEther("1")});
       expect(SFPC_SUBMIT_NAME_Func);

       const PFPC_SUBMIT_NAME_Func = await DeNeo_Farm.connect(signer2).PFPC_SUBMIT_NAME(_pfpc_name, _pfpc_code,{ value: ethers.parseEther("1")});
      expect(PFPC_SUBMIT_NAME_Func);
      
      const FPC_SUBMIT_NAME_Func = await DeNeo_Farm.connect(signer3).FPC_SUBMIT_NAME(_fpc_name, _fpc_code, {value: ethers.parseEther("1")});
      expect(FPC_SUBMIT_NAME_Func);

    // Call Register_SFPC
    // Args
    const Register_FPC_Func = await DeNeo_Farm.connect(owner).Register_FPC(_fpc_name); 
    expect(Register_FPC_Func); 

     // Calling PaySFPC
     const PayFPC_Func = await DeNeo_Farm.connect(owner).PayFPC(); 
    expect(PayFPC_Func);  
    })
    
    it("Testing PayPFPC, to ensure that the Admin can call the function to pay all the PFPC members", async() => {
      const {DeNeo_Farm, signer1, owner, signer2,  signer3} = await loadFixture(FIXTUREFUNC); 
    
     // Call SFPC_SUBMIT_NAME, FPC_SUBMIT_NAME, PFPC_SUBMIT_NAME
       //Args
       const _pfpc_name = "Daniel"; 
       const _pfpc_code = 20;

       const _sfpc_name = "Daniel"; 
       const _sfpc_code = 10;
      
       const _fpc_name = "Daniel"; 
       const _fpc_code = 15;

      const SFPC_SUBMIT_NAME_Func = await DeNeo_Farm.connect(signer1).SFPC_SUBMIT_NAME(_sfpc_name, _sfpc_code, {value: ethers.parseEther("1")});
       expect(SFPC_SUBMIT_NAME_Func);

       const PFPC_SUBMIT_NAME_Func = await DeNeo_Farm.connect(signer2).PFPC_SUBMIT_NAME(_pfpc_name, _pfpc_code,{ value: ethers.parseEther("1")});
      expect(PFPC_SUBMIT_NAME_Func);
      
      const FPC_SUBMIT_NAME_Func = await DeNeo_Farm.connect(signer3).FPC_SUBMIT_NAME(_fpc_name, _fpc_code, {value: ethers.parseEther("1")});
      expect(FPC_SUBMIT_NAME_Func);

    // Call Register_SFPC
    // Args
    const Register_PFPC_Func = await DeNeo_Farm.connect(owner).Register_PFPC(_pfpc_name, { value: ethers.parseEther("3")}); 
    expect(Register_PFPC_Func); 

     // Calling PaySFPC
     const PayPFPC_Func = await DeNeo_Farm.connect(owner).PayPFPC(); 
    expect(PayPFPC_Func);  
    }) 
  });   

      describe("DENEO ANIMAL WELFARE TEST", () => {
       // -------------------Large Life Stock --------------------- 
 
    it("Testing Request_LLS_Registeration_Inspection, to enure clients are able to request for inspection of their large lifestock and the transaction is mined.", async () => {
      const {DeNeo_Farm, signer1} = await loadFixture(FIXTUREFUNC);

      // Calling Request_LLS_Registeration_Inspection function 
      // ARgs
      const _farm_location = "18 freeWay lagos";
      const Request_LLS_Registeration_Inspection_Func = await DeNeo_Farm.connect(signer1).Request_LLS_Registeration_Inspection(_farm_location); 
      expect(Request_LLS_Registeration_Inspection_Func);
    });

    it("Testing LLS_Registeration_Inspection_Confirmed, to enure that the company admin are able to confirmed the inspection of the client request for them to register their large lifestock", async () => { 
      const {DeNeo_Farm, signer1, owner} = await loadFixture(FIXTUREFUNC);

      // Calling Request_LLS_Registeration_Inspection function 
      // ARgs
      const _farm_location = "18 freeWay lagos";
      const Request_LLS_Registeration_Inspection_Func = await DeNeo_Farm.connect(signer1).Request_LLS_Registeration_Inspection(_farm_location); 
      expect(Request_LLS_Registeration_Inspection_Func); 
      
      // Calling LLS_Registeration_Inspection_Confirmed
      const LLS_Registeration_Inspection_Confirmed_Func = await DeNeo_Farm.connect(owner).LLS_Registeration_Inspection_Confirmed(); 
      expect(LLS_Registeration_Inspection_Confirmed_Func); 
    }); 
    
    it("Testing Register_LLS, ensuring that the client can call this function and it is successfully mined to register their animal", async () => {
        const {DeNeo_Farm, signer1, owner} = await loadFixture(FIXTUREFUNC);

      // Calling Request_LLS_Registeration_Inspection function 
      // ARgs
      const _farm_location = "18 freeWay lagos";
      const Request_LLS_Registeration_Inspection_Func = await DeNeo_Farm.connect(signer1).Request_LLS_Registeration_Inspection(_farm_location); 
      expect(Request_LLS_Registeration_Inspection_Func); 
      
      // Calling LLS_Registeration_Inspection_Confirmed
      const LLS_Registeration_Inspection_Confirmed_Func = await DeNeo_Farm.connect(owner).LLS_Registeration_Inspection_Confirmed(); 
      expect(LLS_Registeration_Inspection_Confirmed_Func); 

      // Register_LLS 
      // Args 
      const client_animal = "Cow"; 
      const client_animal_Health = "Great"; 
      const client_animal_details = "4 feet tail"; 
      const client_animal_insurance_type = "Monthly"; 

      const Register_LLS_Func = await DeNeo_Farm.connect(signer1).Register_LLS(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      
      expect(Register_LLS_Func); 
    }); 

    it("Testing RequestMonthly_LLS_InSurance_Five_Animals, ensuring that when a client has a registered five  animals  with DeNeo_Farm can request for a monthly insurance on them", async () => {
       const {DeNeo_Farm, signer1, owner} = await loadFixture(FIXTUREFUNC);

      // Calling Request_LLS_Registeration_Inspection function 
      // ARgs
      const _farm_location = "18 freeWay lagos";
      const Request_LLS_Registeration_Inspection_Func = await DeNeo_Farm.connect(signer1).Request_LLS_Registeration_Inspection(_farm_location); 
      expect(Request_LLS_Registeration_Inspection_Func); 
      
      // Calling LLS_Registeration_Inspection_Confirmed
      const LLS_Registeration_Inspection_Confirmed_Func = await DeNeo_Farm.connect(owner).LLS_Registeration_Inspection_Confirmed(); 
      expect(LLS_Registeration_Inspection_Confirmed_Func); 

      // Register_LLS 
      // Args 
      const client_animal = "Cow"; 
      const client_animal_Health = "Great"; 
      const client_animal_details = "4 feet tail"; 
      const client_animal_insurance_type = "Monthly"; 

      const Register_LLS_Func1 = await DeNeo_Farm.connect(signer1).Register_LLS(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_LLS_Func1); 

          const Register_LLS_Func2 = await DeNeo_Farm.connect(signer1).Register_LLS(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_LLS_Func2); 

          const Register_LLS_Func3 = await DeNeo_Farm.connect(signer1).Register_LLS(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_LLS_Func3); 

          const Register_LLS_Func4 = await DeNeo_Farm.connect(signer1).Register_LLS(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_LLS_Func4); 

          const Register_LLS_Func5 = await DeNeo_Farm.connect(signer1).Register_LLS(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_LLS_Func5); 
       
      // Calling RequestMonthly_LLS_InSurance_Five_Animals 
      const RequestMonthly_LLS_InSurance_Five_Animals_Func = await DeNeo_Farm.connect(signer1).RequestMonthly_LLS_InSurance_Five_Animals({value:  ethers.parseEther("2")}); 
      expect(RequestMonthly_LLS_InSurance_Five_Animals_Func);
    }); 

    it("Testing RequestMonthly_LLS_InSurance_Ten_Animals, ensuring that when a client has a registered ten  animals  with DeNeo_Farm can request for a monthly insurance on them", async () => {
       const {DeNeo_Farm, signer1, owner} = await loadFixture(FIXTUREFUNC);

      // Calling Request_LLS_Registeration_Inspection function 
      // ARgs
      const _farm_location = "18 freeWay lagos";
      const Request_LLS_Registeration_Inspection_Func = await DeNeo_Farm.connect(signer1).Request_LLS_Registeration_Inspection(_farm_location); 
      expect(Request_LLS_Registeration_Inspection_Func); 
      
      // Calling LLS_Registeration_Inspection_Confirmed
      const LLS_Registeration_Inspection_Confirmed_Func = await DeNeo_Farm.connect(owner).LLS_Registeration_Inspection_Confirmed(); 
      expect(LLS_Registeration_Inspection_Confirmed_Func); 

      // Register_LLS 
      // Args 
      const client_animal = "Cow"; 
      const client_animal_Health = "Great"; 
      const client_animal_details = "4 feet tail"; 
      const client_animal_insurance_type = "Monthly"; 

      const Register_LLS_Func1 = await DeNeo_Farm.connect(signer1).Register_LLS(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_LLS_Func1); 

          const Register_LLS_Func2 = await DeNeo_Farm.connect(signer1).Register_LLS(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_LLS_Func2); 

          const Register_LLS_Func3 = await DeNeo_Farm.connect(signer1).Register_LLS(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_LLS_Func3); 

          const Register_LLS_Func4 = await DeNeo_Farm.connect(signer1).Register_LLS(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_LLS_Func4); 

          const Register_LLS_Func5 = await DeNeo_Farm.connect(signer1).Register_LLS(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_LLS_Func5); 
          
          const Register_LLS_Func6 = await DeNeo_Farm.connect(signer1).Register_LLS(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_LLS_Func6); 

          const Register_LLS_Func7 = await DeNeo_Farm.connect(signer1).Register_LLS(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_LLS_Func7); 

          const Register_LLS_Func8 = await DeNeo_Farm.connect(signer1).Register_LLS(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_LLS_Func8); 

          const Register_LLS_Func9 = await DeNeo_Farm.connect(signer1).Register_LLS(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_LLS_Func9);

      const Register_LLS_Func10 = await DeNeo_Farm.connect(signer1).Register_LLS(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_LLS_Func10);

      // Calling RequestMonthly_LLS_InSurance_Five_Animals 
      const RequestMonthly_LLS_InSurance_Ten_Animals_Func = await DeNeo_Farm.connect(signer1).RequestMonthly_LLS_InSurance_Ten_Animals({value:  ethers.parseEther("2")}); 
      expect(RequestMonthly_LLS_InSurance_Ten_Animals_Func);
    });
    //  ----------------------------------------------------------- 
   //  ------------------Small LifeStock ------------------------ 

     it("Testing Request_SLS_Registeration_Inspection, to enure clients are able to request for inspection of their large lifestock and the transaction is mined.", async () => {
      const {DeNeo_Farm, signer1} = await loadFixture(FIXTUREFUNC);

      // Calling Request_LLS_Registeration_Inspection function 
      // ARgs
      const _farm_location = "18 freeWay lagos";
      const Request_SLS_Registeration_Inspection_Func = await DeNeo_Farm.connect(signer1).Request_SLS_Registeration_Inspection(_farm_location); 
      expect(Request_SLS_Registeration_Inspection_Func);
    });

    it("Testing SLS_Registeration_Inspection_Confirmed, to enure that the company admin are able to confirmed the inspection of the client request for them to register their large lifestock", async () => { 
      const {DeNeo_Farm, signer1, owner} = await loadFixture(FIXTUREFUNC);

      // Calling Request_LLS_Registeration_Inspection function 
      // ARgs
      const _farm_location = "18 freeWay lagos";
      const Request_SLS_Registeration_Inspection_Func = await DeNeo_Farm.connect(signer1).Request_SLS_Registeration_Inspection(_farm_location); 
      expect(Request_SLS_Registeration_Inspection_Func); 
      
      // Calling LLS_Registeration_Inspection_Confirmed
      const SLS_Registeration_Inspection_Confirmed_Func = await DeNeo_Farm.connect(owner).SLS_Registeration_Inspection_Confirmed(); 
      expect(SLS_Registeration_Inspection_Confirmed_Func); 
    }); 
    
    it("Testing Register_SLS, ensuring that the client can call this function and it is successfully mined to register their animal", async () => {
        const {DeNeo_Farm, signer1, owner} = await loadFixture(FIXTUREFUNC);

      // Calling Request_SLS_Registeration_Inspection function 
      // ARgs
      const _farm_location = "18 freeWay lagos";
      const Request_SLS_Registeration_Inspection_Func = await DeNeo_Farm.connect(signer1).Request_SLS_Registeration_Inspection(_farm_location); 
      expect(Request_SLS_Registeration_Inspection_Func); 
      
      // Calling LLS_Registeration_Inspection_Confirmed
      const SLS_Registeration_Inspection_Confirmed_Func = await DeNeo_Farm.connect(owner).SLS_Registeration_Inspection_Confirmed(); 
      expect(SLS_Registeration_Inspection_Confirmed_Func); 

      // Register_LLS 
      // Args 
      const client_animal = "Cow"; 
      const client_animal_Health = "Great"; 
      const client_animal_details = "4 feet tail"; 
      const client_animal_insurance_type = "Monthly"; 

      const Register_SLS_Func = await DeNeo_Farm.connect(signer1).Register_SLS(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      
      expect(Register_SLS_Func); 
    }); 

    it("Testing RequestMonthly_SLS_InSurance_Five_Animals, ensuring that when a client has a registered five  animals  with DeNeo_Farm can request for a monthly insurance on them", async () => {
       const {DeNeo_Farm, signer1, owner} = await loadFixture(FIXTUREFUNC);

      // Calling Request_LLS_Registeration_Inspection function 
      // ARgs
      const _farm_location = "18 freeWay lagos";
      const Request_SLS_Registeration_Inspection_Func = await DeNeo_Farm.connect(signer1).Request_SLS_Registeration_Inspection(_farm_location); 
      expect(Request_SLS_Registeration_Inspection_Func); 
      
      // Calling SLS_Registeration_Inspection_Confirmed
      const SLS_Registeration_Inspection_Confirmed_Func = await DeNeo_Farm.connect(owner).SLS_Registeration_Inspection_Confirmed(); 
      expect(SLS_Registeration_Inspection_Confirmed_Func); 

      // Register_SLS 
      // Args 
      const client_animal = "Cow"; 
      const client_animal_Health = "Great"; 
      const client_animal_details = "4 feet tail"; 
      const client_animal_insurance_type = "Monthly"; 

      const Register_SLS_Func1 = await DeNeo_Farm.connect(signer1).Register_SLS(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_SLS_Func1); 

          const Register_SLS_Func2 = await DeNeo_Farm.connect(signer1).Register_SLS(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_SLS_Func2); 

          const Register_SLS_Func3 = await DeNeo_Farm.connect(signer1).Register_SLS(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_SLS_Func3); 

          const Register_SLS_Func4 = await DeNeo_Farm.connect(signer1).Register_SLS(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_SLS_Func4); 

          const Register_SLS_Func5 = await DeNeo_Farm.connect(signer1).Register_SLS(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_SLS_Func5); 
       
      // Calling RequestMonthly_LLS_InSurance_Five_Animals 
      const RequestMonthly_SLS_InSurance_Five_Animals_Func = await DeNeo_Farm.connect(signer1).RequestMonthly_SLS_InSurance_Five_Animals({value:  ethers.parseEther("2")}); 
      expect(RequestMonthly_SLS_InSurance_Five_Animals_Func);
    }); 

    it("Testing RequestMonthly_SLS_InSurance_Ten_Animals, ensuring that when a client has a registered ten  animals  with DeNeo_Farm can request for a monthly insurance on them", async () => {
       const {DeNeo_Farm, signer1, owner} = await loadFixture(FIXTUREFUNC);

      // Calling Request_SLS_Registeration_Inspection function 
      // ARgs
      const _farm_location = "18 freeWay lagos";
      const Request_SLS_Registeration_Inspection_Func = await DeNeo_Farm.connect(signer1).Request_SLS_Registeration_Inspection(_farm_location); 
      expect(Request_SLS_Registeration_Inspection_Func); 
      
      // Calling SLS_Registeration_Inspection_Confirmed
      const SLS_Registeration_Inspection_Confirmed_Func = await DeNeo_Farm.connect(owner).SLS_Registeration_Inspection_Confirmed(); 
      expect(SLS_Registeration_Inspection_Confirmed_Func); 

      // Register_SLS 
      // Args 
      const client_animal = "Cow"; 
      const client_animal_Health = "Great"; 
      const client_animal_details = "4 feet tail"; 
      const client_animal_insurance_type = "Monthly"; 

      const Register_SLS_Func1 = await DeNeo_Farm.connect(signer1).Register_SLS(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_SLS_Func1); 

          const Register_SLS_Func2 = await DeNeo_Farm.connect(signer1).Register_SLS(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_SLS_Func2); 

          const Register_SLS_Func3 = await DeNeo_Farm.connect(signer1).Register_SLS(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_SLS_Func3); 

          const Register_SLS_Func4 = await DeNeo_Farm.connect(signer1).Register_SLS(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_SLS_Func4); 

          const Register_SLS_Func5 = await DeNeo_Farm.connect(signer1).Register_SLS(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_SLS_Func5); 
          
          const Register_SLS_Func6 = await DeNeo_Farm.connect(signer1).Register_SLS(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_SLS_Func6); 

          const Register_SLS_Func7 = await DeNeo_Farm.connect(signer1).Register_SLS(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_SLS_Func7); 

          const Register_SLS_Func8 = await DeNeo_Farm.connect(signer1).Register_SLS(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_SLS_Func8); 

          const Register_SLS_Func9 = await DeNeo_Farm.connect(signer1).Register_SLS(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_SLS_Func9);

      const Register_SLS_Func10 = await DeNeo_Farm.connect(signer1).Register_SLS(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_SLS_Func10);

      // Calling RequestMonthly_LLS_InSurance_Five_Animals 
      const RequestMonthly_SLS_InSurance_Ten_Animals_Func = await DeNeo_Farm.connect(signer1).RequestMonthly_SLS_InSurance_Ten_Animals({value:  ethers.parseEther("2")}); 
      expect(RequestMonthly_SLS_InSurance_Ten_Animals_Func);
    });
    // -------------------------------------------------------------- 
    // ------------------------- Poulty Bird ---------------------- 
    
     it("Testing Request_PB_Registeration_Inspection, to enure clients are able to request for inspection of their large lifestock and the transaction is mined.", async () => {
      const {DeNeo_Farm, signer1} = await loadFixture(FIXTUREFUNC);

      // Calling Request_PB_Registeration_Inspection function 
      // ARgs
      const _farm_location = "18 freeWay lagos";
      const Request_PB_Registeration_Inspection_Func = await DeNeo_Farm.connect(signer1).Request_PB_Registeration_Inspection(_farm_location); 
      expect(Request_PB_Registeration_Inspection_Func);
    });

    it("Testing PB_Registeration_Inspection_Confirmed, to enure that the company admin are able to confirmed the inspection of the client request for them to register their large lifestock", async () => { 
      const {DeNeo_Farm, signer1, owner} = await loadFixture(FIXTUREFUNC);

      // Calling Request_PB_Registeration_Inspection function 
      // ARgs
      const _farm_location = "18 freeWay lagos";
      const Request_PB_Registeration_Inspection_Func = await DeNeo_Farm.connect(signer1).Request_PB_Registeration_Inspection(_farm_location); 
      expect(Request_PB_Registeration_Inspection_Func); 
      
      // Calling PB_Registeration_Inspection_Confirmed
      const PB_Registeration_Inspection_Confirmed_Func = await DeNeo_Farm.connect(owner).PB_Registeration_Inspection_Confirmed(); 
      expect(PB_Registeration_Inspection_Confirmed_Func); 
    }); 
    
    it("Testing Register_PB, ensuring that the client can call this function and it is successfully mined to register their animal", async () => {
        const {DeNeo_Farm, signer1, owner} = await loadFixture(FIXTUREFUNC);

      // Calling Request_PB_Registeration_Inspection function 
      // ARgs
      const _farm_location = "18 freeWay lagos";
      const Request_PB_Registeration_Inspection_Func = await DeNeo_Farm.connect(signer1).Request_PB_Registeration_Inspection(_farm_location); 
      expect(Request_PB_Registeration_Inspection_Func); 
      
      // Calling PB_Registeration_Inspection_Confirmed
      const PB_Registeration_Inspection_Confirmed_Func = await DeNeo_Farm.connect(owner).PB_Registeration_Inspection_Confirmed(); 
      expect(PB_Registeration_Inspection_Confirmed_Func); 

      // Register_PB 
      // Args 
      const client_animal = "Cow"; 
      const client_animal_Health = "Great"; 
      const client_animal_details = "4 feet tail"; 
      const client_animal_insurance_type = "Monthly"; 

      const Register_PB_Func = await DeNeo_Farm.connect(signer1).Register_PB(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      
      expect(Register_PB_Func); 
    }); 

    it("Testing RequestMonthly_PB_InSurance_Five_Animals, ensuring that when a client has a registered five  animals  with DeNeo_Farm can request for a monthly insurance on them", async () => {
       const {DeNeo_Farm, signer1, owner} = await loadFixture(FIXTUREFUNC);

      // Calling Request_PB_Registeration_Inspection function 
      // ARgs
      const _farm_location = "18 freeWay lagos";
      const Request_PB_Registeration_Inspection_Func = await DeNeo_Farm.connect(signer1).Request_PB_Registeration_Inspection(_farm_location); 
      expect(Request_PB_Registeration_Inspection_Func); 
      
      // Calling PB_Registeration_Inspection_Confirmed
      const PB_Registeration_Inspection_Confirmed_Func = await DeNeo_Farm.connect(owner).PB_Registeration_Inspection_Confirmed(); 
      expect(PB_Registeration_Inspection_Confirmed_Func); 

      // Register_PB 
      // Args 
      const client_animal = "Cow"; 
      const client_animal_Health = "Great"; 
      const client_animal_details = "4 feet tail"; 
      const client_animal_insurance_type = "Monthly"; 

      const Register_PB_Func1 = await DeNeo_Farm.connect(signer1).Register_PB(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_PB_Func1); 

          const Register_PB_Func2 = await DeNeo_Farm.connect(signer1).Register_PB(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_PB_Func2); 

          const Register_PB_Func3 = await DeNeo_Farm.connect(signer1).Register_PB(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_PB_Func3); 

          const Register_PB_Func4 = await DeNeo_Farm.connect(signer1).Register_PB(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_PB_Func4); 

          const Register_PB_Func5 = await DeNeo_Farm.connect(signer1).Register_PB(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_PB_Func5); 
       
      // Calling RequestMonthly_LLS_InSurance_Five_Animals 
      const RequestMonthly_PB_InSurance_Five_Animals_Func = await DeNeo_Farm.connect(signer1).RequestMonthly_PB_InSurance_Five_Animals({value:  ethers.parseEther("2")}); 
      expect(RequestMonthly_PB_InSurance_Five_Animals_Func);
    }); 

    it("Testing RequestMonthly_PB_InSurance_Ten_Animals, ensuring that when a client has a registered ten  animals  with DeNeo_Farm can request for a monthly insurance on them", async () => {
       const {DeNeo_Farm, signer1, owner} = await loadFixture(FIXTUREFUNC);

      // Calling Request_PB_Registeration_Inspection function 
      // ARgs
      const _farm_location = "18 freeWay lagos";
      const Request_PB_Registeration_Inspection_Func = await DeNeo_Farm.connect(signer1).Request_PB_Registeration_Inspection(_farm_location); 
      expect(Request_PB_Registeration_Inspection_Func); 
      
      // Calling PB_Registeration_Inspection_Confirmed
      const PB_Registeration_Inspection_Confirmed_Func = await DeNeo_Farm.connect(owner).PB_Registeration_Inspection_Confirmed(); 
      expect(PB_Registeration_Inspection_Confirmed_Func); 

      // Register_PB 
      // Args 
      const client_animal = "Cow"; 
      const client_animal_Health = "Great"; 
      const client_animal_details = "4 feet tail"; 
      const client_animal_insurance_type = "Monthly"; 

      const Register_PB_Func1 = await DeNeo_Farm.connect(signer1).Register_PB(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_PB_Func1); 

          const Register_PB_Func2 = await DeNeo_Farm.connect(signer1).Register_PB(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_PB_Func2); 

          const Register_PB_Func3 = await DeNeo_Farm.connect(signer1).Register_PB(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_PB_Func3); 

          const Register_PB_Func4 = await DeNeo_Farm.connect(signer1).Register_PB(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_PB_Func4); 

          const Register_PB_Func5 = await DeNeo_Farm.connect(signer1).Register_PB(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_PB_Func5); 
          
          const Register_PB_Func6 = await DeNeo_Farm.connect(signer1).Register_PB(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_PB_Func6); 

          const Register_PB_Func7 = await DeNeo_Farm.connect(signer1).Register_PB(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_PB_Func7); 

          const Register_PB_Func8 = await DeNeo_Farm.connect(signer1).Register_PB(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_PB_Func8); 

          const Register_PB_Func9 = await DeNeo_Farm.connect(signer1).Register_PB(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_PB_Func9);

      const Register_PB_Func10 = await DeNeo_Farm.connect(signer1).Register_PB(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_PB_Func10);

      // Calling RequestMonthly_LLS_InSurance_Five_Animals 
      const RequestMonthly_PB_InSurance_Ten_Animals_Func = await DeNeo_Farm.connect(signer1).RequestMonthly_PB_InSurance_Ten_Animals({value:  ethers.parseEther("2")}); 
      expect(RequestMonthly_PB_InSurance_Ten_Animals_Func);
    });
    // ----------------------------------------------------------- 
    // ------------------------------- Farm Animals --------------- 
       it("Testing Request_FA_Registeration_Inspection, to enure clients are able to request for inspection of their large lifestock and the transaction is mined.", async () => {
      const {DeNeo_Farm, signer1} = await loadFixture(FIXTUREFUNC);

      // Calling Request_FA_Registeration_Inspection function 
      // ARgs
      const _farm_location = "18 freeWay lagos";
      const Request_FA_Registeration_Inspection_Func = await DeNeo_Farm.connect(signer1).Request_FA_Registeration_Inspection(_farm_location); 
      expect(Request_FA_Registeration_Inspection_Func);
    });

    it("Testing FA_Registeration_Inspection_Confirmed, to enure that the company admin are able to confirmed the inspection of the client request for them to register their large lifestock", async () => { 
      const {DeNeo_Farm, signer1, owner} = await loadFixture(FIXTUREFUNC);

      // Calling Request_FA_Registeration_Inspection function 
      // ARgs
      const _farm_location = "18 freeWay lagos";
      const Request_FA_Registeration_Inspection_Func = await DeNeo_Farm.connect(signer1).Request_FA_Registeration_Inspection(_farm_location); 
      expect(Request_FA_Registeration_Inspection_Func); 
      
      // Calling FA_Registeration_Inspection_Confirmed
      const FA_Registeration_Inspection_Confirmed_Func = await DeNeo_Farm.connect(owner).FA_Registeration_Inspection_Confirmed(); 
      expect(FA_Registeration_Inspection_Confirmed_Func); 
    }); 
    
    it("Testing Register_FA, ensuring that the client can call this function and it is successfully mined to register their animal", async () => {
        const {DeNeo_Farm, signer1, owner} = await loadFixture(FIXTUREFUNC);

      // Calling Request_FA_Registeration_Inspection function 
      // ARgs
      const _farm_location = "18 freeWay lagos";
      const Request_FA_Registeration_Inspection_Func = await DeNeo_Farm.connect(signer1).Request_FA_Registeration_Inspection(_farm_location); 
      expect(Request_FA_Registeration_Inspection_Func); 
      
      // Calling FA_Registeration_Inspection_Confirmed
      const FA_Registeration_Inspection_Confirmed_Func = await DeNeo_Farm.connect(owner).FA_Registeration_Inspection_Confirmed(); 
      expect(FA_Registeration_Inspection_Confirmed_Func); 

      // Register_FA 
      // Args 
      const client_animal = "Cow"; 
      const client_animal_Health = "Great"; 
      const client_animal_details = "4 feet tail"; 
      const client_animal_insurance_type = "Monthly"; 

      const Register_FA_Func = await DeNeo_Farm.connect(signer1).Register_FA(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      
      expect(Register_FA_Func); 
    }); 

    it("Testing RequestMonthly_FA_InSurance_Five_Animals, ensuring that when a client has a registered five  animals  with DeNeo_Farm can request for a monthly insurance on them", async () => {
       const {DeNeo_Farm, signer1, owner} = await loadFixture(FIXTUREFUNC);

      // Calling Request_FA_Registeration_Inspection function 
      // ARgs
      const _farm_location = "18 freeWay lagos";
      const Request_FA_Registeration_Inspection_Func = await DeNeo_Farm.connect(signer1).Request_FA_Registeration_Inspection(_farm_location); 
      expect(Request_FA_Registeration_Inspection_Func); 
      
      // Calling FA_Registeration_Inspection_Confirmed
      const FA_Registeration_Inspection_Confirmed_Func = await DeNeo_Farm.connect(owner).FA_Registeration_Inspection_Confirmed(); 
      expect(FA_Registeration_Inspection_Confirmed_Func); 

      // Register_FA 
      // Args 
      const client_animal = "Cow"; 
      const client_animal_Health = "Great"; 
      const client_animal_details = "4 feet tail"; 
      const client_animal_insurance_type = "Monthly"; 

      const Register_FA_Func1 = await DeNeo_Farm.connect(signer1).Register_FA(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_FA_Func1); 

          const Register_FA_Func2 = await DeNeo_Farm.connect(signer1).Register_FA(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_FA_Func2); 

          const Register_FA_Func3 = await DeNeo_Farm.connect(signer1).Register_FA(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_FA_Func3); 

          const Register_FA_Func4 = await DeNeo_Farm.connect(signer1).Register_FA(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_FA_Func4); 

          const Register_FA_Func5 = await DeNeo_Farm.connect(signer1).Register_FA(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_FA_Func5); 
       
      // Calling RequestMonthly_LLS_InSurance_Five_Animals 
      const RequestMonthly_FA_InSurance_Five_Animals_Func = await DeNeo_Farm.connect(signer1).RequestMonthly_FA_InSurance_Five_Animals({value:  ethers.parseEther("2")}); 
      expect(RequestMonthly_FA_InSurance_Five_Animals_Func);
    }); 

    it("Testing RequestMonthly_FA_InSurance_Ten_Animals, ensuring that when a client has a registered ten  animals  with DeNeo_Farm can request for a monthly insurance on them", async () => {
       const {DeNeo_Farm, signer1, owner} = await loadFixture(FIXTUREFUNC);

      // Calling Request_FA_Registeration_Inspection function 
      // ARgs
      const _farm_location = "18 freeWay lagos";
      const Request_FA_Registeration_Inspection_Func = await DeNeo_Farm.connect(signer1).Request_FA_Registeration_Inspection(_farm_location); 
      expect(Request_FA_Registeration_Inspection_Func); 
      
      // Calling FA_Registeration_Inspection_Confirmed
      const FA_Registeration_Inspection_Confirmed_Func = await DeNeo_Farm.connect(owner).FA_Registeration_Inspection_Confirmed(); 
      expect(FA_Registeration_Inspection_Confirmed_Func); 

      // Register_FA 
      // Args 
      const client_animal = "Cow"; 
      const client_animal_Health = "Great"; 
      const client_animal_details = "4 feet tail"; 
      const client_animal_insurance_type = "Monthly"; 

      const Register_FA_Func1 = await DeNeo_Farm.connect(signer1).Register_FA(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_FA_Func1); 

          const Register_FA_Func2 = await DeNeo_Farm.connect(signer1).Register_FA(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_FA_Func2); 

          const Register_FA_Func3 = await DeNeo_Farm.connect(signer1).Register_FA(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_FA_Func3); 

          const Register_FA_Func4 = await DeNeo_Farm.connect(signer1).Register_FA(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_FA_Func4); 

          const Register_FA_Func5 = await DeNeo_Farm.connect(signer1).Register_FA(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_FA_Func5); 
          
          const Register_FA_Func6 = await DeNeo_Farm.connect(signer1).Register_FA(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_FA_Func6); 

          const Register_FA_Func7 = await DeNeo_Farm.connect(signer1).Register_FA(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_FA_Func7); 

          const Register_FA_Func8 = await DeNeo_Farm.connect(signer1).Register_FA(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_FA_Func8); 

          const Register_FA_Func9 = await DeNeo_Farm.connect(signer1).Register_FA(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_FA_Func9);

      const Register_FA_Func10 = await DeNeo_Farm.connect(signer1).Register_FA(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_FA_Func10);

      // Calling RequestMonthly_FA_InSurance_Five_Animals 
      const RequestMonthly_FA_InSurance_Ten_Animals_Func = await DeNeo_Farm.connect(signer1).RequestMonthly_FA_InSurance_Ten_Animals({value:  ethers.parseEther("2")}); 
      expect(RequestMonthly_FA_InSurance_Ten_Animals_Func);
    });
    
    it("Testing ReSetMonthly_Insurance, ensuring That the company admin  can reset the monthly state insurance when needed as duration ends", async () => {
          const {DeNeo_Farm, signer1, owner} = await loadFixture(FIXTUREFUNC);

      // Calling Request_FA_Registeration_Inspection function 
      // ARgs
      const _farm_location = "18 freeWay lagos";
      const Request_FA_Registeration_Inspection_Func = await DeNeo_Farm.connect(signer1).Request_FA_Registeration_Inspection(_farm_location); 
      expect(Request_FA_Registeration_Inspection_Func); 
      
      // Calling FA_Registeration_Inspection_Confirmed
      const FA_Registeration_Inspection_Confirmed_Func = await DeNeo_Farm.connect(owner).FA_Registeration_Inspection_Confirmed(); 
      expect(FA_Registeration_Inspection_Confirmed_Func); 

      // Register_FA 
      // Args 
      const client_animal = "Cow"; 
      const client_animal_Health = "Great"; 
      const client_animal_details = "4 feet tail"; 
      const client_animal_insurance_type = "Monthly"; 

      const Register_FA_Func1 = await DeNeo_Farm.connect(signer1).Register_FA(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_FA_Func1); 

          const Register_FA_Func2 = await DeNeo_Farm.connect(signer1).Register_FA(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_FA_Func2); 

          const Register_FA_Func3 = await DeNeo_Farm.connect(signer1).Register_FA(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_FA_Func3); 

          const Register_FA_Func4 = await DeNeo_Farm.connect(signer1).Register_FA(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_FA_Func4); 

          const Register_FA_Func5 = await DeNeo_Farm.connect(signer1).Register_FA(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_FA_Func5); 
          
          const Register_FA_Func6 = await DeNeo_Farm.connect(signer1).Register_FA(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_FA_Func6); 

          const Register_FA_Func7 = await DeNeo_Farm.connect(signer1).Register_FA(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_FA_Func7); 

          const Register_FA_Func8 = await DeNeo_Farm.connect(signer1).Register_FA(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_FA_Func8); 

          const Register_FA_Func9 = await DeNeo_Farm.connect(signer1).Register_FA(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_FA_Func9);

      const Register_FA_Func10 = await DeNeo_Farm.connect(signer1).Register_FA(client_animal, client_animal_Health, client_animal_details, client_animal_insurance_type, {value: ethers.parseEther("1")}); 
      expect(Register_FA_Func10);

      // Calling RequestMonthly_FA_InSurance_Five_Animals 
      const RequestMonthly_FA_InSurance_Ten_Animals_Func = await DeNeo_Farm.connect(signer1).RequestMonthly_FA_InSurance_Ten_Animals({value:  ethers.parseEther("2")}); 
      expect(RequestMonthly_FA_InSurance_Ten_Animals_Func);

      // ReSetMonthly_Insurance
    const ReSetMonthly_Insurance_Func = await DeNeo_Farm.connect(owner).ReSetMonthly_Insurance(); 
      expect(ReSetMonthly_Insurance_Func);
    })
   })  
})

