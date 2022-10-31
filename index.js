const inquirer = require("inquirer")
const mysql = require("mysql2")
const table = require("console.table")

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "password",
        database: "company_db"
    },
    console.table("connected to the database")
);

function mainMenu (){
    inquirer.prompt(
        [
            {
                type: "list",
                name: "mainMenu",
                message: "What would you like to do?",
                choices: ["View all employees", "View all employees by role", "View all employees by department", "View all employees by manager", "Add employee", "Romove employee", "Update employee role", "Update employee manager", "View all roles", "Add role", "Remove role", "View all departmemts", "Add department", "Remove department", "View total utilized budget by department", "Quit"]
            }
        ]
    )
    .then((data) =>{
        switch(data.mainMenu){
            case "View all employees":
                db.query("SELECT * FROM employees", function (err, results){
                    console.log("")
                    console.table(results)
                    mainMenu()
                })
                return
            case "View all employees by department":
                db.query("SELECT * FROM employees ORDER BY role_id", function (err, results){
                    console.log("")
                    console.table(results)
                    mainMenu()
                })
                return
            case "View all employees by role":
                db.query("SELECT role.title AS title,role.salary AS salary,employees.id,employees.first_name,employees.last_name FROM employees RIGHT JOIN role ON employees.role_id = role.id;", function (err,results){
                    console.log("")
                    console.table(results)
                    mainMenu()
                })
                return
            case "View all employees by manager":
                return
            case "Add employee":
                
                return
            case "Romove employee":
                return
            case "Update employee role":
                return
            case "Update employee manager":
                return
            case "View all roles":
               
                db.query("SELECT * FROM role", function (err, results){
                    console.log("")
                    console.table(results)
                    mainMenu()
                })
    
                return
            case "Add role":
                return
            case "Remove role":
                return
            case "View all departmemts":
                db.query("SELECT * FROM department", function (err, results){
                    console.log("")
                    console.table(results)
                    mainMenu()
                })
                return
            case "Add department":
                return
            case "Remove department":
                return
            case "View total utilized budget by department":
                return
            case "Quit":
                console.log("")
                console.log("Have a nice day")
                console.log("Press control C to get back to terminal")
                return
        }
    })
}
mainMenu()