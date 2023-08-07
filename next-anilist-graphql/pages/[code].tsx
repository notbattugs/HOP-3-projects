import { gql, useQuery } from "@apollo/client";

export default function Home({ country }: any) {
 
  if (!country) {
    console.log("Loading");
  }

  return <p>{country.name}</p>;
}
export async function getServerSideProps({ params }: any) {
  const { code } = params;
  const COUNTRY = gql`
  query Countries($code: ID!) {
    code
    country(code: ${code}) {
      capital
      continent {
        name
      }
    }
  }
`;
  
  const res = await fetch(`https://countries.trevorblades.com/graphql/${code}`);
  const data = await res.json();
  return { props: { country: data } };
}
