import db from '../models/index';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

/**
 * @param Has password of the User
 */
const hasUserPassword = (password) => {
    return new Promise(async(resolve, reject) => {
        try {
            let hasPassword = await bcrypt.hashSync(password, salt);
            resolve(hasPassword);
        } catch (error) {
            reject(error);
        }
    })
};
/**
 * @param Check User on the database side
 */
const checkUser = (user_name, user_email) => {
    return new Promise(async(resolve, reject) => {
        try {

            let user = await db.User.findOne({
                where: { userName: user_name, email: user_email }
            });
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (error) {
            reject(error);
        }
    });
};

//==================================================
/**
 * @param {*} Create New User with database connection
 */
const createUser = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            // check email and user name
            let check = await checkUser(data.userName, data.email);
            if (check === true) {
                resolve({
                    errorCode: 1,
                    errorMessage: "Username and email already exist, Please enter another username and email address !!!!"
                });
            } else {
                let hasPasswordByBcrypt = await hasUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hasPasswordByBcrypt,
                    userName: data.userName,
                    address: data.address,
                    phone: data.phone,
                    sex: data.sex,
                    GroupId: data.GroupId,
                });
            };
            resolve({
                errorCode: 0,
                errorMessage: "Successfully !!!"
            })

        } catch (error) {
            reject(error);
        }
    })
};
/**
 * @param {*} Show User in database 
 */
const getAllUser = (user_id) => {
    return new Promise(async(resolve, reject) => {
        try {
            //===================================//
            /**
             * param[*} test relationships
             */

            // let newUser = await db.User.findOne({
            //     where: { id: 1 },
            //     raw: true,
            //     include: { model: db.Group, attributes: ["name", "description"] },
            //     nest: true,
            //     attributes: ["email", "userName", "address", "phone", "sex"]
            // });
            // let newRow = await db.Role.findAll({
            //     include: {
            //         model: db.Group,
            //         where: { id: 2 },
            //         attributes: ["name", "description"]
            //     },
            //     raw: true,
            //     nest: true,
            //     attributes: ["url", "description"]
            // });
            //===========================================//
            let users = "";
            if (user_id === "all") {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ["password", "createdAt", "updatedAt"]
                    },
                    raw: true
                })
            };
            if (user_id && user_id !== "all") {
                users = await db.User.findOne({
                    where: { id: user_id },
                    attributes: {
                        exclude: ["password", "createdAt", "updatedAt"]
                    },
                    raw: true
                })
            }
            resolve(users);

        } catch (error) {
            reject(error);
        }
    })
};
/**
 * @param {*} DELETE USER 
 */
const deleteUser = (userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            });
            if (!user) {
                resolve({
                    errorCode: 1,
                    errorMessage: "Your results were not found !!!!"
                });
            } else {
                await user.destroy()
            }
            resolve({
                errorCode: 0,
                errorMessage: "Successfully !!!"
            })

        } catch (error) {
            reject(error);
        }
    })
};
/**
 * @param {*} Update user in database
 */
const editUser = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (!user) {
                resolve({
                    errorCode: 1,
                    errorMessage: " Your results were not found !!!!"
                });
            } else {
                user.email = data.email
                user.userName = data.userName
                await user.save()
            }
            resolve({
                errorCode: 0,
                errorMessage: "Successfully !!!"
            })
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    createUser: createUser,
    deleteUser: deleteUser,
    getAllUser: getAllUser,
    editUser: editUser
}