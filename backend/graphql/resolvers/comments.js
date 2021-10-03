const { UserInputError, AuthenticationError } = require('apollo-server');
const Posts=require('../../models/post')
const checkAuth = require('../../utils/check-auth')

module.exports={
    Mutation:{
        async createComment(_,{postId,body},context){
            const {username}=checkAuth(context);
            if(body.trim()===''){
                throw UserInputError('Empty comment',{
                    errors:{
                        body:'Comment cant be empty'
                    }
                })
            }
            const post=await Posts.findById(postId)
            if(post){
                post.comments.unshift({
                    body,
                    username,
                    createdAt:new Date().toISOString()
                })
                await post.save()
                return post
            }else{
                throw new UserInputError('Post not found')
            }
        },
        async deleteComment(_,{postId,commentId},context){
            const {username}=checkAuth(context);
            const post=await Posts.findById(postId)
            if(post){
                const commentIndex=post.comments.findIndex(c=>c.id===commentId)
                if(post.comments[commentIndex].username===username){
                    post.comments.splice(commentIndex,1)
                    await post.save()
                    return post;
                }else{
                    throw new AuthenticationError('Action not allowed')
                }
            }else{
                throw new UserInputError('Post not found')
            }
        }
    }
}