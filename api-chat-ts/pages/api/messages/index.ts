import Mongo from '@/pages/api/utils/MongoDataApiReq';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      const result = await Mongo('find', {});
      res.status(200).json(result);

      break;
    case 'POST':
      const { text } = req.body;
      const { pfp } = req.body;
      const POST = await Mongo('insertOne', {
        document: {
          Text: text,
          pfp: pfp,
        },
      });

      res.status(200).json(POST);

      break;
  }
}
