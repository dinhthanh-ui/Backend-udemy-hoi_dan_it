import db from '../models/index';

const getGroup = () =>
{
	return new Promise(async (resolve, reject) =>
	{
		try
		{
			let data = await db.Group.findAll({
				attributes: ["id", "name", "description"],
				order: [
					["name", "ASC"]
				]
			})
			resolve({
				errorCode: 0,
				errorMessage: "Get Group successfully !!!!",
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
const Create = (data) =>
{
	return new Promise(async (resolve, reject) =>
	{
		try
		{
			let currentGroups = await db.Group.findAll({
				attributes: ["name", "description"],
				raw: true
			})
			const results = data.filter(({ name: id1 }) => !currentGroups.some(({ name: id2 }) => id2 === id1))
			if (results.length === 0)
			{
				resolve({
					errorCode: 1,
					errorMessage: `Đã Có nhóm Của Người Dùng, Vui Lòng Kiểm Tra Lại !!!!`,
					errorData: []
				});
			} else
			{
				await db.Group.bulkCreate(results)
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
const getGroupWithPagination = (page, limit) => 
{
	return new Promise(async (resolve, reject) =>
	{
		try
		{
			let offset = (page - 1) * limit
			const { count, rows } = await db.Group.findAndCountAll({
				attributes: ["id", "name", "description"],
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
				group: rows
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
const Delete = (groupId) =>
{
	return new Promise(async (resolve, reject) =>
	{
		try
		{
			let group = await db.Group.findOne({
				where: { id: groupId }
			});
			if (!group)
			{
				resolve({
					errorCode: 1,
					errorMessage: "Kết quả của bạn không được tìm thấy !!!!",
					errorData: []
				});
			} else
			{
				await group.destroy()
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
}
const Edit = (data) =>
{
	return new Promise(async (resolve, reject) =>
	{
		try
		{
			let role = await db.Group.findOne({
				where: { id: data.id }
			})
			if (!role)
			{
				resolve({
					errorCode: 1,
					errorMessage: " Kết quả của bạn không được tìm thấy !!!!",
					errorData: []
				});
			} else
			{
				role.name = data.name
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
module.exports = {
	getGroup: getGroup,
	Create: Create,
	getGroupWithPagination: getGroupWithPagination,
	Delete: Delete,
	Edit: Edit
}