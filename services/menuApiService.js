const Shop = require("../models/shop")

exports.getMenu = (req, res) =>{
    console.log('ative')
    test = Shop.getMenuList(1)
    console.log(test)
    res.send(
        test
    )
}