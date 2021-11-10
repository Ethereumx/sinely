pragma solidity >=0.4.22 <0.7.0;

/** 
 * @title Sinely
 * @dev Implements signature and file management
 */
 
contract Sinely {
    
    address admin;


    constructor(bytes32 _name) public {
        
        admin = msg.sender;
    }
    struct user{
        string pubKey;
        address userAddress;
    }
    struct organisme{
        string name;
        string pubKey;
        address userAddress;
    }
    
    struct Document {
        string hash; // document hash
        bool isSigned;  // is sined
        address signer; //issuers's address
        uint256 signedAt; //timestamp
        string issuedBy;
        address issuedTo;
    }

    //add mapping address user/issuer/ed
    mapping(string => Document) public Documents;

   function  getDocument(memory string hash) public returns (address ,uint256, string,address ){

        return (a ,b, c,d );
    }
    
    
    
}