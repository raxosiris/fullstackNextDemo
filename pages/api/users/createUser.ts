import { NextApiRequest, NextApiResponse } from "next";
import { getMongoRepository } from "typeorm";
import { plainToClass } from "class-transformer";
import { User } from "../../../models/userModel";
import { mongoConnection } from "../../../helpers/mongoSetup";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await mongoConnection();
  } catch (e) {}

  try {
    const resp = plainToClass(User, req.body);
    const manager = getMongoRepository(User);
    const final = await manager.save(resp);
    res.status(200).json(final);
  } catch (e) {
    res.status(400).json({ error: e });
  }
};
