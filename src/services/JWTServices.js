import db from '../models/index';
/**
 * 
 * @param {*} user 
 * @returns {search role was user tu table Group}
 */
const getGroupWithRoutes = async (user) =>
{
	let roles = await db.Group.findOne({
		where: { id: user.GroupId },
		attributes: ["id", "name", "description"],
		include: {
			model: db.Role,
			attributes: ["id", "url", "description"],
			through: { attributes: [] }
		},
	})

	return roles ? roles : {};
}

module.exports = {
	getGroupWithRoutes: getGroupWithRoutes
}