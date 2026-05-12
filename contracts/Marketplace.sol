// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Marketplace is ERC721URIStorage {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;

    uint public listingPrice = 0.01 ether;

    struct MarketItem {
        uint tokenId;
        address payable seller;
        address payable owner;
        uint price;
        bool sold;
    }

    // 🔥 NEW: Certificate Structure
    struct Certificate {
        uint256 tokenId;
        address owner;
        string tokenURI;
    }

    mapping(uint => MarketItem) public idToMarketItem;

    // 🔥 NEW: Store certificates
    Certificate[] public certificates;

    // 🔥 NEW: Ownership history
    mapping(uint => address[]) public ownershipHistory;

    constructor() ERC721("MinimalNFT", "MNFT") {}

    function createToken(string memory tokenURI, uint price)
        public
        payable
        returns (uint)
    {
        require(price > 0, "Price must be greater than 0");
        require(msg.value == listingPrice, "Send listing fee");

        _tokenIds.increment();
        uint newTokenId = _tokenIds.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        idToMarketItem[newTokenId] = MarketItem(
            newTokenId,
            payable(msg.sender),
            payable(address(this)),
            price,
            false
        );

        _transfer(msg.sender, address(this), newTokenId);

        // 🔥 NEW: Store certificate
        certificates.push(
            Certificate(newTokenId, msg.sender, tokenURI)
        );

        // 🔥 NEW: Track ownership history
        ownershipHistory[newTokenId].push(msg.sender);

        return newTokenId;
    }

    function createMarketSale(uint tokenId) public payable {

        uint price = idToMarketItem[tokenId].price;
        address seller = idToMarketItem[tokenId].seller;

        require(msg.value == price, "Submit correct price");

        idToMarketItem[tokenId].owner = payable(msg.sender);
        idToMarketItem[tokenId].sold = true;
        _itemsSold.increment();

        _transfer(address(this), msg.sender, tokenId);
        payable(seller).transfer(msg.value);

        // 🔥 NEW: Update ownership history
        ownershipHistory[tokenId].push(msg.sender);
    }

    function fetchMyNFTs() public view returns (MarketItem[] memory) {

        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;

        for (uint i = 1; i <= totalItemCount; i++) {
            if (idToMarketItem[i].owner == msg.sender) {
                itemCount++;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        uint currentIndex = 0;

        for (uint i = 1; i <= totalItemCount; i++) {
            if (idToMarketItem[i].owner == msg.sender) {
                items[currentIndex] = idToMarketItem[i];
                currentIndex++;
            }
        }

        return items;
    }

    // 🔥 NEW: View all certificates
    function getCertificates() public view returns (Certificate[] memory) {
        return certificates;
    }

    // 🔥 NEW: Verify certificate
    function verifyCertificate(uint tokenId) public view returns (bool) {
        return _exists(tokenId);
    }

    // 🔥 NEW: Get ownership history
    function getOwnershipHistory(uint tokenId) public view returns (address[] memory) {
        return ownershipHistory[tokenId];
    }
}