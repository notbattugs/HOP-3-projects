import Mongo from "@/utils/MongoDataApiReq";
export default async function deleteOne(req, res) {
  console.log(req.query);
  const { id } = req.query;
  const result = await Mongo("deleteOne", {
    filter: {
      _id: { $oid: id },
    },
  });

  res.status(200).json(result);
}
