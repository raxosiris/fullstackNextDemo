import { NextApiRequest, NextApiResponse } from "next";
import { getMongoRepository } from "typeorm";
import { User } from "../../../models/userModel";
import { mongoConnection } from "../../../helpers/mongoSetup";

export default async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    await mongoConnection();
  } catch (e) {}
  try {
    const manager = getMongoRepository(User);
    const users = await manager.find();
    res.status(200).json(users);
  } catch (e) {
    res.status(400).json({ error: e });
  }
};
