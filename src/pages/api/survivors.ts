// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import fsPromises from "fs/promises";
import path from "path";
import { ISurvivorsDictionary } from "@/types";

const dataFilePath = path.join(process.cwd(), "src/pages/api/data.json");

async function getSurvivors(): Promise<ISurvivorsDictionary> {
  const jsonData = await fsPromises.readFile(dataFilePath, "utf-8");
  const survivorsDictionary: ISurvivorsDictionary = JSON.parse(jsonData);

  return survivorsDictionary;
}

export default async function survivors(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const survivors = await getSurvivors();
  res.status(200).json(survivors);
}
