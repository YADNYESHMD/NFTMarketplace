//SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract myToken is ERC1155 {
    //structure for NFT
    struct MyNFT {
        uint256 id;
        string name;
        string color;
        string fontColor;
        string nftType;
        uint256 price;
        string tokenURI;
        string fileName;
        string description;
        string dateTime;
        address to;
        bool bought;
    }

    MyNFT[] public arr_NFT;

    address public platform;
    //To Map NFT
    mapping(string => bool) NFT_Exists;

    //Constructor
    constructor() ERC1155("") {
        platform = msg.sender;
    }

    //function mint()
    function mintNFTS(
        string memory _name,
        string memory _color,
        string memory _fontColor,
        string memory _type,
        string memory _ext_link,
        string memory _nft_desc,
        string memory _dateTime,
        string memory _filename,
        uint256 _price
    ) public {
        require(!NFT_Exists[_name], "NFT already Exists");
        uint256 _id = arr_NFT.length;
        address _nftOwner = msg.sender;
        arr_NFT.push(
            MyNFT(
                _id,
                _name,
                _color,
                _fontColor,
                _type,
                _price,
                _ext_link,
                _filename,
                _nft_desc,
                _dateTime,
                _nftOwner,
                false
            )
        );
        _mint(_nftOwner, _id, 1, ""); // query amount and data
        NFT_Exists[_name] = true;
        setApprovalForAll(platform, true);

        //set aproval for all
    }

    //function le()  // length of array
    function getTokenCount() public view returns (uint256 count) {
        return arr_NFT.length;
    }

    //function buy()
    function BuyToken(uint256 _tokenId) public {
        require(_tokenId < arr_NFT.length, "NFT not found ,check Id again");
        require(
            msg.sender != arr_NFT[_tokenId].to,
            "Owner can't buy his own NFT"
        );

        arr_NFT[_tokenId].bought = true;
        ERC1155._safeTransferFrom(
            arr_NFT[_tokenId].to,
            msg.sender,
            _tokenId,
            1,
            ""
        );

        //chnage ownership
        arr_NFT[_tokenId].to = msg.sender;
        //amount transfer to seller
    }

    //function sell()
    function SellToken(address _to, uint256 _tokenId) public {
        //from -- msg.sender
        //to- _to
        //id =tid
        //amount 1
        ERC1155._safeTransferFrom(msg.sender, _to, _tokenId, 1, "");
    }
    
    // function burnNFTs

    function burnNFT(uint256 _id) public {
        require(_id<arr_NFT.length,"Array index out of bound");
        _burn(msg.sender, _id, 1);
        //amount and data query
                                
        // token deletion from array
        for(uint256 i = _id;i<arr_NFT.length-1;i++)
        {
                arr_NFT[i] = arr_NFT[i+1];
        }
        arr_NFT.pop();
        for(uint256 i =0 ; i<arr_NFT.length;i++)
        arr_NFT[i].id = i;
    }
}
