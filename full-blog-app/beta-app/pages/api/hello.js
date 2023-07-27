export default async function handler(req, res) {
  const result = await fetch(
    "https://ap-south-1.aws.data.mongodb-api.com/app/data-nvkaj/endpoint/data/v1/action/find",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key":
          "vGYIE26Ejyjyt8oXsW91ncFA0Ik9YHXtzVp95cG7mS5W41JhVfTO8o5ZcSMwXn5P",
      },
      body: JSON.stringify({
        dataSource: "MobAppURI",
        database: "test",
        collection: "tasks",
      }),
    }
  ).then((res) => res.json());
  res.status(200).json(result);
}
