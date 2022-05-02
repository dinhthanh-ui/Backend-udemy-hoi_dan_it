import userService from '../services/userServices'
/**
 * 
 * @param {Create} for User 
 * @returns 
 */
const createUser = async (req, res) =>
{
	try
	{
		if (!req.body.userName || !req.body.email || !req.body.phone)
		{
			return res.status(200).json({
				errorCode: 1,
				errorMessage: "Missing required parameter !!!",
				errorData: []
			})
		} else if (req.body.password && req.body.password.length < 8)
		{
			return res.status(200).json({
				errorCode: 1,
				errorMessage: "Mật khẩu cần dài ít nhất 8 ký tự",
				errorData: []
			})
		}
		else
		{
			let message = await userService.Create(req.body)
			return res.status(200).json({
				errorCode: message.errorCode,
				errorMessage: message.errorMessage,
				errorData: message.errorData
			});
		}
	} catch (error)
	{
		console.log(error);
		return res.status(500).json({
			errorCode: -1,
			errorMessage: "error from server !!!!",
			errorData: []
		})
	}
};
/**
 * @param {*} Show User 
 * @param {*} Method GET 
 */
const showUser = async (req, res) =>
{
	try
	{
		if (req.query.page && req.query.limit)
		{
			let page = req.query.page;
			let limit = req.query.limit;
			let message = await userService.getUserWithPagination(+page, +limit)
			return res.status(200).json({
				errorCode: message.errorCode,
				errorMessage: message.errorMessage,
				errorData: message.errorData
			});
		}
	} catch (error)
	{
		console.log(error);
		return res.status(500).json({
			errorCode: -1,
			errorMessage: "error from server !!!!",
			errorData: []
		});
	}
};
/**
 * @param {*} Delete An User
 * @param {*} Method Delete
 */
const deleteUser = async (req, res) =>
{
	try
	{
		if (!req.body.id)
		{
			return res.status(200).json({
				errorCode: 1,
				errorMessage: "Thiếu thông số bắt buộc !!!",
				errorData: []
			});
		} else
		{
			let message = await userService.Delete(req.body.id);
			return res.status(200).json({
				errorCode: message.errorCode,
				errorMessage: message.errorMessage,
				errorData: message.errorData
			});
		};
	} catch (error)
	{
		console.log(error);
		return res.status(500).json({
			errorCode: -1,
			errorMessage: "error from server !!!!",
			errorData: []
		})
	}
};
/**
 * @param {*} Update An User
 * @param {*} Method PUT
 */
const updateUser = async (req, res) =>
{
	try
	{
		let data = req.body;
		if (!req.body.id)
		{
			return res.status(200).json({
				errorCode: 1,
				errorMessage: "Missing required parameters !!!",
				errorData: []
			});
		} else
		{
			let message = await userService.Edit(data);
			return res.status(200).json({
				errorCode: message.errorCode,
				errorMessage: message.errorMessage,
				errorData: message.errorData
			})
		}
	} catch (error)
	{
		console.log(error);
		return res.status(500).json({
			errorCode: -1,
			errorMessage: "error from server !!!!",
			errorData: []
		})
	}
}
const getUserAccount = async (req, res) =>
{
	return res.status(200).json({
		errorCode: 0,
		errorMessage: "Successfully !!!",
		errorData: {
			email: req.user.email,
			userName: req.user.userName,
			fullName: req.user.fullName,
			accessToken: req.token,
			groupWithRoles: req.user.groupWithRoles
		}
	})
}
module.exports = {
	deleteUser: deleteUser,
	showUser: showUser,
	updateUser: updateUser,
	createUser: createUser,
	getUserAccount: getUserAccount
}