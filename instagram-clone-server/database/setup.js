export const setModelRelationships = (db) => {
    const { user, post, commentOnPost, likeOnPost, follower, replyToComment, notification } = db.models

    user.hasMany(post, { onDelete: 'cascade' });
    user.hasMany(commentOnPost, { foreignKey: 'commentedByUserId' }, { onDelete: 'cascade' });
    user.hasMany(likeOnPost, { foreignKey: 'likedByUserId' }, { onDelete: 'cascade' });
    user.hasMany(replyToComment, { foreignKey: 'replyFromUserId' }, { onDelete: 'cascade' });
    user.hasMany(notification, { foreignKey: 'fromUserId' }, { onDelete: 'cascade' });
    user.hasMany(notification, { foreignKey: 'toUserId' }, { onDelete: 'cascade' });

    post.belongsTo(user);
    post.hasMany(commentOnPost, { foreignKey: 'commentOnPostId' }, { onDelete: 'cascade' });
    post.hasMany(likeOnPost, { foreignKey: 'likeOnPostId' }, { onDelete: 'cascade' });
    post.hasMany(notification, { foreignKey: 'onPostId' }, { onDelete: 'cascade' });

    commentOnPost.belongsTo(post, { foreignKey: 'commentOnPostId' });
    commentOnPost.belongsTo(user, { foreignKey: 'commentedByUserId' });
    commentOnPost.hasMany(replyToComment, { foreignKey: 'replyToCommentId' }, { onDelete: 'cascade' });

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
