const { Op } = require('sequelize');
const { Post, User, UserProfile, Community, CommunityMember } = require('./models');
const { getCommonityId, getPostMembers, getCommunityUsers } = require('./services/communityService')


getCommonityId(7)
    .then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });
// getPostMembers(7)
//     .then((result) => {
//         console.log(result);
//     }).catch((err) => {
//         console.log(err);
//     });

getCommunityUsers(7)
    .then((result) => {
        result.forEach((user) => {
            console.log(user.toJSON());
        })
    }).catch((err) => {
        console.log(err);
    });