const { Op } = require('sequelize');
const { User, UserProfile, Post, Community, CommunityMember, ChatMessage, Like, Comment } = require("../models");

async function getCommonityId(userId) {
    const communityMemberships = await CommunityMember.findAll({
        where: {
            UserId: userId
        },
        attributes: ['CommunityId']
    });
    return communityMemberships.map(cm => cm.CommunityId);
}

async function getPostMembers(userId, search) {
    const communityIds = await getCommonityId(userId)

    const option = {
        include: [
            {
                model: User,
                include: [{
                    model: UserProfile,
                    attributes: ['nama_lengkap', 'imageURL']
                }],
                attributes: ['id']
            },
            {
                model: Community,
                where: {
                    id: {
                        [Op.in]: communityIds
                    }
                },
                attributes: ['name']
            },
            {
                model: Like
            },
            {
                model: Comment
            }
        ],
        attributes: ['id', 'title', 'content', 'UserId', 'CommunityId']
    }

    if (search) {
        option.where = {
            [Op.or]: [
                {
                    title: {
                        [Op.like]: `%${search}%`
                    }
                },
                {
                    content: {
                        [Op.like]: `%${search}%`
                    }
                }
            ]
        }
    }
    const posts = await Post.findAll(option);
    return posts;
}

async function getCommunityUsers(userId) {
    const communityIds = await getCommonityId(userId);
    const commonityUsers = await Community.findAll({
        where: {
            id: {
                [Op.in]: communityIds
            }
        },
        include: {
            model: User,
            include: [{
                model: UserProfile,
                attributes: ['nama_lengkap', 'imageURL']
            }],
            where: {
                id: {
                    [Op.not]: userId
                }
            },
            attributes: ['id']
        },
        attributes: ['id']
    });
    return commonityUsers;
}

module.exports = {
    getCommonityId,
    getPostMembers,
    getCommunityUsers
}