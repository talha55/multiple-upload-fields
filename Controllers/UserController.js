const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const validator = require("email-validator")

// Helpers
const UserHelper = require("../Services/UserHelper")
const ResponseHelper = require("../Services/ResponseHelper")

// Constants
const Message = require("../Constants/Message")
const ResponseCode = require("../Constants/ResponseCode")

exports.register = async(req, res, next) => {
    let request = req.body
    let response = ResponseHelper.getDefaultResponse()
    console.log(req.files)

    if (!request.emailAddress ||
        !request.pass
    ) {
        response = ResponseHelper.setResponse(
            ResponseCode.NOT_SUCCESS,
            Message.MISSING_PARAMETER
        )
        return res.status(response.code).json(response)
    }
    if (!validator.validate(request.emailAddress)) {
        response = ResponseHelper.setResponse(
            ResponseCode.NOT_SUCCESS,
            Message.INVALID_EMAIL
        )
        return res.status(response.code).json(response)
    }

    let modelUser = await UserHelper.foundUserByEmail(request.emailAddress)
    if (modelUser != null) {
        response = ResponseHelper.setResponse(
            ResponseCode.NOT_SUCCESS,
            Message.EMAIL_EXIST
        )
        return res.status(response.code).json(response)
    }
    let password = await bcrypt.hash(request.pass, 10)
    let user = await UserHelper.addUser(
        request.emailAddress,
        password,
    )
    if (user) {
        let data = {
            email: user.email,
            userId: user._id
        }

        response = ResponseHelper.setResponse(
            ResponseCode.SUCCESS,
            Message.REQUEST_SUCCESSFUL,
            data
        )
    } else {
        response = ResponseHelper.setResponse(
            ResponseCode.NOT_SUCCESS,
            Message.WENT_WRONG
        )
    }
    return res.status(response.code).json(response)
}

exports.login = async(req, res, next) => {
    let request = req.body
    let response = ResponseHelper.getDefaultResponse()

    if (!request.emailAddress || !request.pass) {
        response = ResponseHelper.setResponse(
            ResponseCode.NOT_SUCCESS,
            Message.MISSING_PARAMETER
        )
        return res.status(response.code).json(response)
    }
    let user = await UserHelper.foundUserByEmail(request.emailAddress)

    if (user == null) {
        response = ResponseHelper.setResponse(
            ResponseCode.NOT_SUCCESS,
            Message.USER_NOT_EXIST
        )
        return res.status(response.code).json(response)
    }


    bcrypt.compare(request.pass, user.password, async(err, result) => {
        if (err) {
            response = ResponseHelper.setResponse(
                ResponseCode.NOT_SUCCESS,
                Message.INVALID_PASSWORD
            )
            return res.status(response.code).json(response)
        }
        if (result) {
            let data = {
                email: user.email,
                userId: user._id
            }

            let optional = {}
            const token = jwt.sign(data, process.env.JWT_SECRET, optional)

            let result = {
                email: user.email,
                userId: user._id
            }

            response = ResponseHelper.setResponse(
                    ResponseCode.SUCCESS,
                    Message.LOGIN_SUCCESS,
                    result
                )
                // Only For Login API
            response.token = token
            return res.status(response.code).json(response)
        }
        response = ResponseHelper.setResponse(
            ResponseCode.NOT_SUCCESS,
            Message.INVALID_PASSWORD
        )
        return res.status(response.code).json(response)
    })
}

exports.userInfo = async(req, res, next) => {
    let response = ResponseHelper.getDefaultResponse()
    let userInfo = req.user;
    response = ResponseHelper.setResponse(
        ResponseCode.SUCCESS,
        Message.LOGIN_SUCCESS, {
            id: userInfo.userId,
            email: userInfo.email
        }
    )
    return res.status(response.code).json(response)
}