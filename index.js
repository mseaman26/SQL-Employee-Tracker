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
            //VIEW ALL EMPLOYEES
            case "View all employees":
                db.query("SELECT employees.first_name, employees.last_name, employees.id, role.title AS Job_Title, department.name AS Department FROM employees JOIN role ON employees.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employees.id", function (err, results){
                    console.log("")
                    console.table(results)
                    mainMenu()
                })
                break
            //VIEW ALL EMPLOYEES BY DEPARTMENT TODO:
            case "View all employees by department":
                db.query("SELECT * FROM employees ORDER BY role_id", function (err, results){
                    console.log("")
                    console.table(results)
                    mainMenu()
                })
                break
            // VIEW ALL EMPLOYEES BY ROLE
            case "View all employees by role":
                db.query("SELECT role.title AS title,role.salary AS salary,employees.id,employees.first_name,employees.last_name FROM employees RIGHT JOIN role ON employees.role_id = role.id;", function (err,results){
                    console.log("")
                    console.table(results)
                    mainMenu()
                })
                break
            case "View all employees by manager":
                break
            case "Add employee":
                inquirer.prompt(
                    [
                        {
                            type: "input",
                            name: "employeeFirstName",
                            message: "What is the new employee's first name?"
                        },
                        {
                            type: "input",
                            name: "employeeLastName",
                            message: "What is the new employee's last name?"
                        },
                        {
                            type: "list",
                            name: "employeeRole",
                            message: "What is the new employee's role?",
                            choices: ["Sales Lead", "Sales Person", "Senior Software Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead", "Lawer", "CEO"]
                        },
                        {
                            type: "input",
                            name: "employeeManagerId",
                            message: "What is the employee ID number of the new employee's manager?"
                        }

                    ]
                )
                .then((data) =>{
                    let role
                    switch(data.employeeRole){
                        case "Sales Lead":
                            role = 1
                            break
                        case "Sales Person":
                            role = 2
                            break
                        case "Senior Software Engineer":
                            role =3
                            break
                        case "Software Engineer":
                            role = 4
                            break 
                        case "Account Manager":
                            role = 5
                            break
                        case "Accountant":
                            role = 6
                            break
                        case "Legal Team Lead":
                            role = 7
                            break
                        case "Lawer":
                            role = 8
                            break
                        case "CEO":
                            role = 9
                            break
                        
                    }
                    db.query(`INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES ("${data.employeeFirstName}", "${data.employeeLastName}", ${role}, ${data.employeeManagerId});`, function (err, results){
                        if(err){
                            console.log(err)
                        }else{
                            console.log(`${data.employeeFirstName} ${data.employeeLastName} has been added!`)
                            mainMenu()
                        }
                        
                    })
                })
                break
            case "Romove employee":
                break
            case "Update employee role":
                break
            case "Update employee manager":
                break
            case "View all roles":
               
                db.query("SELECT role.title AS Job_Title, role.id AS Role_ID, department.name AS Department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id ORDER BY role.id", function (err, results){
                    console.log("")
                    console.table(results)
                    mainMenu()
                })
    
                break
            case "Add role":
                viewAllDepartments()
                setTimeout(chooseManager, 200)
  
                break
            case "Remove role":
                break
            case "View all departmemts":
                db.query("SELECT department.name AS Department, department.id AS Department_ID FROM department", function (err, results){
                    console.log("")
                    console.table(results)
                    mainMenu()
                })
                break
            case "Add department":
                inquirer.prompt([
                    {
                        type: "input",
                        name: "departmentName",
                        message: "What is the name of the department you'd like to add?"
                    }
                ])
                    .then((data) =>{
                        db.query(`INSERT INTO department(name) VALUES ("${data.departmentName}")`, function (err, results){
                            if(err){
                                console.log(err)
                            }else{
                                console.log("")
                                console.log(`${data.departmentName} has been added to the departments!`)
                                console.log("")
                                mainMenu()
                            }
                            
                        })
                    })
                
                break
            case "Remove department":
                break
            case "View total utilized budget by department":
                break
            case "Quit":
                console.log("")
                console.log("Have a nice day")
                console.log("Press control C to get back to terminal")
                break
        }
    })
}

function viewAllDepartments(){
    db.query("SELECT department.name AS Department, department.id AS Department_ID FROM department", function (err, results){
        console.log("")
        console.table(results)

    })
}
mainMenu()
function chooseManager(){inquirer.prompt([
    {
        type: "number",
        name: "roleDepartment",
        message: "Above is a list of current departments.  Which one would you like to add a role to? (enter number)"
    },
    {
        type: "input",
        name: "roleName",
        message: "What is the name of the role you'd like to add?"
    },
    {
        type: "number",
        name: "roleSalary",
        message: "What salary will you attribute to this role? (enter number, no commas)"
    }
])
    .then((data) =>{
        db.query(`INSERT INTO role(title, salary, department_id) VALUES ("${data.roleName}", ${data.roleSalary}, ${data.roleDepartment})`, function (err, results){
            if(err){
                console.log(err)
            }else{
                console.log("")
                console.log(`${data.roleName} has been added!`)
                console.log("")
                mainMenu()
            }
            
        })
    })}