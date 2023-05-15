const connection = require("../../utils/dbConnection")

const Shop = {
    
    // name
    // menu
    // category
    // operatingtime
    // address
    // callnumber
    
    getMenu : async (shop_id)=>{
        
        const results = await connection.query(
            `select Menu.name from Menu JOIN Store on Store.id = Menu.store_id Where Store.id = ${shop_id};`)
        
        return results[0].map(obj=> obj.name)
    }
}

module.exports = Shop

