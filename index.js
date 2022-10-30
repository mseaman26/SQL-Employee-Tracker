const inquirer = require("inquirer")
const mysql = require("mysql2")

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "password",
        database: "company_db"
    },
    console.log("connected to the database")
);

db.query("SELECT * FROM company_db", function (err, results){
    console.log(results)
})
// inquirer.prompt(
//     [
//         {
//             type: "list",
//             name: "mainMenu",
//             message: "What would you like to do?",
//             choices: ["View all employees", "View all employees by department", "View all employees by manager", "Add employee", "Romove employee", "Update employee role", "Update employee manager", "View all roles", "Add role", "Remove role", "View all departmemts", "Add department", "Remove department", "View total utilized budget by department", "Quit"]
//         }
//     ]
// )
// .then((data) =>{
//     switch(data.mainMenu){
//         case "View all employees":
//             return
//         case "View all employees by department":
//             return
//         case "View all employees by manager":
//             return
//         case "Add employee":
//             return
//         case "Romove employee":
//             return
//         case "Update employee role":
//             return
//         case "Update employee manager":
//             return
//         case "View all roles":
//             return
//         case "Add role":
//             return
//         case "Remove role":
//             return
//         case "View all departmemts":
//             return
//         case "Add department":
//             return
//         case "Remove department":
//             return
//         case "View total utilized budget by department":
//             return
//         case "Quit":
//             return
//     }
// })
