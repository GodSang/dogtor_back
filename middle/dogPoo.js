const db = require('../models');
const Sequelize = require('sequelize');

const createPooData = async (req, res, next) => {
    const pooData = req.body;

    try {
        await db.dog_poo.create({
            size: pooData.size,
            RGB: pooData.RGB,
            user_dog_id: req.currentUser.uid
        })
        next();
    } catch (e) {
        console.log(e)
        res.status(400).json({"message":"database insert error(Poo)"});
    }
}


const readPooData = async (req, res, next) => {
    const pooData = req.query;
    const Op = Sequelize.Op;
    var startDate = new Date(pooData.date);
    var endDate = new Date(pooData.date);
    endDate.setDate(endDate.getDate()+1);

    try {
        const result =  await db.dog_poo.findAll({
            attributes: [
                "RGB", "createdAt"
            ],
            where: {
                user_dog_id: req.currentUser.uid,
                createdAt: {
                    [Op.gt]: startDate,
                    [Op.lt]: endDate
                },
            },
            order: [
                ["createdAt", "DESC"]
            ],
            limit: 2,
            offset: pooData.page * 2,
        })    
        res.json(result);
        //next();
    } catch (e) {
        console.log(e)
        res.status(400).json({"message":"database insert error(Poo)"});
    }
}

module.exports = {
    createPooData: createPooData,
    readPooData: readPooData,
}