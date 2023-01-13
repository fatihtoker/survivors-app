// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import fsPromises from "fs/promises";
import path from "path";

async function getSurvivors() {
  const filePath = path.join(process.cwd(), "src/pages/api/data.json");
  const jsonData = await fsPromises.readFile(filePath, "utf-8");
  const objectData = JSON.parse(jsonData);

  return objectData;
}

export default async function survivors(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const survivors = await getSurvivors();
  res.status(200).json(survivors);
}
