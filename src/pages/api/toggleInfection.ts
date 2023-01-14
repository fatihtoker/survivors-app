// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import fsPromises from "fs/promises";
import path from "path";
import { ISurvivor, ISurvivorsDictionary } from "@/types";

const dataFilePath = path.join(process.cwd(), "src/pages/api/data.json");

async function doToggleInfection(survivor: ISurvivor): Promise<ISurvivor> {
  const jsonData = await fsPromises.readFile(dataFilePath, "utf-8");
  const survivorsDictionary: ISurvivorsDictionary = JSON.parse(jsonData);

  const updatedSurvivor = {
    ...survivor,
    infected: !survivor.infected,
  };

  const updatedDict = {
    ...survivorsDictionary,
    [survivor.id]: updatedSurvivor,
  };

  await fsPromises.writeFile(
    path.resolve(dataFilePath),
    JSON.stringify(updatedDict)
  );

  return updatedSurvivor;
}

export default async function toggleInfection(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const survivor = await doToggleInfection(req.body as ISurvivor);

    res.status(200).json(survivor);
  } else {
    res.status(400).json("Bad Request");
  }
}
