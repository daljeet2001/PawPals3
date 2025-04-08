import dogwalkerModel from '../models/dogwalker.model.js';
import *as dogwalkerService from '../services/dogwalker.service.js';
import redisClient from '../services/redis.service.js';
import {validationResult} from 'express-validator';

export const registerDogwalker = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, phone, description, hourlyRate,image } = req.body;

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

export const filterDogwalkers = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { hourlyRatelow, hourlyRatehigh } = req.body;
    const query = {};
    if (hourlyRatelow || hourlyRatehigh) {
    query.hourlyRate = {};
    if (hourlyRatelow) query.hourlyRate.$gte = Number(hourlyRatelow);
    if (hourlyRatehigh) query.hourlyRate.$lte = Number(hourlyRatehigh);
}
    try {
        const dogwalkers = await dogwalkerModel.find(query);
        res.status(200).json(dogwalkers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

