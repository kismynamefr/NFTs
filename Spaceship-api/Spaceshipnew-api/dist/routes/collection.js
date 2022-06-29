"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const collection_1 = __importDefault(require("../controllers/collection"));
const router = express_1.default.Router();
router.post('/', collection_1.default.mintNFT);
router.post('/buyBox', collection_1.default.openBox);
router.get('/params/:id', collection_1.default.anyFunction);
router.get('/item/:hasSelled', collection_1.default.getMarketItem);
router.get('/nameNFTs/:name', collection_1.default.getNFTCollection);
router.get('/myNFTs/:owner', collection_1.default.getNFTofOwner);
exports.default = router;
