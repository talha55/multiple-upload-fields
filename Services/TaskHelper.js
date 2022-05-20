const Task = require("../Models/Task")

exports.addTask = (name, userID) => {
    return Task.create({
        name,
        userID
    })
}

exports.taskListByUserID = (id) => {
    return Task.find({
        userID: id
    })
}