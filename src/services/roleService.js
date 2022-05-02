import db from '../models/index';

const Create = (data) =>
{
	return new Promise(async (resolve, reject) =>
	{
		try
		{
			let currentRoles = await db.Role.findAll({
				attributes: ["url", "description"],
				raw: true
			})
			const results = data.filter(({ url: id1 }) => !currentRoles.some(({ url: id2 }) => id2 === id1))
			if (results.length === 0)
			{
				resolve({
					errorCode: 1,
					errorMessage: `Đã Có Vai Trò Của Người Dùng, Vui Lòng Kiểm Tra Lại !!!!`,
					errorData: []
				});
			} else
			{
				await db.Role.bulkCreate(results)
				resolve({
					errorCode: 0,
					errorMessage: `Đã Tạo ${results.length} Vai Trò Thành Công Cho Người Dùng  !!!!`,
					errorData: []
				});
			}
		} catch (error)
		{
			console.log(">>>>> Error ", error);
			reject({
				errorCode: -1,
				errorMessage: "Data Does Not Exist !!!",
				errorData: []
			});
		}
	})
}
/**
 * 
 * @param {role pagination} for User 
 * @returns 
 */
const getRoleWithPagination = (page, limit) =>
{
	return new Promise(async (resolve, reject) =>
	{
		try
		{
			let offset = (page - 1) * limit
			const { count, rows } = await db.Role.findAndCountAll({
				attributes: ["id", "url", "description"],
				order: [
					["id", "DESC"]
				],
				raw: true,
				nest: true,
				offset: offset,
				limit: limit
			})
			let totalPages = Math.ceil(count / limit)
			let data = {
				totalRows: count,
				totalPages: totalPages,
				role: rows
			}
			resolve({
				errorCode: 0,
				errorMessage: "Successfully !!!",
				errorData: data
			})
		} catch (error)
		{
			console.log(">>>>> Error ", error);
			reject({
				errorCode: -1,
				errorMessage: "Data Does Not Exist !!!",
				errorData: []
			});
		}
	})
}
/**
 * @param {*} DELETE USER 
 */
const Delete = (roleId) =>
{
	return new Promise(async (resolve, reject) =>
	{
		try
		{
			let role = await db.Role.findOne({
				where: { id: roleId }
			});
			if (!role)
			{
				resolve({
					errorCode: 1,
					errorMessage: "Kết quả của bạn không được tìm thấy !!!!",
					errorData: []
				});
			} else
			{
				await role.destroy()
			}
			resolve({
				errorCode: 0,
				errorMessage: "Xoá Người Dùng Thành Công !!!",
				errorData: []
			})
		} catch (error)
		{
			console.log(">>>>> Error ", error);
			reject({
				errorCode: -1,
				errorMessage: "Data Does Not Exist !!!",
				errorData: []
			});
		}
	})
};

/**
 * @param {*} Update user in database
 */
const Edit = (data) =>
{
	return new Promise(async (resolve, reject) =>
	{
		try
		{
			let role = await db.Role.findOne({
				where: { id: data.id }
			})
			if (!role)
			{
				resolve({
					errorCode: 1,
					errorMessage: " Your results were not found !!!!",
					errorData: []
				});
			} else
			{
				role.url = data.url
				role.description = data.description
				await role.save()
			}
			resolve({
				errorCode: 0,
				errorMessage: " Cập Nhật Thành Công !!!",
				errorData: []
			})
		} catch (error)
		{
			console.log(">>>>> Error ", error);
			reject({
				errorCode: -1,
				errorMessage: "Data Does Not Exist !!!",
				errorData: []
			});
		}
	})
}

/**
 * @param {GET all role}
 */
const getAllRole = () =>
{
	return new Promise(async (resolve, reject) =>
	{
		try
		{
			let message = await db.Role.findAll(
				{
					attributes: ["id", "url", "description"],
				}
			)
			resolve({
				errorCode: 0,
				errorMessage: "Successfully !!!",
				errorData: message
			})
		} catch (error)
		{
			console.log(">>>>> Error ", error);
			reject({
				errorCode: -1,
				errorMessage: "Data Does Not Exist !!!",
				errorData: []
			});
		}
	})
}
/**
 * 
 * @param {*} id 
 * @returns {*}
 */
const showRoleByGroup = (id) =>
{
	return new Promise(async (resolve, reject) =>
	{
		try
		{
			let roles = await db.Group.findOne({
				where: { id: id },
				attributes: ["id", "name", "description"],
				include: {
					model: db.Role,
					attributes: ["id", "url", "description"],
					through: { attributes: [] }
				},
			})
			resolve({
				errorCode: 0,
				errorMessage: "Successfully !!!",
				errorData: roles
			})
		} catch (error)
		{
			console.log(">>>>> Error ", error);
			reject({
				errorCode: -1,
				errorMessage: "Data Does Not Exist !!!",
				errorData: []
			});
		}
	})
}
/**
 * 
 * @param {*}
 * @returns {*}
 */
const assignRoleToGroup = (data) =>
{
	return new Promise(async (resolve, reject) =>
	{
		try
		{
			await db.Group_Role.destroy({
				where: { groupId: data.groupId }
			})
			await db.Group_Role.bulkCreate(data.groupRole)
			resolve({
				errorCode: 0,
				errorMessage: "Successfully !!!",
				errorData: []
			})
		} catch (error)
		{
			console.log(">>>>> Error ", error);
			reject({
				errorCode: -1,
				errorMessage: "Data Does Not Exist !!!",
				errorData: []
			});
		}
	})
}
module.exports = {
	Create: Create,
	getRoleWithPagination: getRoleWithPagination,
	Delete: Delete,
	Edit: Edit,
	getAllRole: getAllRole,
	showRoleByGroup: showRoleByGroup,
	assignRoleToGroup: assignRoleToGroup
}