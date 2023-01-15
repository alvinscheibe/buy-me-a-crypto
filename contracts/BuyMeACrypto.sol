/* SPDX-License-Identifier: MIT */
pragma solidity 0.8.17;

contract BuyMeACrypto {
    //Event to emit when a Memo is created
    event NewMemo(
        address indexed from,
        uint256 timestamp,
        string name,
        string message
    );

    //Memo struct
    struct Memo {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }

    Memo[] memos; //List of all memos received
    address payable owner; //Address of contract deployer

    constructor() {
        owner = payable(msg.sender);
    }

    /**
     * Buy a crypto for contract owner
     * @param _name Name of the crypto buyer
     * @param _message A nice message from the crypto buyer
     */
    function buyCrypto(string memory _name, string memory _message) public payable {
        require(msg.value > 0, "You can't buy with 0 ETH");

        //Add the memo to storage
        memos.push(Memo(msg.sender, block.timestamp, _name, _message));

        //Emit a log event when a new memo is created
        emit NewMemo(msg.sender, block.timestamp, _name, _message);
    }

    /**
     * Send the entire balance stored in this contract to the owner
     */
    function withdrawTips() public {
        require(owner.send(address(this).balance));
    }

    /**
     * Fetches all stored memos
     */
    function getMemos() public view returns(Memo[] memory) {
        return memos;
    }
}
