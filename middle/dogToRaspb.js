var express = require('express');
const db = require('../models');

const insertPooData = async (req, res, next) => {
    const pooData = req.body;

    try {

        // const result =  await db.dog_poo.findOne({
        //     include: db.user_dog_info,
        //     where: {
        //         user_dog_id: req.currentUser.uid
        //     }
        // })

        // const userToDog = await db.user_dog_info.findOne({
        //     include: db.dog_poo,
        //     where: {
        //         uid: req.currentUser.uid
        //     }
        // })

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

const insertPeeData = async (req, res, next) => {
    const peeData = req.body;
    try {
        await db.dog_pee.create({
            size: peeData.size,
            RGB: peeData.RGB,
            user_dog_id: req.currentUser.uid
        })
        next();
    } catch (e) {
        res.status(400).json({"message":"database insert error(Pee)"});
    }
}

const insertEatData = async (req, res, next) => {
    const eatData = req.body;

    try {
        const intakeInfo = await db.intake.create({
            amountOfMeal: eatData.weight,
            user_dog_id: req.currentUser.uid
        })
        next();
    } catch (e) {
        res.status(400).json({"message":"database insert error(Intake)"});
    }
}

module.exports = {
    insertPooData: insertPooData,
    insertPeeData: insertPeeData,
    insertEatData: insertEatData
}