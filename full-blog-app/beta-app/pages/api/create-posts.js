import Mongo from "@/utils/MongoDataApiReq";
import { text , name} from "express";
export default async function create(req, res) {
  console.log(req.body);
  const { text } = req.body;
  const {name}=req.body;
  const result = await Mongo("insertOne", {
    document: {
      Text: text,
      Name:name
    },
  });

  res.status(200).json(result);
}
