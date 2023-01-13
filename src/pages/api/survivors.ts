// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import fsPromises from "fs/promises";
import path from "path";
import { ISurvivor, ISurvivorsDictionary } from "@/types";

async function getSurvivors() {
  const filePath = path.join(process.cwd(), "src/pages/api/data.json");
  const jsonData = await fsPromises.readFile(filePath, "utf-8");
  const listData = JSON.parse(jsonData);

  const survivorsDictionary = listData.reduce(
    (obj: ISurvivorsDictionary, cur: ISurvivor) => ({ ...obj, [cur.id]: cur }),
    {}
  );

  return survivorsDictionary;
}

export default async function survivors(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const survivors = await getSurvivors();
  res.status(200).json(survivors);
}
