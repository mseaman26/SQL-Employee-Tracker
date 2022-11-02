//importing inquirer and mysql
const inquirer = require("inquirer")
const mysql = require("mysql2")
//console.table can be useful
const table = require("console.table")
//create a connection to the database
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "password",
        database: "company_db"
    },
    console.table("connected to the database")
);
//This is the main function of the program.  It brings up the main menu and calls other functions within to perform the functionality of the program
function mainMenu (){
    inquirer.prompt(
        [
            {
                //displaying the main menu and giving the user choices of what to do
                type: "list",
                name: "mainMenu",
                message: "What would you like to do?",
                choices: ["View all employees", "View all employees by role", "View all employees by department", "View all employees by manager", "Add employee", "Romove employee", "Update employee role", "Update employee manager", "View all roles", "Add role", "Remove role", "View all departmemts", "Add department", "Remove department", "View total utilized budget by department", "Quit"]
            }
        ]
    )
    .then((data) =>{
        //a switch statement to handle the various choices the user makes
        switch(data.mainMenu){
            //VIEW ALL EMPLOYEES
            case "View all employees":
                viewAllEmployees()
                //I used setTimeout several times within this program to deal with synchrony issues.  I wanted the employees to be displayed BEFORE main menu is displayed
                setTimeout(mainMenu, 200)
                break
            
            // VIEW ALL EMPLOYEES BY ROLE
            case "View all employees by role":
                viewAllEmployeesByRoll()
                break
                //VIEW ALL EMPLOYEES BY DEPARTMENT
            case "View all employees by department":
                viewAllEmployeesByDepartment()
                break
                //TODO:
            case "View all employees by manager":
                break
                //ADD EMPLOYEE
            case "Add employee":
                viewAllManagers()
                setTimeout(addEmployee, 200)
                break
                //TODO:
            case "Romove employee":
                console.log("")
                console.log("Sorry, that functionality hasn't been built yet")
                console.log("")
                mainMenu()
                break
                //UPDATE EMPLOYEE ROLE
            case "Update employee role":
                
                updateEmployeeRole()

                break
                //TODO:
            case "Update employee manager":
                console.log("")
                console.log("Sorry, that functionality hasn't been built yet")
                console.log("")
                mainMenu()
                break
            case "View all roles":
                //this function has an argument that defaults to false and isnt required.  I inserted true here because I wanted it to execute the mainMenu function, which was placed inside an "if" statement.  I call this function in another part of the program where I DONT want it to execute the mainMenu function, and thus I give it no arguments
                viewAllRoles(true)
                break
                //ADD ROLE
            case "Add role":
                viewAllDepartments(true)
                break
                //TODO:
            case "Remove role":
                console.log("")
                console.log("Sorry, that functionality hasn't been built yet")
                console.log("")
                mainMenu()
                break
                //VIEW ALL DEPARTMENTS
            case "View all departmemts":
                viewAllDepartments()
                setTimeout(mainMenu, 200)         
                break
                //ADD DEPARTMENT
            case "Add department":
                addDepartment()
                break
                //TODO:
            case "Remove department":
                console.log("")
                console.log("Sorry, that functionality hasn't been built yet")
                console.log("")
                mainMenu()
                break
                //TODO:
            case "View total utilized budget by department":
                console.log("")
                console.log("Sorry, that functionality hasn't been built yet")
                console.log("")
                mainMenu()
                break
            case "Quit":
                console.log("")
                console.log("Have a nice day")
                process.exit()
                break
        }
    })
}
function viewAllEmployees(exectuteCB=false){
    //Hardest part of the assignment.  This code was the result of help I received from an Ask BCS person.  There is even some syntax that i don't fully understand, mainly where it utilizes "manager.first_name...etc" because the manager alias hadn't even been defined yet.  It works, for which I am glad
    db.query(`SELECT employees.id, employees.first_name, employees.last_name, role.title AS title, role.salary AS salary, department.name AS department, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employees LEFT JOIN role ON employees.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employees manager ON employees.manager_id = manager.id`, function (err, results){
        console.log("")
        console.table(results)
        if(exectuteCB == true){
            updateEmployeeRole()
        }
    })
}
function viewAllEmployeesByRoll(){
    //A simple SELECT command in a db.query, then return to main menu
    db.query("SELECT role.title AS title,role.salary AS salary,employees.id,employees.first_name,employees.last_name FROM employees RIGHT JOIN role ON employees.role_id = role.id;", function (err,results){
        console.log("")
        console.table(results)
        mainMenu()
    })
}
function viewAllEmployeesByDepartment(){
    //A simple SELECT command in a db.query, then return to main menu
    db.query("SELECT * FROM employees ORDER BY role_id", function (err, results){
        console.log("")
        console.table(results)
        mainMenu()
    })
}
function viewAllRoles(exectuteCB=false){
    //A simple SELECT command in a db.query, then return to main menu
    db.query("SELECT role.title AS Job_Title, role.id AS Role_ID, department.name AS Department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id ORDER BY role.id", function (err, results){
        console.log("")
        console.table(results)
        if(exectuteCB == true){
            mainMenu()
        }
    })
}

function viewAllDepartments(exectuteCB=false){
    //A simple SELECT command in a db.query, with an option to return to the main menu, depending on the argument given (or not given)
    db.query("SELECT department.name AS Department, department.id AS Department_ID FROM department", function (err, results){
        console.log("")
        console.table(results)
        console.log("")
        if (exectuteCB == true){
            //this feature is here because I want to view all departments within another function, but I don't want it to return to the main menu.  This was a work-around that prevented me from having to write a new function
            addRole()
        }
        
    })
}
function addDepartment(){
    //ask for the name of the department
    inquirer.prompt([
        {
            type: "input",
            name: "departmentName",
            message: "What is the name of the department you'd like to add?"
        }
    ])
    //then use the answer to insert that value into the department table
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
}
function addRole()
    {inquirer.prompt([
        {
            //When the user chooses "add role,"  viewAllDepartments is called first, displaying all of the departments above the first question.  It is caled WITHOUT the optional argument
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
    //Using the user's three responses to insurt role data
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
function updateEmployeeRole(){
    //this function involved nested setTimeouts.  I did this because of synchrony issues with inquirer. I wanted the employee list to be displayed at the beginning of the function, but I also wanted the roles to be displayed after the first question, allowing the user to see the roles that they can choose from. This also required me to declare a couple of variables at the beginning of the function and setting their values after the first and second questions
    let empID
    let role
    viewAllEmployees()
        setTimeout(() =>{
            inquirer.prompt([
                {
                    type: "number",
                    name: "employeeId",
                    message: "Above is a list of employees.  Which employee's role would you like to update? (Enter the ID number only)"
                }
              
            ])
            .then((data) =>{
                empID = data.employeeId
                viewAllRoles()
                setTimeout(() => {
                    inquirer.prompt([
                        {
                            type: "number",
                            name: "newRole",
                            message: "above is a list of roles.  Select the ID of the employee's new role"
                        }
                    ])
                    .then((data) =>{
                        role = data.newRole
                        db.query(`UPDATE employees SET role_id = ${role} WHERE id = ${empID};`, function (err, results){
                            if(err){
                                console.log(err)
                            }else{
                                console.log("")
                                console.log(`role has been updated!`)
                                console.log("")
                                mainMenu()
                            }
                            
                        })
                    })
                }, 400)
            })
            }, 200)
}

function viewAllManagers(){
    //Show all employees that have a manager_id of null, meaning that they are a manager, and report to nobody
    db.query("SELECT * FROM employees WHERE manager_id IS null", function (err, results){
        console.log("")
        console.table(results)

    })
}
function addEmployee(){
    //viewAllManagers is called first when the "add employee" option is chosen. This allows the user to see a list of managers so they could chose which one the new employee reports to.  It was simpler to make this the first question
    inquirer.prompt(
        [
            {
                type: "input",
                name: "employeeManagerId",
                message: "Above is a list of managers. What is the employee ID number of the new employee's manager?"
            },
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
            }
           

        ]
    )
    .then((data) =>{
        let role
        //assigning a role value to the new employee, depenting on the user's response
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
                console.log("")
                console.log(`${data.employeeFirstName} ${data.employeeLastName} has been added!`)
                console.log("")
                mainMenu()
            }
            
        })
    })
}
mainMenu()
