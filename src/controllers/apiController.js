
import loginService from '../services/loginServices'
/**
 * @param {*} Create New User
 * @param {*} Method Post
 */
const Register = async (req, res) =>
{
    try
    {
        if (!req.body.userName || !req.body.email || !req.body.phone)
        {
            return res.status(200).json({
                errorCode: 1,
                errorMessage: "Missing required parameter !!!",
                errorData: ""
            })
        } else if (req.body.password && req.body.password.length < 8)
        {
            return res.status(200).json({
                errorCode: 1,
                errorMessage: "Mật khẩu cần dài ít nhất 8 ký tự",
                errorData: ""
            })
        }
        else
        {
            let message = await loginService.handleRegister(req.body)
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
            errorData: ""
        })
    }
};
/**
 * @param {*} Hand User Login
 */
const Login = async (req, res) =>
{
    try
    {
        let message = await loginService.handleLogin(req.body);
        if (message && message.errorData && message.errorData.accessToken)
        {
            // set cookie
            res.cookie("jwt", message.errorData.accessToken, { httpOnly: true, maxAge: 60 * 60 * 1000 });
        }
        return res.status(200).json({
            errorCode: message.errorCode,
            errorMessage: message.errorMessage,
            errorData: message.errorData
        })
    } catch (error)
    {
        console.log(error);
        return res.status(500).json({
            errorCode: -1,
            errorMessage: "error from server !!!!",
            errorData: ""
        })
    }
}
const Logout = (req, res) =>
{
    try
    {
        res.clearCookie("jwt");
        return res.status(200).json({
            errorCode: 0,
            errorMessage: "Đăng Xuất Thành Công !!!",
            errorData: ""
        })
    } catch (error)
    {

        console.log(error);
        return res.status(500).json({
            errorCode: -1,
            errorMessage: "error from server !!!!",
            errorData: ""
        })
    }
}

module.exports = {
    Register: Register,
    Login: Login,
    Logout: Logout
}