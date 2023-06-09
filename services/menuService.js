const Shop = require("../models/shop")

exports.getMenu = async (req, res) =>{
    console.log(`test`)
    const shop_id = req.params.shop_id
    try{
        data = await Shop.getMenuList(shop_id)
    }
    catch(e){
        console.log(e)
        res.status(500).json({error:e})
    }
    res.json(data)
}