import dogwalkerModel from '../models/dogwalker.model.js';
import *as dogwalkerService from '../services/dogwalker.service.js';
import redisClient from '../services/redis.service.js';
import {validationResult} from 'express-validator';

export const registerDogwalker = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, phone, experience, availability, description, hourlyRate,image } = req.body;

    const isDogwalkerAlreadyExist = await dogwalkerModel.findOne({ email });

    if (isDogwalkerAlreadyExist) {
        return res.status(400).json({ message: 'Dogwalker already exists' });
    }

    const hashedPassword = await dogwalkerModel.hashPassword(password);

    const dogwalker = await dogwalkerService.createDogwalker({
        name,
        email,
        password: hashedPassword,
        phone,
        experience,
        availability,
        description,
        hourlyRate,
        image
    });

    const token = dogwalker.generateJWT();

    res.status(201).json({ token, dogwalker });
};

export const loginDogwalker = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const dogwalker = await dogwalkerModel.findOne({ email }).select('+password');

    if (!dogwalker) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await dogwalker.isValidPassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = dogwalker.generateJWT();

    res.cookie('token', token);

    res.status(200).json({ token, dogwalker });
}

export const getDogwalkerProfile = async (req, res, next) => {
    res.status(200).json({ dogwalker: req.dogwalker });
}

export const logoutDogwalker = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];

    redisClient.set(token, 'logout', 'EX', 60 * 60 * 24);

    res.clearCookie('token');

    res.status(200).json({ message: 'Logout successfully' });
}

// module.exports.getCaptainsInTheRadius = async (req, res) => {
//     const { ltd, lng, radius } = req.query;

//     if (!ltd || !lng || !radius) {
//         return res.status(400).send('Latitude, longitude, and radius are required');
//     }
//     // console.log('ltd', ltd, 'lng', lng, 'radius', radius);
//     //        res.status(200).send('ok');

//     try {
//         const captains = await captainModel.find({
//             location: {
//                 $geoWithin: {
//                     $centerSphere: [[ltd, lng], radius / 6371]
//                 }
//             }
//         });
//         res.json(captains);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// };

