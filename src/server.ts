import express from 'express';
import { createSchema, createYoga } from "graphql-yoga";

const app = express();
function formatError(error: any,message: any){
const code ={code:'BAD_REQUEST'};
let returnError:any = {};
returnError ={
    message:error?.message,
    path:error?.path,
    extensions:error?.extensions|| code
}
}
const resolvers = {
    Query: {
      findUserById: (parent: any, args: { id: any; }) => {
        // Assuming you have a list of users
        const { id } = args;
        const user = users.find((user) => user.id === id);
        return user;
      },
    },
  };
  
  const users = [
    { id: 1, username: "user1", email: "user1@example.com" },
    { id: 2, username: "user2", email: "user2@example.com" },
    { id: 3, username: "user3", email: "user3@example.com" },
  ];
  
const executableSchema = createSchema({
    typeDefs:`
    type Query {
        findUserById(id: Int!): User
      }
      
      type User {
        id: Int
        username: String
        email: String
      }
      
  `,
  resolvers: {
    Query: {
      findUserById: (parent: any, args: { id: any; }) => {
        // Assuming you have a list of users
        const { id } = args;
        const user = users.find((user) => user.id === id);
        return user;
      },
    },
  }
})
const server = createYoga({
  schema: executableSchema,
  graphiql:true,
  maskedErrors:{
    maskError(error,message): void{
        return formatError(error,message);
    }
  }
});

app.use(server);

app.listen(4000,()=>{
console.log('GQL Server Started at Port 4000')
})
