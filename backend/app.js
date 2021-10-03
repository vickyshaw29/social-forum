require('dotenv').config();
const { ApolloServer } = require('apollo-server');


const mongoose = require('mongoose');
const typeDefs=require('./graphql/typeDefs')
const resolvers=require('./graphql/resolvers')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context:({req})=>({req})
});
mongoose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true })
  .then(() => {
    return server.listen(8000);
  })
  .then(() => console.log('server running at port 8000'))
  .catch((err) => console.log(err));
