exports.getDefaultResponse = () => {
    return {
        code: 400,
        message: 'Something went wrong.'
    }
}

exports.setResponse = (code, message, result = null) => {
    return {
        code: code,
        result: result,
        message: message
    }
}