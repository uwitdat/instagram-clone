export const setModelRelationships = (db) => {
    const { user, post, commentOnPost, likeOnPost, follower, replyToComment } = db.models

    user.hasMany(post);
    user.hasMany(commentOnPost, { foreignKey: 'commentedByUserId' });
    user.hasMany(likeOnPost, { foreignKey: 'likedByUserId' });
    user.hasMany(replyToComment, { foreignKey: 'replyFromUserId' });

    post.belongsTo(user);
    post.hasMany(commentOnPost, { foreignKey: 'commentOnPostId' });
    post.hasMany(likeOnPost, { foreignKey: 'likeOnPostId' });

    commentOnPost.belongsTo(post, { foreignKey: 'commentOnPostId' });
    commentOnPost.belongsTo(user, { foreignKey: 'commentedByUserId' });
    commentOnPost.hasMany(replyToComment, { foreignKey: 'replyToCommentId' });

    likeOnPost.belongsTo(post, { foreignKey: 'likeOnPostId' });
    likeOnPost.belongsTo(user, { foreignKey: 'likedByUserId' });

    follower.belongsTo(user, { foreignKey: 'followingUserId', as: 'FollowingUser' });
    follower.belongsTo(user, { foreignKey: 'followedByUserId', as: 'FollowedByUser' });

    replyToComment.belongsTo(commentOnPost, { foreignKey: 'replyToCommentId' });
    replyToComment.belongsTo(user, { foreignKey: 'replyFromUserId' })

};
