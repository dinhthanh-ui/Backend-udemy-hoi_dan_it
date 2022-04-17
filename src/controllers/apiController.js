import userService from '../services/userServices'

/**
 * @param {*} Create New User
 * @param {*} Method Post
 */
const createNewUser = async(req, res) => {
    try {
        let message = await userService.createUser(req.body)
        return res.status(200).json(message);
    } catch (error) {
        console.error(error)
    }
};
/**
 * @param {*} Show User 
 * @param {*} Method GET 
 */
const showUser = async(req, res) => {
    try {
        let id = req.query.id;
        if (!id) {
            return res.status(200).json({
                errorCode: 1,
                errorMessage: "Missing required parameter !!!",
                users: []
            });
        } else {
            let users = await userService.getAllUser(id);
            return res.status(200).json({
                errorCode: 0,
                errorMessage: "Successfully !!!",
                users
            })
        }
    } catch (error) {
        console.log("Error: ", error);
    }
};
/**
 * @param {*} Delete An User
 * @param {*} Method Delete
 */
const deleteAnUser = async(req, res) => {
    if (!req.params.id) {
        return res.status(200).json({
            errorCode: 2,
            errorMessage: "Missing required parameters !!!"
        });
    } else {
        let message = await userService.deleteUser(req.params.id);
        return res.status(200).json(message);
    };
};
/**
 * @param {*} Update An User
 * @param {*} Method PUT
 */
const updateAnUser = async(req, res) => {
    let data = req.body;
    if (!req.body.id) {
        return res.status(200).json({
            errorCode: 2,
            errorMessage: "Missing required parameters !!!"
        });
    } else {
        let message = await userService.editUser(data);
        return res.status(200).json(message)
    }
}
module.exports = {
    createNewUser: createNewUser,
    deleteAnUser: deleteAnUser,
    showUser: showUser,
    updateAnUser: updateAnUser
}