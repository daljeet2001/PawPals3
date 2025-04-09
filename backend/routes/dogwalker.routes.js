import *as dogwalkerController from '../controllers/dogwalker.controller.js';
import { Router } from 'express';
import { body} from 'express-validator';
import * as authMiddleware from '../middleware/auth.middleware.js';

const router = Router();
router.post('/register', [
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('phone').isLength({ min: 10 }).withMessage('Phone number must be at least 10 digits long'),
    body('description').isLength({ max: 200 }).withMessage('Description must not be longer than 200 characters'),
    body('hourlyRate').isNumeric().withMessage('Hourly rate must be a number'),
    body('image').isString().withMessage('Image URL must be a string'),
],
    dogwalkerController.registerDogwalker
)

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    dogwalkerController.loginDogwalker
)

router.get('/profile', authMiddleware.authDogwalker, dogwalkerController.getDogwalkerProfile)

router.get('/logout', authMiddleware.authDogwalker, dogwalkerController.logoutDogwalker)

router.post('/filter', [
    body('hourlyRatelow').optional().isNumeric().withMessage('Hourly rate must be a number'),
    body('hourlyRatehigh').optional().isNumeric().withMessage('Hourly rate must be a number'),

], dogwalkerController.filterDogwalkers);

router.post('/availability', authMiddleware.authDogwalker, [
    body('dates').isArray().withMessage('Dates must be an array of strings'),
    body('dogwalkerId').isString().withMessage('Dogwalker ID must be a string'),
], dogwalkerController.setAvailability);

export default router;