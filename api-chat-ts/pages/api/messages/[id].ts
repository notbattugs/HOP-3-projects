import Mongo from "@/pages/api/utils/MongoDataApiReq";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  switch (req.method) {
    case "DELETE":
      const result = await Mongo("deleteOne", {
        filter: {
          _id: { $oid: id },
        },
      });

      res.status(200).json(result);

      break;
    case "PUT":
      const { text } = req.body;
      const PUT = await Mongo("updateOne", {
        filter: {
          _id: { $oid: id },
        },
        update: {
          $set: {
            Text: text,
          },
        },
      });

      res.status(200).json(PUT);

      break;
  }
}
