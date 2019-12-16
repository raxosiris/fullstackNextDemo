import { NextApiRequest, NextApiResponse } from "next";
import { getMongoRepository } from "typeorm";
import { User } from "../../../models/userModel";
import { mongoConnection } from "../../../helpers/mongoSetup";
import { ObjectID } from "mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await mongoConnection();
  } catch (e) {}
  try {
      console.log(req.body.id)
    const userRepo = getMongoRepository(User);
    const final = await userRepo.deleteOne({ _id: new ObjectID(req.body.id) });
    res.status(200).json(final);
  } catch (e) {
    res.status(400).json({ error: e });
  }
};
