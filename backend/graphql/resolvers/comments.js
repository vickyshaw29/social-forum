const { UserInputError } = require('apollo-server');
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
        }
    }
}