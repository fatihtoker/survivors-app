import { NextApiRequest, NextApiResponse } from "next";
import { getSurvivorById } from "../survivors";

export default async function Survivor(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.query.id);
  const survivor = await getSurvivorById(req.query.id);

  res.status(200).json(survivor);
}
