function define(name, value) {
    Object.defineProperty(exports, name, {
        value: value,
        enumerable: true
    })
}

// General Messages
define('REQUEST_SUCCESSFUL', 'Request successful.')
define('INVALID_PASSWORD', 'Invalid password.')
define('LOGIN_SUCCESS', 'You are successfully logged in.')
define('WENT_WRONG', 'Something went wrong!')
define('AUTHENTICATION_FAILED', 'Authentication Failed!')
define('MISSING_PARAMETER', 'Missing Parameter.')

// User Messages
define('USER_NOT_EXIST', 'User does not exist.')
define('USER_ADDED_SUCCESS', 'User was added successfully.')
define('USER_PASSWORD_NOT_MATCH', 'Password does not match.')
define('EMAIL_EXIST', 'Oops - email already exists.')
define('EMAIL_NOT_EXIST', 'Email does not exist.')
define('INVALID_EMAIL', 'Invalid email address.')