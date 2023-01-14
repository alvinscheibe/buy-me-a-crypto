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
}
