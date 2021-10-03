const postResolvers = require('./posts');
const userResolvers = require('./user');

module.exports = {
  Query: {
    ...postResolvers.Query,
  },
  Mutation:{
      ...userResolvers.Mutation,
      ...postResolvers.Mutation
  }
};
