import { useEffect, useState } from "react";
import TheCart from "@/components/TheCart";

export default function Home() {
  const [articles, setArcticles] = useState([]);
  useEffect(() => {
    fetch("https://dev.to/api/articles?username=whitep4nth3r")
      .then((res) => res.json())
      .then((data) => setArcticles(data));
    console.log(articles);
  });
  return (
    <div style={{ width: "100vw", height: "100%", backgroundColor: "#D7CCC8" }}>
      <div className="flex justify-between flex-col ">
        {articles.map((article) => (
          <>
            <a href={`/${article.slug}`}>
              <TheCart
                title={article.title}
                img={article.social_image}
                text={article.description}
                user={article.user.name}
              />
            </a>
            <br />
          </>
        ))}
      </div>
    </div>
  );
}
