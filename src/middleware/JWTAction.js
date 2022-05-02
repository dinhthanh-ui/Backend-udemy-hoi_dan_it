import jwt from "jsonwebtoken"
require("dotenv").config()

/**
 * @param {check path was user haa use}
 */
const nonSecurePaths = ['/logout', '/login', '/register']
/**
 * 
 * @param {*} payload 
 * @returns { tao token }
 */
const createJWT = (payload) =>
{
	let key = process.env.JWT_SECRET
	let token = null
	try
	{
		token = jwt.sign(payload, key,
			{
				expiresIn: process.env.JWT_EXPIRES_IN
			})
	} catch (error)
	{
		log.error(error)
	}
	return token;
}
/**
 * 
 * @param {*} token 
 * @returns {read token and return kq }
 */
const verifyToken = (token) =>
{
	let key = process.env.JWT_SECRET
	let decoded = null

	try
	{
		decoded = jwt.verify(token, key);
	} catch (error)
	{
		console.log(error)
	}
	return decoded;

}
/**
 * @param {*} req xu ly token request
 * @returns 
 */
const extractToken = (req) =>
{
	if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
	{
		return req.headers.authorization.split(' ')[1];
	}
	return null;
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns { kiem tra  user co ton tai khong}
 */
const checkUserJWT = (req, res, next) =>
{
	if (nonSecurePaths.includes(req.path)) return next();

	let cookies = req.cookies;
	let tokenFromHeader = extractToken(req)

	if ((cookies && cookies.jwt) || tokenFromHeader)
	{
		let token = cookies && cookies.jwt ? cookies.jwt : tokenFromHeader;
		let decoded = verifyToken(token);
		if (decoded)
		{
			req.user = decoded;
			req.token = token;
			next();
		} else
		{
			return res.status(200).json({
				errorCode: -1,
				errorMessage: "không xác thực được người dùng",
				errorData: ""
			})
		}
	} else
	{
		return res.status(200).json({
			errorCode: -1,
			errorMessage: "không xác thực được người dùng",
			errorData: ""
		})
	}
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns { check roles cua user}
 */
const checkUserPermissions = (req, res, next) =>
{
	if (nonSecurePaths.includes(req.path) || req.path === '/account') return next();
	if (req.user)
	{
		let roles = req.user.groupWithRoles.Roles;
		let currentUrl = req.path;

		if (!roles && roles.length === 0)
		{
			return res.status(200).json({
				errorCode: -1,
				errorMessage: "Bạn Không Có Quyền Sử Dụng Chức Năng Này, Vui Lòng Tải Lại Trang Website !!!",
				errorData: ""
			})
		}
		let canAccess = roles.some(item => item.url === currentUrl || currentUrl.includes(item.url));
		if (canAccess === true)
		{
			next();
		} else
		{
			return res.status(200).json({
				errorCode: -1,
				errorMessage: "Bạn Không Có Quyền Sử Dụng Chức Năng Này !!! ",
				errorData: ""
			})
		}
	} else
	{
		return res.status(200).json({
			errorCode: -1,
			errorMessage: "không xác thực được người dùng",
			errorData: ""
		})
	}
}


module.exports = {
	createJWT: createJWT,
	checkUserJWT: checkUserJWT,
	checkUserPermissions: checkUserPermissions
}