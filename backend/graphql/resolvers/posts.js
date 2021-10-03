const { AuthenticationError } = require('apollo-server');
const Posts = require('../../models/post');
const checkAuth = require('../../utils/check-auth');
module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Posts.find().sort({ createdAt: -1 });
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Posts.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error('Post not found');
        }
      } catch (error) {
        throw new Error('Error fetching post', { error });
      }
    },
  },
  Mutation: {
    async createPost(_, { body }, context) {
      const user = checkAuth(context);
      const newPost = new Posts({
        body,
        user: user.indexOf,
        username: user.username,
        createdAt: new Date().toISOString(),
      });
      const post = await newPost.save();
      return post;
    },
    async deletePost(_,{postId},context){
      const user=checkAuth(context)
      try {
        const post=await Posts.findById(postId)
        if(user.username===post.username){
          await post.delete()
          return 'Post deleted successfully'
        }else{
          throw new AuthenticationError('Action not allowed')
        }
      } catch (error) {
        throw new Error(error)
      }      
    }
  },
};
