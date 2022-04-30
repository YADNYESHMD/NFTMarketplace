//SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


//query --- URI and function for URI what is its use


contract myToken is ERC1155 {
    
 //state variables
    address owner;

    //structure for NFT
        struct MyNFT{
        uint256 Id;
        string Name;
        string Color;
        string Type;
        uint256 Price;
        string  External_Link;
        string  NFT_Description;
        address NFT_Owner;
        bool IsSold;
    }

    

    MyNFT[] public arr_NFT;
   

    //To Map NFT
    mapping(string => bool) NFT_Exists;

    //Constructor
    constructor(string memory uri) ERC1155(""){}

    //function mint()
    function mintNFTS
    (
        string memory _name,
        string memory _color,
        string memory _type,
        string memory _ext_link,
        string memory _nft_desc,
        uint256 _price
    ) public
    {
        require(!NFT_Exists[_name],"NFT already Exists");
        uint256 _id = arr_NFT.length;
        address _nftOwner = msg.sender;
        arr_NFT.push(MyNFT( _id, _name ,_color, _type, _price, _ext_link, _nft_desc , _nftOwner,false));
        _mint(_nftOwner, _id, 1, "");    // query amount and data 
        NFT_Exists[_name]=true;  


        //set aproval for all 
    }

    //function le()  // length of array 
    function getTokenCount()public view returns(uint256 count)
    {
        return arr_NFT.length;
    }
    
    //function buy()
    function BuyToken(uint256 _tokenId) public
    {
        require(_tokenId < arr_NFT.length,"NFT not found ,check Id again");
        require(msg.sender != arr_NFT[_tokenId].NFT_Owner,"Owner can't buy his own NFT");
        
        arr_NFT[_tokenId].IsSold=true;
        _safeTransferFrom(arr_NFT[_tokenId].NFT_Owner,msg.sender,_tokenId,1,"");
        
        //chnage ownership

        //amount transfer to seller
       

    }
    //function sell() 
    function SellToken(address _to,uint256 _tokenId)public{
            //from -- msg.sender
            //to- _to
            //id =tid
            //amount 1
    }


    // use _burn from 1155

    //function burn()
    address burnAddress = 0x000000000000000000000000000000000000dEaD;

    // function burnNFTs

    function burnNFT(uint256 _id) public {
        safeTransferFrom(msg.sender,burnAddress, _id,0,"");   //amount and data query
    }

    
}