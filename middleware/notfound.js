const {StatusCodes} = require('http-status-codes')

const notFound = (req, res, next) => {
    res.status(StatusCodes.NOT_FOUND).json({sucess: false, msg: `Page Not Found`})
}

module.exports = notFound