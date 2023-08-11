import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import mongodb from './mongodb';

const typeDefs = `#graphql
  type Post {
    text: String
    image:String
    userId: [String]
    createdAt: String
  }

 
  type Query {
    getPosts: [Post],
    getPostDetail(code: String): Post
  }

 

  input PostInput {
    text: String
    image:[String]
    id:[String]
  }


  type Mutation {
    createPost(PostCreateInput: PostInput!): Post,
    updatePost(id: ID!, PostUpdateInput: PostInput!): Post,
    deletePost(id: ID!): ID
  }

`;

const resolvers = {
  Query: {
    getPosts: async () => {
      const GetPosts = await mongodb('find', {});
      return GetPosts.documents;
    },

    // getPostDetail: (_, args) => {
    //   const GetPost = await db("findOne", {});
    //   return GetPost.document;
    // },
  },

  Mutation: {
    createPost: async (_: any, args: any) => {
      const CreatePost = await mongodb('insertOne', {
        document: {
          text: args.PostCreateInput.text,
          image: args.PostCreateInput.image,
        },
      });

      return CreatePost;
    },
    deletePost: async (_: any, args: any) => {
      const deletePost = await mongodb('deleteOne', {
        filter: {
          _id: { $oid: args.id },
        },
      });
      return deletePost;
    },
    updatePost: async (_: any, args: any) => {
      const deletePost = await mongodb('updateOne', {
        filter: {
          _id: { $oid: args.id },
        },
        update: {
          $set: {
            text: args.PostUpdateInput.text,
          },
        },
      });
      return deletePost;
    },
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export default startServerAndCreateNextHandler(server);
