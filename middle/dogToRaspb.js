var express = require('express');
const db = require('../models');

// 대소변 구분짓는 flag 추출
const getPooPeeFlag = async (req, res, next) => {       // async가 필수인가? await를 안써도??
    const flag = req.body.flag;
    req.pooPeeFlag = flag;
    next();
}

const insertPooPeeData = async (req, res, next) => {
    const pooData = req.body;

    if(req.pooPeeFlag != "poo") {       // 대변일 경우
        db.poo.create({
            size: pooData.size,
            R: pooData.r,
            G: pooData.g,
            B: pooData.b,
            uid: pooData.uid
          })
          res.status(200).json({"message":"poo data insert success"});
          next();
    }
    else if(req.pooPeeFlag != "pee") {  // 소변일 경우
        db.pee.create({
            size: pooData.size,
            R: pooData.r,
            G: pooData.g,
            B: pooData.b,
            uid: pooData.uid
          })
          res.status(200).json({"message":"pee data insert success"});
          next();
    }
    else {
        return;
    }
}


module.exports = {
    getPooPeeFlag: getPooPeeFlag,
    insertPooPeeData: insertPooPeeData
}