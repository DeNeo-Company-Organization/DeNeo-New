// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "@chainlink/contracts/src/v0.8/shared/mocks/MockV3Aggregator.sol";

contract DeNeoDataMock {
     MockV3Aggregator public priceFeed;
     constructor(uint8 _decimals, int256 _initial_Answer) {
          priceFeed = new MockV3Aggregator(_decimals, _initial_Answer);
     } 

     function getLatestPrice() public view returns(int256) {
          (, int256 answer,,,)  = priceFeed.latestRoundData(); 
          return answer;
     }

     function updatePrice(int256 _newprice)  public {
          priceFeed.updateAnswer(_newprice); 
     }
}