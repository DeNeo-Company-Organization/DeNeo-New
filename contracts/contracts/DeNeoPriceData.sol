// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract DeNeoPriceData {
    AggregatorV3Interface _aggregator_address;

    constructor(address _ethereum_dollar) {
        _aggregator_address = AggregatorV3Interface(_ethereum_dollar);
    }

    function PriceFor_ETH_USD() public view virtual returns (uint256) {
        (, int answer, , , ) = _aggregator_address.latestRoundData();
        return (uint256(answer * 1e10));
    }
}
