import Mongo from "@/utils/MongoDataApiReq";
export default async function deleteOne(req, res) {
  console.log(req.query)
  const {id}=req.query;
  const {text}=req.body;
  const {Name}=req.body
    const result = await Mongo("updateOne", {
    filter:{
      _id: { "$oid": id }
  },
    update: {
        $set: {
           Text : text,
          //  Name: Name
        }
    }
    })

  res.status(200).json(result);
  }
  