// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 < 0.9.0;

contract ChatApp{

    // user struct
    struct user {
        string name;
        friend[] friendList;
    }

    struct friend{
        address publicKey;
        string name;
    }

    struct message{
        address sender;
        uint256 timestamp;
        string message;
    }

    mapping(address => user) userList;
    mapping(bytes32 => message[]) allMessages;

    // check user exist
    function checkUserExists(address publicKey) public view returns(bool){
        return bytes(userList[publicKey].name).length > 0;
    }

    // create  account
    function createAccount(string calldata name) external {
        require(checkUserExists(msg.sender) == false, "User already exists");
        require(bytes(name).length > 0, "Username cannot be empty");

        userList[msg.sender].name = name;
    }

    // get username
    function getUsername(address publicKey) external view returns(string memory){
        require(checkUserExists(publicKey), "User is not registered");
        return userList[publicKey].name;
    }

    // add friends
    function addFriend(address friend_key, string calldata name) external {
        require(checkUserExists(msg.sender), "Create an account first");
        require(checkUserExists(friend_key), "User is not registered");
        require(msg.sender != friend_key, "Users cannot add themselvers as friends ");
        require(checkAlreadyFriends(msg.sender, friend_key) == false, "These users are already friend");

        _addFriend(msg.sender, friend_key, name);
        _addFriend(friend_key, msg.sender, userList[msg.sender].name);
    }

    // check friends
    function checkAlreadyFriends(address publicKey1, address publicKey2) internal view returns(bool) {
        if(userList[publicKey1].friendList.length > userList[publicKey2].friendList.length){
            address temp = publicKey1;
            publicKey1 = publicKey2;
            publicKey2 = temp;

        }

        for(uint256 i = 0; i < userList[publicKey1].friendList.length; i++){
            if(userList[publicKey1].friendList[i].publicKey == publicKey2){
                return true;
            }
        }

        return false;
    }

    // add friend

    function _addFriend(address me, address friend_key, string memory name) internal{
        friend memory newFriend = friend(friend_key, name);
        userList[me].friendList.push(newFriend);
    }

    // get my friend
    function getMyFriendList() external view returns(friend[] memory){
        return userList[msg.sender].friendList;
    }

    // get chat code
    function _getChatCode(address publicKey1, address publicKey2) internal pure returns(bytes32){
        if(publicKey1 < publicKey2){
            return keccak256(abi.encodePacked(publicKey1, publicKey2));
        } else {
            return keccak256(abi.encodePacked(publicKey2, publicKey1));
        }
    }

    // send message
    function sendMessage(address friend_key, string calldata _msg) external{
        require(checkUserExists(msg.sender), "Create an account first");
        require(checkUserExists(friend_key), "User is not registered");
        require(checkAlreadyFriends(msg.sender, friend_key), "Your are not friend with the given user");

        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        message memory newMsg = message(msg.sender, block.timestamp,  _msg);
        allMessages[chatCode].push(newMsg);
    }

    //read messages
    function readMessage(address friend_key) external view returns(message[] memory) {
        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        return allMessages[chatCode];
    }

}