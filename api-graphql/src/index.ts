import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import mongodb from './mongodb.js';
const typeDefs = `#graphql
type Post {
  name:String
  text:String
  images:[String]
  CreatedAt:String
  userId:String
}
input PostInput{
  name:String
  text:String
  images:[String]
}

type Query {
  getPosts: [Post]
  getPostDetail:Post
}

type Mutation{
    createPost(postCreateInput:PostInput!):Post,
    updatePost(id:ID!,postUpdateInput:PostInput!):Post
    deletePost(id:ID!):ID
}
`;

const resolvers = {
  Query: {
    getPosts: () => {
      // todo
    },
    getPostDetail: () => {
      //todo
    },
  },
  Mutation: {
    createPost: (_, args) => {
      console.log(args);
      const Create = mongodb('insertOne', {
        document: {
          text: args.postCreateInput.text,
        },
      });
      return Create;
    },
    deletePost: () => {
      //todo
    },
    updatePost: () => {
      //todo
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
