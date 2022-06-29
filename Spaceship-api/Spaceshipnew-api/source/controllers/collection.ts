import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import collection from "../models/collection";

const mintNFT = (req: Request, res: Response, next: NextFunction) => {
  const formData = req.body;
  const dto = new collection(formData);
  dto
    .save()
    .then((data) => console.log(data))
    .catch(next);
};
const openBox = async (req: Request, res: Response, next: NextFunction) => {
  const { serial, owner } = req.body;
  await collection.updateOne({ serial: serial }, { owner: owner });
  const result = await collection.updateOne({ serial: serial }, { hasSelled: true });
  return result
  ? res.status(200).json({ message: "Open Box Success" })
  : res.status(200).json({ message: "Open Box error" });
};
const anyFunction = async (req: Request, res: Response, next: NextFunction) => {
  const result = await collection.findOne({
    id: req.params.id,
  });
  return result
    ? res.status(200).json(result)
    : res.status(200).json({ message: "Not found" });
};
const getMarketItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let data = req.params.hasSelled;
  const result = await collection.find({
    hasSelled: data,
  });
  console.log(result);
  return result
    ? res.status(200).json(result)
    : res.status(200).json({ message: "Not found" });
};
const getNFTCollection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await collection.find({
    name: req.params.name,
  });
  return result
    ? res.status(200).json(result)
    : res.status(200).json({ message: "Not found" });
};
const getNFTofOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await collection.find({
    owner: req.params.owner,
  });
  return result
    ? res.status(200).json(result)
    : res.status(200).json({ message: "Not found" });
};
const getTest = async (req: Request, res: Response, next: NextFunction) => {
  const result = await collection.find();
  console.log(result);
};

export default {
  mintNFT,
  openBox,
  anyFunction,
  getMarketItem,
  getNFTCollection,
  getNFTofOwner,
  getTest,
};
