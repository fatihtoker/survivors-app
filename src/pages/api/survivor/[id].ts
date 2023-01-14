import { NextApiRequest, NextApiResponse } from "next";
import fsPromises from "fs/promises";
import path from "path";
import { ISurvivor, ISurvivorsDictionary } from "@/types";

const dataFilePath = path.join(process.cwd(), "src/pages/api/data.json");

async function getSurvivorById(id: string): Promise<ISurvivor> {
  const jsonData = await fsPromises.readFile(dataFilePath, "utf-8");
  const survivorsDictionary: ISurvivorsDictionary = JSON.parse(jsonData);

  return survivorsDictionary[id];
}

export default async function survivor(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.query.id)
  const survivor = await getSurvivorById(req.query.id as string);

  res.status(200).json(survivor);
}
