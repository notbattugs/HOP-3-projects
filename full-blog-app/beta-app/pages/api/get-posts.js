import Mongo from "@/utils/MongoDataApiReq";
export default async function handler(req, res) {
  const id = req.query.id;

  const result = await Mongo("find", {});

  res.status(200).json(result);
}
