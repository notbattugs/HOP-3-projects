import Button from "@mui/joy/Button";
import Head from "next/head";

export default function Home({article}) {
  if (!article) return <div>Loading....</div>;

  return (
    <>
      <Head>
        <meta
          property="og:title"
          content={article.title}
        />
        <meta
          property="og:description"
          content={article.description}
        />
        <meta
          property="og:image"
          content={article.social_image}
        />
      </Head>
      <a href="/">
        <Button color="primary" onClick={function () {}} variant="plain">
          Home
        </Button>
      </a>
      <h1>{article.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: article.body_html }}></div>
    </>
  );
}
export async function getServerSideProps({params}){
  const { slug }= params;
    const res = await  fetch(`https://dev.to/api/articles/whitep4nth3r/${slug}`)
    const data = await res.json();
    return {props:{article:data}}
}