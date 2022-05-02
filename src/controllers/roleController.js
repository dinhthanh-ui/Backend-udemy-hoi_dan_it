import roleService from '../services/roleService'


const createRole = async (req, res) =>
{
	try
	{
		let message = await roleService.Create(req.body)
		return res.status(200).json({
			errorCode: message.errorCode,
			errorMessage: message.errorMessage,
			errorData: message.errorData
		});
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
/**
 * @param {*} Show User 
 * @param {*} Method GET 
 */
const showRole = async (req, res) =>
{
	try
	{
		if (req.query.page && req.query.limit)
		{
			let page = req.query.page;
			let limit = req.query.limit;
			let message = await roleService.getRoleWithPagination(+page, +limit)
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
const showAllRole = async (req, res) =>
{
	try
	{
		let message = await roleService.getAllRole()
		return res.status(200).json({
			errorCode: message.errorCode,
			errorMessage: message.errorMessage,
			errorData: message.errorData
		});
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
 * @param {*} Delete An Role
 * @param {*} Method Delete
 */
const deleteRole = async (req, res) =>
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
			let message = await roleService.Delete(req.body.id);
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
 * @param {*} Update An Role
 * @param {*} Method PUT
 */
const updateRole = async (req, res) =>
{
	try
	{
		let data = req.body;
		if (!req.body.id)
		{
			return res.status(200).json({
				errorCode: 1,
				errorMessage: "Thiếu các thông số bắt buộc!!!",
				errorData: []
			});
		} else
		{
			let message = await roleService.Edit(data);
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
/**
 * 
 * @param {call role in group} from Group 
 * @param {method} GET 
 */
const getRoleByGroup = async (req, res) =>
{
	try
	{
		let id = req.params.groupId;
		if (!req.params.groupId)
		{
			return res.status(200).json({
				errorCode: 1,
				errorMessage: "Thiếu các thông số bắt buộc !!!",
				errorData: []
			});
		} else
		{
			let message = await roleService.showRoleByGroup(id);
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

const assignToGroup = async (req, res) =>
{
	try
	{
		if (!req.body)
		{
			return res.status(200).json({
				errorCode: 1,
				errorMessage: "Thiếu các thông số bắt buộc !!!",
				errorData: []
			});
		}
		else
		{
			let message = await roleService.assignRoleToGroup(req.body);
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
module.exports = {
	createRole: createRole,
	showRole: showRole,
	deleteRole: deleteRole,
	updateRole: updateRole,
	showAllRole: showAllRole,
	getRoleByGroup: getRoleByGroup,
	assignToGroup: assignToGroup
}