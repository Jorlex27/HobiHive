const { Op } = require('sequelize');
const { Post, User, UserProfile, Community, CommunityMember, Like } = require('./models');
const { getCommonityId, getPostMembers, getCommunityUsers } = require('./services/communityService')


// getCommonityId(7)
//     .then((result) => {
//         console.log(result);
//     }).catch((err) => {
//         console.log(err);
//     });
// getPostMembers(7)
//     .then((result) => {
//         console.log(result);
//     }).catch((err) => {
//         console.log(err);
//     });

// getCommunityUsers(7)
//     .then((result) => {
//         result.forEach((user) => {
//             console.log(user.toJSON());
//         })
//     }).catch((err) => {
//         console.log(err);
//     });

const cek = async () => {
    try {
        const userId = 13
        const postId = 14
        const content = await Post.findOne({
            where : {
                id: postId,
                UserId: userId
            },
            attributes: ['content']
        })
        return content
    } catch (error) {
        return error
    }
}

cek()
    .then((result) => {
        console.log(result.content);
    }).catch((err) => {
        console.log(err);
    });