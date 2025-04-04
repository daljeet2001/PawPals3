import userModel from '../models/user.model.js';



export const createUser = async ({
    username, email, password, dog
}) => {

    if (!username || !email || !password || !dog) {
        throw new Error('Username, email, password, and dog are required');
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userModel.create({
        username,
        email,
        password: hashedPassword,
        dog
    });
    console.log(user);
    
    const loguserid = user._id;       


    return user;

}

