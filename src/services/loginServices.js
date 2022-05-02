import db from '../models/index';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
import { Op } from 'sequelize';
import { getGroupWithRoutes } from '../services/JWTServices'
import { createJWT } from '../middleware/JWTAction'
require('dotenv').config()

/**
 * @param Has password of the User
 */
const hasUserPassword = (password) =>
{
	return new Promise(async (resolve, reject) =>
	{
		try
		{
			let hasPassword = await bcrypt.hashSync(password, salt);
			resolve(hasPassword);
		} catch (error)
		{
			reject(error);
		}
	})
};

/**
 * @param Check User on the database side
 */
const checkPassword = (inputPassword, hashPassword) =>
{
	return bcrypt.compareSync(inputPassword, hashPassword);
}
const checkEmail = (user_email) =>
{
	return new Promise(async (resolve, reject) =>
	{
		try
		{

			let user = await db.User.findOne({
				where: { email: user_email }
			});
			if (user)
			{
				resolve(true)
			} else
			{
				resolve(false)
			}
		} catch (error)
		{
			reject(error);
		}
	});
};
const checkUser = (user_name) =>
{
	return new Promise(async (resolve, reject) =>
	{
		try
		{

			let user = await db.User.findOne({
				where: { userName: user_name }
			});
			if (user)
			{
				resolve(true)
			} else
			{
				resolve(false)
			}
		} catch (error)
		{
			reject(error);
		}
	});
};
const checkPhone = (user_phone) =>
{
	return new Promise(async (resolve, reject) =>
	{
		try
		{

			let user = await db.User.findOne({
				where: { phone: user_phone }
			});
			if (user)
			{
				resolve(true)
			} else
			{
				resolve(false)
			}
		} catch (error)
		{
			reject(error);
		}
	});
};

// ================================
/**
 * 
 * @param {Register} for User
 * @returns 
 */

const handleRegister = (data) =>
{
	return new Promise(async (resolve, reject) =>
	{
		try
		{
			// check email and user name
			let check_email = await checkEmail(data.email);
			let check_phone = await checkPhone(data.phone);
			let checkUserName = await checkUser(data.userName)
			if (check_email === true)
			{
				console.log(" check email")
				resolve({
					errorCode: 1,
					errorMessage: "Email hoặc tên người dùng và điện thoại đã tồn tại, Vui lòng nhập một địa chỉ email mới !!!!",
					errorData: "Email"
				});
			} else if (check_phone === true)
			{
				console.log(" check phone")
				resolve({
					errorCode: 1,
					errorMessage: "Email hoặc tên người dùng và điện thoại đã tồn tại, Vui lòng nhập một địa chỉ số điện thoại mới !!!!",
					errorData: "phone"
				});
			} else if (checkUserName === true)
			{
				console.log(" check user name")
				resolve({
					errorCode: 1,
					errorMessage: "Email hoặc tên người dùng và điện thoại đã tồn tại, Vui lòng nhập một địa chỉ tên đăng nhập mới !!!!",
					errorData: "userName"
				});
			}
			else
			{
				let hasPasswordByBcrypt = await hasUserPassword(data.password);
				await db.User.create({
					email: data.email,
					password: hasPasswordByBcrypt,
					userName: data.userName,
					address: data.address,
					phone: data.phone,
					sex: data.sex,
					GroupId: 4,
					fullName: data.fullName
				});
			};
			resolve({
				errorCode: 0,
				errorMessage: "Successfully !!!"
			})

		} catch (error)
		{
			console.log(">>>>> Error ", error);
			reject({
				errorCode: -1,
				errorMessage: "Data Does Not Exist !!!"
			});
		}
	})
};
/**
 * 
 * @param {Login} for User  
 * @returns 
 */
const handleLogin = async (rawData) =>
{
	return new Promise(async (resolve, reject) =>
	{
		try
		{
			let user = await db.User.findOne({
				where: {
					[Op.or]: [
						{ email: rawData.valueLogin },
						{ phone: rawData.valueLogin }
					]
				}
			})
			if (user)
			{
				let check = checkPassword(rawData.password, user.password)
				if (check === true)
				{
					let groupWithRoles = await getGroupWithRoutes(user)
					let payload = {
						email: user.email,
						userName: user.userName,
						fullName: user.fullName,
						groupWithRoles
					}
					let token = createJWT(payload)
					resolve({
						errorCode: 0,
						errorMessage: " Successfully !!!",
						errorData: {
							email: user.email,
							userName: user.userName,
							fullName: user.fullName,
							accessToken: token,
							groupWithRoles
						}
					})
				} else
				{
					console.log(">>>> Password incorrect !!!")
					resolve({
						errorCode: -1,
						errorMessage: "Địa chỉ Email / Số điện thoại và Mật khẩu Không chính xác !!!",
						errorData: ""
					})
				}
			} else
			{
				console.log(">>>> Email and Phone Number incorrect !!!")
				resolve({
					errorCode: - 1,
					errorMessage: "Địa chỉ Email / Số điện thoại và Mật khẩu Không chính xác!!!",
					errorData: ""
				})
			}
		} catch (error)
		{
			console.log(">>>>> Error ", error);
			reject({
				errorCode: -1,
				errorMessage: "Data Does Not Exist !!!",
				errorData: ""
			});
		}
	})
}
module.exports = {
	handleLogin: handleLogin,
	handleRegister: handleRegister,
}