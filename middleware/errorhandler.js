const CustomError = require('../errors/CustomError')
const {StatusCodes} = require('http-status-codes')

const errorHandlerMid = (err, req, res, next) => {
    if(err instanceof CustomError) {
        return res.status(err.status).json({msg: err.message})
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong. Please, try again later...')
}

module.exports = errorHandlerMid