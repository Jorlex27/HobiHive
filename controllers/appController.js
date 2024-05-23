const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { User, UserProfile, Post, Community, CommunityMember, ChatMessage, Like, Comment } = require("../models");
const { getCommonityId, getPostMembers, getCommunityUsers } = require('../services/communityService');
const { FormatJam, FormatTanggal } = require('../helpers/formatJam');
class AppController {
    static async Home(req, res) {
        try {
            const userId = req.user.id;
            // const userId = 7
            const data = await User.findOne({
                where: {
                    id: userId
                },
                include: {
                    model: UserProfile
                }
            })

            const { search } = req.query

            console.log(search);

            // urgent request
            const communityIds = await getCommonityId(userId)

            const hobbi = await CommunityMember.getCommunity(userId)
            const allHobbi = await CommunityMember.getAllCommunity(communityIds)
            const posts = await getPostMembers(userId, search)
            const commonityUsers = await getCommunityUsers(userId)

            const { msg, err } = req.query
            res.render('index', { data, posts, hobbi, allHobbi, commonityUsers, msg, err })
        } catch (error) {
            res.send(error)
        }
    }

    static async ChatGroup(req, res) {
        try {
            const { userId, communityId } = req.params;
            const messages = await ChatMessage.findAll({
                where: {
                    CommunityId: communityId
                },
                include: {
                    model: User,
                    include: [{
                        model: UserProfile,
                        attributes: ['nama_lengkap', 'imageURL']
                    }],
                    attributes: ['id']
                },
                attributes: ['id', 'SenderId', 'ReceiverId', 'message', 'createdAt'],
                order: [
                    ['createdAt', 'ASC']
                ]
            });

            // res.status(200).json(messages)
            res.send(messages)
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async Setting(req, res) {
        try {
            const userId = req.user.id;
            // const userId = 7
            const data = await User.findOne({
                where: {
                    id: userId
                },
                include: {
                    model: UserProfile
                },
                attributes: ['id', 'username', 'email', 'createdAt']
            })
            const formatTanggal = FormatTanggal

            const post = await Post.findAll({
                include: [
                    {
                        model: Like,
                        required: false,
                    },
                    {
                        model: Comment,
                        required: false
                    }
                ],
                where: {
                    UserId: userId
                },
            });

            const { err, msg } = req.query


            res.render('pages/profile', { data, formatTanggal, post, err, msg })
        } catch (error) {
            res.send(error)
        }
    }

    static async ResetPw(req, res) {
        try {
            const { id } = req.params;
            const { oldPassword, newPassword, confirmNewPassword } = req.body;
            const user = await User.findOne({
                where: { id }
            });

            if (!oldPassword || !newPassword || !confirmNewPassword) {
                return res.redirect('/profile?err=Mohon lengkapi semua bidang');
            }
            if (newPassword !== confirmNewPassword) {
                return res.redirect('/profile?err=Password tidak cocok');
            }
            if (!user) {
                return res.redirect('/profile?err=User tidak ditemukan');
            }
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return res.redirect('/profile?err=Password lama tidak benar');
            }

            user.password = newPassword;
            await user.save();

            res.redirect('/profile?msg=Password berhasil diperbaharui');
        } catch (error) {
            console.error(error);
            res.send(error);
        }

    }

    static async HendlerPost(req, res) {
        try {
            const UserId = req.user.id;
            const { title, content, CommunityId } = req.body

            await Post.create({ UserId, title, content, CommunityId })
            res.redirect('/?msg=Postingan berhasil dibuat')
        } catch (error) {
            if (error.name = 'SequelizeValidationError') {
                const messages = error.errors.map(e => e.message);
                res.redirect(`/?err=${messages}`)
            } else {
                res.send(error)
            }
        }
    }

    static async AddPostLikes(req, res) {
        try {
            const { postId, userId } = req.params
            await Like.findOrCreate({
                where: {
                    PostId: postId,
                    UserId: userId
                },
                default: {
                    PostId: postId,
                    UserId: userId
                }
            })
            res.status(200)
        } catch (error) {
            res.status(500).json('arapah')
        }
    }

    static async AddPostComment(req, res) {
        try {
            const { postId, userId } = req.params
            const { content } = req.body
            await Comment.create({
                PostId: postId,
                UserId: userId,
                content
            })
            res.redirect('/')
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = AppController