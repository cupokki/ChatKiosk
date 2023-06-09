const Shop = require("../models/shop")

exports.getMenu = async (req, res) =>{
    const shop_id = req.params.shop_id
    data = await Shop.getMenuList(shop_id)
    res.json(data)
}