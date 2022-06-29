// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";
import "./IERC20.sol";

contract NFTMarket is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;
    IERC20 token;
    address FBS;
    address payable owner;

    mapping(uint256 => MarketItem) private idToMarketItem;

    struct MarketItem {
      uint256 tokenId;
      address payable seller;
      address payable owner;
      uint256 price;
      bool sold;
      string typeItem;
      string URI;
      string nftName;
    }

    event MarketItemCreated (uint256 indexed tokenId, address seller, address owner, uint256 price, bool sold, string typeItem, string URI, string nftName);

    constructor(string memory name, string memory symbol, address _FBS) ERC721(name, symbol) {
      owner = payable(msg.sender);
      token = IERC20(_FBS);
      FBS = _FBS;
    }

    /* Mints a token and lists it in the marketplace */
    function mintNFTs(string memory nftURI, uint256 price, string memory nftName, string memory typeItem) external payable returns (uint) {
      _tokenIds.increment();
      uint256 newTokenId = _tokenIds.current();
      _mint(msg.sender, newTokenId);
      _setTokenURI(newTokenId, nftURI);
      createMarketItem(newTokenId, price, nftURI, nftName, typeItem);
      return newTokenId;
    }
    //change FBS Address when contract FBS token IERC20 has missed or mistaked
    function transferAddressFBS(address _FBS) onlyOwner external returns(string memory) {
      FBS = _FBS;
      token = IERC20(_FBS);
      return "Transfer Address FBS Success!!!";
    }

    function checkAddressFBS() external view returns(address) {
      return FBS;
    }
    
    //change owner of contract when my boss send require
    function transferOwnerContract(address payable _owner) onlyOwner external returns(string memory){
      owner = _owner;
      return "Transfer Owner of Contract Success!!!";
    }

    function withDrawFBS(uint256 _amount) onlyOwner external payable returns(bool){
      require(token.balanceOf(address(this)) >= _amount, "Not enough money");
      token.transfer(msg.sender, _amount);
      return true;
    }

    function createMarketItem(
      uint256 tokenId,
      uint256 price,
      string memory nftURI,
      string memory tokenName,
      string memory typeItem
    ) private {
      require(price > 0, "Price must be at least 1 wei");
      idToMarketItem[tokenId] =  MarketItem(tokenId, payable(msg.sender), payable(address(this)), price, false, typeItem, nftURI, tokenName);
      _transfer(msg.sender, address(this), tokenId);
      emit MarketItemCreated(tokenId, msg.sender, address(this), price, false, typeItem, nftURI, tokenName);
    }

    /* allows someone to resell a token they have purchased */
    function resellToken(uint256 tokenId, uint256 price) public payable {
      require(idToMarketItem[tokenId].owner == msg.sender, "Only item owner can perform this operation");
      idToMarketItem[tokenId].sold = false;
      idToMarketItem[tokenId].price = price;
      idToMarketItem[tokenId].seller = payable(msg.sender);
      idToMarketItem[tokenId].owner = payable(address(this));
      _itemsSold.decrement();
      _transfer(msg.sender, address(this), tokenId);
      token.transfer(msg.sender, price); //refunds for user when resell NFTs to Marketplace
    }

    /* Allows someone to openBox and transfer a NFT from address contract to address owner*/
    function openBox(uint256 _tokenId, uint256 price) public payable {
      require(token.balanceOf(msg.sender) >= price, "Not enough money in your wallet");
      buyNFTMarket(_tokenId, price);
    }
    function checkMarketItems (uint256 _tokenId) public view returns (MarketItem memory){
      return idToMarketItem[_tokenId];
    }
    /* Creates the sale of a marketplace item */
    /* Transfers ownership of the item, as well as funds between parties */
    function buyNFTMarket(
      uint256 tokenId,
      uint256 price
      ) public payable {
        idToMarketItem[tokenId].owner = payable(msg.sender);
        idToMarketItem[tokenId].sold = true;
        idToMarketItem[tokenId].seller = payable(address(0));
        _itemsSold.increment();
        _transfer(address(this), msg.sender, tokenId);
        token.transferFrom(msg.sender, address(this), price);
    }

    function fetchMarketItems() public view returns (MarketItem[] memory) {
      uint itemCount = _tokenIds.current();
      uint unsoldItemCount = _tokenIds.current() - _itemsSold.current();
      uint currentIndex = 0;

      MarketItem[] memory items = new MarketItem[](unsoldItemCount);
      for (uint i = 0; i < itemCount; i++) {
        if (idToMarketItem[i + 1].owner == address(this)) {
          uint currentId = i + 1;
          MarketItem storage currentItem = idToMarketItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }
    /* Returns only items that a user has purchased */
    function fetchMyNFTs() public view returns (MarketItem[] memory) {
      uint totalItemCount = _tokenIds.current();
      uint itemCount = 0;
      uint currentIndex = 0;

      for (uint i = 0; i < totalItemCount; i++) {
        if (idToMarketItem[i + 1].owner == msg.sender) {
          itemCount += 1;
        }
      }

      MarketItem[] memory items = new MarketItem[](itemCount);
      for (uint i = 0; i < totalItemCount; i++) {
        if (idToMarketItem[i + 1].owner == msg.sender) {
          uint currentId = i + 1;
          MarketItem storage currentItem = idToMarketItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }

    /* Returns only items a user has listed */
    function fetchItemsListed() public view returns (MarketItem[] memory) {
      uint totalItemCount = _tokenIds.current();
      uint itemCount = 0;
      uint currentIndex = 0;

      for (uint i = 0; i < totalItemCount; i++) {
        if (idToMarketItem[i + 1].seller == msg.sender) {
          itemCount += 1;
        }
      }

      MarketItem[] memory items = new MarketItem[](itemCount);
      for (uint i = 0; i < totalItemCount; i++) {
        if (idToMarketItem[i + 1].seller == msg.sender) {
          uint currentId = i + 1;
          MarketItem storage currentItem = idToMarketItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }
    modifier onlyOwner() {
      require(msg.sender == owner, "You aren't Owner of Contract");
      _;
    }
}