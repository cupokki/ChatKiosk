const connection = require("../utils/dbConnection")

const Shop = {
    
    // name
    // menu
    // category
    // operatingtime
    // address
    // callnumber
    // image
    
    getMenuNameList : async (shop_id)=>{  
        const results = await connection.execute(
            `select Menu.name, Menu.id from Menu JOIN Store on Store.id = Menu.store_id Where Store.id = ?;`
            ,[shop_id]
        )       
        // return results[0].map(obj=> obj.name)
        return results[0]
    },

    getMenuList : async (shop_id)=>{
        const results = await connection.execute(
            `select * from Menu JOIN Store on Store.id = Menu.store_id Where Store.id = ?;`
            ,[shop_id]
        )
        return results[0];
    }
            
}

module.exports = Shop
