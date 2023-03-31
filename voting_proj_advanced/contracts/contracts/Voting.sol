pragma solidity >=0.5.16 <0.9.0;
pragma experimental ABIEncoderV2;

contract Voting
{
    struct Elector
    {
        bool isAllowedToVote;
        uint voteBalance;
    }

    struct ElectorInputInfo
    {
        address electorAddress;
        uint voteBalance;
    }

    mapping(address => uint) public m_Votes;
    mapping(address => Elector) private m_Electors;
    
    uint m_NumOfOptions;
    bool public m_IsOpen;

    constructor(uint numOfOptions) public 
    {
        m_NumOfOptions = numOfOptions;
        m_IsOpen = false;
    }

    function getVotes(uint option) external view returns (uint) 
    {
        // option from 0 to (m_NumOfOptions - 1)
        require(option < m_NumOfOptions, "Incorrect option id.");

        return m_Votes[toAddress(option)];
    }

    function getAllVotes() external view returns (uint[] memory) 
    {
        uint[] memory votes = new uint[](m_NumOfOptions);
        for (uint i = 0; i < m_NumOfOptions; i++) 
        {
            votes[i] = m_Votes[toAddress(i)];
        }

        return votes;
    }

    function getElectorBalance(address elector) external view returns (uint) 
    {
        require(m_Electors[elector].isAllowedToVote, "Elector doesn't have a right to vote.");

        return m_Electors[elector].voteBalance;
    }

    function addElector(address elector, uint votesBalance) external
    {
        require(!m_IsOpen, "Voting has already started.");

        m_Electors[elector].isAllowedToVote = true;
        m_Electors[elector].voteBalance = votesBalance;
    }

    function addElectors(ElectorInputInfo[] calldata electors) external
    {
        require(!m_IsOpen, "Voting has already started.");
        require(electors.length > 0, "Electors array was empty.");

        for (uint i = 0; i < electors.length; i++) 
        {
            m_Electors[electors[i].electorAddress].isAllowedToVote = true;
            m_Electors[electors[i].electorAddress].voteBalance = electors[i].voteBalance;
        }
    }

    function setIsOpen(bool value) external 
    {
        require(value == !m_IsOpen, "Election was already open or closed.");

        m_IsOpen = value;
    }

    function vote(address elector, uint option) external
    {
        require(m_IsOpen, "Voting is closed.");
        require(option < m_NumOfOptions, "Incorrect option id.");
        require(m_Electors[elector].isAllowedToVote, "Elector doesn't have a right to vote.");
        require(m_Electors[elector].voteBalance > 0, "Elector had no voting balance.");

        m_Votes[toAddress(option)] += m_Electors[elector].voteBalance;
        m_Electors[elector].voteBalance = 0;
    }

    function toAddress(uint value) private pure returns (address) 
    {
        return address(uint160(value));
    }
}