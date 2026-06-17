const { CommentController } = require("../http/controllers/comment.controller");

async function transformPost(post, user) {
  if (!post) return post;
  
  post.likesCount = post.likes?.length || 0;
  post.isLiked = false;
  post.isBookmarked = false;

  const acceptedCommnets = await CommentController.findAcceptedComments(
    post._id
  );
  
  // اصلاح برای avatar author
  if (post.author?.avatar) {
    post.author.avatarUrl = `${process.env.SERVER_URL}/${post.author.avatar}`;
  } else if (post.author) {
    post.author.avatarUrl = null;
  }

  if (post.related?.length) {
    post.related = post.related.map((item) => {
      return {
        ...item,
        coverImageUrl: item.coverImage ? `${process.env.SERVER_URL}/${item.coverImage}` : null,
        author: {
          ...item.author,
          avatarUrl: item.author?.avatar ? `${process.env.SERVER_URL}/${item.author.avatar}` : null,
        },
      };
    });
  }
  
  post.comments = acceptedCommnets;
  post.commentsCount =
    acceptedCommnets.length +
    (acceptedCommnets.reduce((a, c) => a + (c.answers?.length || 0), 0) || 0);

  if (!user) {
    post.isLiked = false;
    post.isBookmarked = false;

    delete post.likes;
    delete post.bookmarks;
    return post;
  }
  
  if (post.likes?.includes(user._id.toString())) {
    post.isLiked = true;
  }
  if (post.bookmarks?.includes(user._id.toString())) {
    post.isBookmarked = true;
  }

  delete post.bookmarks;
  delete post.likes;
  return post;
}

module.exports = {
  transformPost,
};