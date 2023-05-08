const mysql = require("../../utils/dbConnection")

const Shop = {
    
    // name
    // menu
    // category
    // operatingtime
    // address
    // callnumber
    
    getMenu : (name)=>{
        mysql.query(
            `SELECT Store.name, Menu.name FROM Store, Menu WHERE Store.name = "${name}" AND Menu.storename = Store.name`,
            (error, results, fields) => {
                if (error) throw error;
                console.log('The solution is: ', results);
            }
        )
        menu =1
        return menu
    }
    
}