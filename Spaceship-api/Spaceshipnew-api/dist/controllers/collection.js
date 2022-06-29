"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const collection_1 = __importDefault(require("../models/collection"));
const mintNFT = (req, res, next) => {
    const formData = req.body;
    const dto = new collection_1.default(formData);
    dto
        .save()
        .then((data) => console.log(data))
        .catch(next);
};
const openBox = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { serial, owner } = req.body;
    yield collection_1.default.updateOne({ serial: serial }, { owner: owner });
    const result = yield collection_1.default.updateOne({ serial: serial }, { hasSelled: true });
    return result
        ? res.status(200).json({ message: "Open Box Success" })
        : res.status(200).json({ message: "Open Box error" });
});
const anyFunction = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield collection_1.default.findOne({
        id: req.params.id,
    });
    return result
        ? res.status(200).json(result)
        : res.status(200).json({ message: "Not found" });
});
const getMarketItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let data = req.params.hasSelled;
    const result = yield collection_1.default.find({
        hasSelled: data,
    });
    console.log(result);
    return result
        ? res.status(200).json(result)
        : res.status(200).json({ message: "Not found" });
});
const getNFTCollection = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield collection_1.default.find({
        name: req.params.name,
    });
    return result
        ? res.status(200).json(result)
        : res.status(200).json({ message: "Not found" });
});
const getNFTofOwner = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield collection_1.default.find({
        owner: req.params.owner,
    });
    return result
        ? res.status(200).json(result)
        : res.status(200).json({ message: "Not found" });
});
const getTest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield collection_1.default.find();
    console.log(result);
});
exports.default = {
    mintNFT,
    openBox,
    anyFunction,
    getMarketItem,
    getNFTCollection,
    getNFTofOwner,
    getTest,
};
