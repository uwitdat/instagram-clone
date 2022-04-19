export const setModelRelationships = (db) => {
    const { user, post } = db.models

    user.hasMany(post);
    post.belongsTo(user);
}
