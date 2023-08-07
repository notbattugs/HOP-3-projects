import Image from "next/image";
import { Inter } from "next/font/google";
// import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
// const client = new ApolloClient({
//   uri: 'https://graphql.anilist.co',
//   cache: new InMemoryCache(),
// });
import { gql, useQuery } from "@apollo/client";

const COUNTRY = gql`
  query Countries($code: ID!) {
    code
    country(code: $code) {
      capital
      continent {
        name
      }
    }
  }
`;
const COUNTRIES = gql`
  query Countries {
    countries {
      capital
      continent {
        name
      }
      name
      currency
      emoji
      code
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(COUNTRIES);

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error : {error.message}</div>;

  console.log(data);
  return (
    <main>
      
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr 1fr 1fr 1fr' ,gridGap:'20px',overflow:'scroll'}}>
        {data.countries.map((country: any) => (
         <a href={`/${country.code}`}>
           <div style={{ width:'auto',border:'2px solid black' ,display:'flex' ,flexDirection:'column', justifyContent:'center',alignItems:'center' ,padding:'20px',borderRadius:'10px'}}>
            <p style={{ fontSize: 100, color: "#000000" }}>{country.emoji}</p>
            <br />
            <p style={{ fontSize: 20, color: "#000000" }}>{country.name}</p>
            <br />
            <p style={{ fontSize: 20, color: "#000000" }}>{country.code}</p>
          </div>
         </a>
        ))}
      </div>
    </main>
  );
}
