import {Router} from 'express';
import { query} from 'express-validator';
import * as authMiddleware from '../middleware/auth.middleware.js';
import *as mapController from '../controllers/map.controller.js';
 


const router = Router();
router.get('/get-coordinates',
    query('address').isString().isLength({ min: 3 }),
    authMiddleware.authUser,
   mapController.getCoordinates
);

router.get('/get-distance-time',
    query('origin').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapController.getDistanceTime
)

router.get('/get-suggestions',
    query('input').isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapController.getAutoCompleteSuggestions
)

router.get('/get-dogwalkers-in-radius',
    query('ltd').isFloat(),
    query('lng').isFloat(),
    query('radius').isFloat(),
    authMiddleware.authUser,
    mapController.getDogwalkersInRadius
);

router.get('/get-address',
  query('ltd').isFloat().withMessage('Latitude must be a float'),
  query('lng').isFloat().withMessage('Longitude must be a float'),
  authMiddleware.authUser,
  mapController.getAddressFromCoordinates
);

export default router;