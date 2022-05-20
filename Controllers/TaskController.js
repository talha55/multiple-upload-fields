// Helpers
const TaskHelper = require("../Services/TaskHelper")
const ResponseHelper = require("../Services/ResponseHelper")

// Constants
const Message = require("../Constants/Message")
const ResponseCode = require("../Constants/ResponseCode")

exports.addTask = async(req, res, next) => {
    let request = req.body
    let userInfo = req.user;
    let response = ResponseHelper.getDefaultResponse()

    if (!request.name) {
        response = ResponseHelper.setResponse(
            ResponseCode.NOT_SUCCESS,
            Message.MISSING_PARAMETER
        )
        return res.status(response.code).json(response)
    }

    let task = await TaskHelper.addTask(request.name, userInfo.userId)

    if (task) {
        response = ResponseHelper.setResponse(
            ResponseCode.SUCCESS,
            Message.REQUEST_SUCCESSFUL,
            task
        )
    } else {
        response = ResponseHelper.setResponse(
            ResponseCode.NOT_SUCCESS,
            Message.WENT_WRONG
        )
    }
    return res.status(response.code).json(response)
}

exports.taskList = async(req, res, next) => {
    let userInfo = req.user;
    let response = ResponseHelper.getDefaultResponse()

    let tasks = await TaskHelper.taskListByUserID(userInfo.userId)

    if (tasks) {
        response = ResponseHelper.setResponse(
            ResponseCode.SUCCESS,
            Message.REQUEST_SUCCESSFUL,
            tasks
        )
    } else {
        response = ResponseHelper.setResponse(
            ResponseCode.NOT_SUCCESS,
            Message.WENT_WRONG
        )
    }
    return res.status(response.code).json(response)

}