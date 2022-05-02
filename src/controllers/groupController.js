import groupService from '../services/groupService'
const showGroup = async (req, res) =>
{
	try
	{
		let message = await groupService.getGroup()
		if (!message)
		{
			return res.status(200).json({
				errorCode: 1,
				errorMessage: "Không tim thây kêt quả",
				errorData: []
			})
		} else
		{
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
		});
	}
}
const createGroup = async (req, res) =>
{
	try
	{
		let message = await groupService.Create(req.body)
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
const showAllGroup = async (req, res) =>
{
	try
	{
		if (req.query.page && req.query.limit)
		{
			let page = req.query.page;
			let limit = req.query.limit;
			let message = await groupService.getGroupWithPagination(+page, +limit)
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
}
const deleteGroup = async (req, res) =>
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
			let message = await groupService.Delete(req.body.id);
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
}
const updateGroup = async (req, res) =>
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
			let message = await groupService.Edit(data);
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
	showGroup: showGroup,
	createGroup: createGroup,
	showAllGroup: showAllGroup,
	deleteGroup: deleteGroup,
	updateGroup: updateGroup
}