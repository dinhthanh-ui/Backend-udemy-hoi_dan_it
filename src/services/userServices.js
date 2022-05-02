import db from '../models/index';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
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

//==================================================
/**
 * @param {*} Create New User with database connection
 */
const Create = (data) =>
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
                errorMessage: "Tạo Mới Người Dùng Thành Công !!!",
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
 * 
 * @param {user pagination} for User 
 * @returns 
 */
const getUserWithPagination = (page, limit) =>
{
    return new Promise(async (resolve, reject) =>
    {
        try
        {
            let offset = (page - 1) * limit
            const { count, rows } = await db.User.findAndCountAll({
                attributes: ["id", "email", "userName", "address", "phone", "sex", "fullName"],
                include: { model: db.Group, attributes: ["name", "description"] },
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
                users: rows
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
const Delete = (userId) =>
{
    return new Promise(async (resolve, reject) =>
    {
        try
        {
            let user = await db.User.findOne({
                where: { id: userId }
            });
            if (!user)
            {
                resolve({
                    errorCode: 1,
                    errorMessage: "Kết quả của bạn không được tìm thấy !!!!",
                    errorData: []
                });
            } else
            {
                await user.destroy()
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
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (!user)
            {
                resolve({
                    errorCode: 1,
                    errorMessage: " Your results were not found !!!!",
                    errorData: []
                });
            } else
            {
                user.userName = data.userName
                user.fullName = data.fullName
                user.address = data.address
                user.sex = data.sex
                user.GroupId = data.GroupId
                await user.save()
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
    Create: Create,
    Delete: Delete,
    Edit: Edit,
    getUserWithPagination: getUserWithPagination

}