const { User, UserProfile, sequelize } = require('./models');

const Box = async () => {
    const transaction = await sequelize.transaction();
    try {
        const [user, created] = await User.findOrCreate({
            where: { GoogleId: '1234' },
            defaults: {
                GoogleId: '1234',
                username: 'ayou',
                email: 'aw@gmail.com',
            },
            transaction
        });

        if (created) {
            await UserProfile.create({
                UserId: user.id,
                nama_lengkap: user.username
            }, { transaction });
        }

        await transaction.commit();
        return user;
    } catch (error) {
        await transaction.rollback();
        return error;
    }
};

Box()
