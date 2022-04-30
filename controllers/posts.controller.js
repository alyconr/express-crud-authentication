const Post = require('../models/post.model');
const createError = require('http-errors');


module.exports.list = (req, res, next) => {

    Post.find()
        .then((posts) => {
          res.status(200).json({
              message: 'Posts  Listed',
                posts: posts
          });
        })
        .catch(next);
};

module.exports.detail= (req, res, next) => {

    Post.findById(req.params.id)
        .then((post) => {
            if (!post) {
                throw createError(404, 'Post not found');
            }
            res.status(200).json({
                message: 'Post Detail',
                post: post
            });
        })
        .catch(next);
};


module.exports.create = (req, res, next) => {

    const post = new Post({
        title: req.body.title,
        text: req.body.text,
        author: req.body.author
    });

    Post.create(post) //create a new post

        .then((post) => {
            res.status(201).json({
                message: 'Post created',
                post: post
            });
        }
        )
        .catch(next);
        
};


module.exports.update = (req, res, next) => {
    Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
        .then((post) => {
            if (!post) {
                throw createError(404, 'Post not found');
            }
            res.status(200).json({
                message: 'Post updated',
                post: post
            });
        })
        .catch(next);
};



module.exports.delete = (req, res, next) => {

    Post.findByIdAndDelete(req.params.id)
        .then((post) => {
            if (!post) {
                throw createError(404, 'Post not found');
            }
            res.status(200).json({
                message: 'Post deleted',
                post: post
            });
        }
        )
        .catch(next);
};

