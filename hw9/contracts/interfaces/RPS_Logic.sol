pragma solidity ^0.8.0;

contract RPS_Logic 
{
    enum Choice {
        Rock,
        Paper,
        Scissor
    }

    enum GameOutcome {
        Player1,
        Player2,
        Draw
    }

    mapping (address => uint) public playerBalances;

    event received(address, uint);

    function fundContract() external payable 
    {
        emit received(msg.sender, msg.value);
    }

    function deposit() external payable 
    {
        playerBalances[msg.sender] += msg.value;
    }

    function withdraw() external 
    {
        uint playerBalance = playerBalances[msg.sender];
        require(playerBalance > 0);
        
        playerBalances[msg.sender] = 0;
        (bool success, ) = address(msg.sender).call{ value: playerBalance }("");
        require(success, "withdraw failed to send");
    }

    modifier balanceCheck(uint gameStake) 
    {
        require(playerBalances[msg.sender] >= gameStake * (1 ether), "player has a lack of balance");
        _;
    }

    function playGame(Choice playerOneChoice, Choice playerTwoChoice, uint gameStake) 
        balanceCheck(gameStake) external returns(GameOutcome gameOutcome) 
    {
        if (playerOneChoice == playerTwoChoice) 
        {
            // draw
            gameOutcome = GameOutcome.Draw;
        }
        else if ((uint(playerOneChoice) + 1) % 3 == uint(playerTwoChoice)) 
        {
            // player 1 wins
            gameOutcome = GameOutcome.Player1;
            playerBalances[msg.sender] += gameStake * (1 ether);
        }
        else 
        {
            // player 2 wins
            gameOutcome = GameOutcome.Player2;
            playerBalances[msg.sender] -= gameStake * (1 ether);
        }

        return gameOutcome;
    }
}