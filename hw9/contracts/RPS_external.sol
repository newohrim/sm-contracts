pragma solidity ^0.8.0;

import "contracts/interfaces/RPS_Logic.sol";

contract RPS_external 
{
    address targetAddress;

    RPS_Logic targetContract;

    constructor() public 
    {
        targetAddress = 0x6d4F10372755ad1420879926945DA8B15Fd5015e;
        targetContract = RPS_Logic(targetAddress);
    }

    function playGameExternal() public 
    {
        targetContract.playGame(RPS_Logic.Choice.Rock, RPS_Logic.Choice.Paper, 1);
    }
}