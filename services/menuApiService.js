const Shop = require('../models/shop')

exports.menuApiService = (req, res) =>{
    console.log('ative')
    test = Shop.getMenuList(1)
    console.log(test)
    res.send(
        test
    )
}