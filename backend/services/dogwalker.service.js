import dogwalkerModel from '../models/dogwalker.model.js';

export const createDogwalker = async ({
    name, email, password, phone, experience, availability, description, hourlyRate
}) => {
    if (!name || !email || !password || !phone || !experience || !availability || !description || !hourlyRate) {
        throw new Error('All fields are required');
    }

    const dogwalker = await dogwalkerModel.create({
        name,
        email,
        password,
        phone,
        experience,
        availability,
        description,
        hourlyRate
    });

    return dogwalker;
};

// module.exports.getCaptainsInTheRadius = async ({
//     ltd, lng, radius   
// }) => {
//     // const { ltd, lng, radius } = req.query;

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
//        return captains;
//     } catch (error) {
//         console.error(error);
     
//     }
// };