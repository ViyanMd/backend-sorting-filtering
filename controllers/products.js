const Product = require('../models/product')

const getAllProducts = async (req, res) => {
    const {name, company, featured, numeric, sort, fields} = req.query
    let queryObject = {}
    if(name) {
        queryObject.name = {$regex: name, $options: 'i'}
    }

    if(company) {
        queryObject.company = company
    }

    if(featured) {
        queryObject.featured = featured === "true" ? true : false
    }

    if(numeric) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
          }
          const regEx = /\b(<|>|>=|=|<|<=)\b/g
          let filters = numeric.replace(regEx, (match) => `-${operatorMap[match]}-`)
          const options = ['price', 'rating']
          filters = filters.split(',').forEach(item => {
              const [field, operator, value] = item.split('-')
              if(options.includes(field)) {
                  queryObject[field] = {[operator]: Number(value)}
              }
          })
    }

    let result = Product.find(queryObject)

    if(sort) {
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    } else {
        result = result.sort("createdAt")
    }

    if(fields) {
        const sortList = fields.split(',').join(' ')
        result = result.select(sortList)
    } 

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 5

    const skip = (page - 1) * limit

    result = result.skip(skip).limit(limit)

    const products = await result
    res.status(200).json({nbHits: products.length, products})

}

module.exports = getAllProducts

