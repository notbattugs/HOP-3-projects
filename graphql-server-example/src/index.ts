import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const SampleCountry=[
    {
        "code": "AD",
        "currency": "EUR",
        "name": "Andorra",
        "phone": "376",
        "emoji": "🇦🇩"
      },
      {
        "code": "AE",
        "currency": "AED",
        "name": "United Arab Emirates",
        "phone": "971",
        "emoji": "🇦🇪"
      },
      {
        "code": "AF",
        "currency": "AFN",
        "name": "Afghanistan",
        "phone": "93",
        "emoji": "🇦🇫"
      },
      {
        "code": "AG",
        "currency": "XCD",
        "name": "Antigua and Barbuda",
        "phone": "1268",
        "emoji": "🇦🇬"
      },
      {
        "code": "AI",
        "currency": "XCD",
        "name": "Anguilla",
        "phone": "1264",
        "emoji": "🇦🇮"
      },
]

const typeDefs = `#graphql
type Country {
    code: String
    currency: String
    name: String
    phone: Int
    emoji: String
}


type Query {
    countries: [Country]
    country(code:String):Country
}

type Mutation{
    updateCountry(code:String):Country
    deleteCountry(code:String):Country
}
`;
// The ApolloServer constructor requires two parameters: your schema
const resolvers = {
    Query: {
       countries:()=>{
        return SampleCountry
       },
       country:(_, args)=>{
        return SampleCountry.find((country)=>country.code=== args.code );
        args.code
       }
    },
};
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  
  console.log(`🚀  Server ready at: ${url}`);