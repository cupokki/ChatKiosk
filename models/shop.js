const connection = require("../utils/dbConnection")

const Shop = {
    
    // name
    // menu
    // category
    // operatingtime
    // address
    // callnumber
    
    getMenuList : async (shop_id)=>{  
        const results = await connection.execute(
            `select Menu.name, Menu.id from Menu JOIN Store on Store.id = Menu.store_id Where Store.id = ?;`
            ,[shop_id]
        )       
        // return results[0].map(obj=> obj.name)
        return results[0]
    }
}

module.exports = Shop
//메뉴정보는 그냥 메모리 많이 쓰더라도 다 긁어오고 키도 거기서 검색하도록 하여 쿼리를 줄이자
// 아이템의 정보를 얻기위해서 아이템의 프라이머리 키인 id를 얻어온다.
// id를 이용해 메뉴의 정보를 찾는다.

// getMenuList