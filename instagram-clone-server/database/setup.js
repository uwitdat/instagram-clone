export const setModelRelationships = (db) => {
    const { user, post, commentOnPost, likeOnPost, follower, replyToComment, notification } = db.models

    user.hasMany(post);
    user.hasMany(commentOnPost, { foreignKey: 'commentedByUserId' });
    user.hasMany(likeOnPost, { foreignKey: 'likedByUserId' });
    user.hasMany(replyToComment, { foreignKey: 'replyFromUserId' });
    user.hasMany(notification, { foreignKey: 'fromUserId' });
    user.hasMany(notification, { foreignKey: 'toUserId' });

    post.belongsTo(user);
    post.hasMany(commentOnPost, { foreignKey: 'commentOnPostId' });
    post.hasMany(likeOnPost, { foreignKey: 'likeOnPostId' });
    post.hasMany(notification, { foreignKey: 'onPostId' });

    commentOnPost.belongsTo(post, { foreignKey: 'commentOnPostId' });
    commentOnPost.belongsTo(user, { foreignKey: 'commentedByUserId' });
    commentOnPost.hasMany(replyToComment, { foreignKey: 'replyToCommentId' });

    likeOnPost.belongsTo(post, { foreignKey: 'likeOnPostId' });
    likeOnPost.belongsTo(user, { foreignKey: 'likedByUserId' });

    follower.belongsTo(user, { foreignKey: 'followingUserId', as: 'FollowingUser' });
    follower.belongsTo(user, { foreignKey: 'followedByUserId', as: 'FollowedByUser' });

    replyToComment.belongsTo(commentOnPost, { foreignKey: 'replyToCommentId' });
    replyToComment.belongsTo(user, { foreignKey: 'replyFromUserId' });

    notification.belongsTo(user, { foreignKey: 'fromUserId' });
    notification.belongsTo(user, { foreignKey: 'toUserId' });
    notification.belongsTo(post, { foreignKey: 'onPostId' });

};
