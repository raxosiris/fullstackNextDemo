import { NextApiRequest, NextApiResponse } from "next";
import {  getMongoRepository } from "typeorm";
import { User } from "../../../models/userModel";
import { mongoConnection } from "../../../helpers/mongoSetup";
import {ObjectID} from 'mongodb'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await mongoConnection();
  } catch (e) {}
  try {
    const userRepo = getMongoRepository(User);
    const {id} = req.body
    delete req.body._id
    const final = await userRepo.updateOne({_id: new ObjectID(id)},{$set: req.body}, {upsert:true} )
    res.status(200).json(final);
  } catch (e) {
    res.status(400).json({ error: e});
  }
};
