//21162101007_kshitijgupta
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var port = 8080;
var employees = [
    { id: 1, name: 'SHREE RAM', email: 'ram@shaketdham.com', phoneNumber: '1234567890', department: 'HR' },
    { id: 2, name: 'Govind', email: 'Govind@GoLoak.com', phoneNumber: '0987654321', department: 'IT' },
    // Add more employees here
];

app.get('/', (req, res) => {
    const Welcome_Page = `
        <html>
        <head>
            <style>
                body {
                    font-family: 'Malgun Gothic', sans-serif;
                }
                h2 {
                    color: Green;
                }
            </style>
        </head>
        <body>
           <center> <h2>Welcome to Employee Management REST API!</h2></center>
        </body>
        </html>
    `;

    
    res.send(Welcome_Page);
});

app.get('/api/employees', (req, res) => {
   
    const Emp_Table = `
   <html>
    <head>
        <style>
            table {
                border-collapse: collapse;
                width: 100%;
            }
            th, td {
                border: 1px solid black;
                padding: 8px;
                text-align: left;
            }
            th {
                background-color: lightgray;
            }
        </style>
    </head>
    <body>
        <h2>Employee List</h2>
        <table>
            <tr>
                <th>id</th>
                <th>name</th>
                <th>email</th>
                <th>phoneNumber</th>
                <th>department</th>
            </tr>
            ${employees.map(employee => `
                <tr>
                    <td>${employee.id}</td>
                    <td>${employee.name}</td>
                    <td>${employee.email}</td>
                    <td>${employee.phoneNumber}</td>
                    <td>${employee.department}</td>
                </tr>
            `).join('')}
        </table>
    </body>
    </html>
`;

    
    res.send(Emp_Table);
});

app.get('/api/employees/:id', (req, res) => {
    const employee = employees.find(({ id }) => id === parseInt(req.params.id));

    if (!employee) {
        res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Oops... Can\'t find what you are looking for!</h2>');
    } else {
        const Condition_output = `
            <html>
            <head>
                <style>
                    body {
                        font-family: 'Malgun Gothic', sans-serif;
                    }
                    h2 {
                        color: darkred;
                    }
                </style>
            </head>
            <body>
                <h2>Employee Information</h2>
                <p><strong>ID:</strong> ${employee.id}</p>
                <p><strong>Name:</strong> ${employee.name}</p>
                <p><strong>Email:</strong> ${employee.email}</p>
                <p><strong>Phone Number:</strong> ${employee.phoneNumber}</p>
                <p><strong>Department:</strong> ${employee.department}</p>
            </body>
            </html>
        `;

        res.send(Condition_output);
    }
});

app.post('/api/employees', (req, res) => {
    var employee = {
        id: employees.length + 1,
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        department: req.body.department
    };
    employees.push(employee);
    res.send(employee);
});

app.put('/api/employees/:id', (req, res) => {
    var employee = employees.find(({ id }) => id === parseInt(req.params.id));
    if (!employee)
        res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Not Found!! </h2>');

    employee.name = req.body.name;
    employee.email = req.body.email;
    employee.phoneNumber = req.body.phoneNumber;
    employee.department = req.body.department;
    res.send(employee);
});

app.delete('/api/employees/:id', (req, res) => {
    const employee = employees.find(({ id }) => id === parseInt(req.params.id));
    if (!employee)
        res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;"> Not Found!! </h2>');

    const index = employees.indexOf(employee);
    employees.splice(index, 1);

    res.send(employee);
});

app.listen(port, () => {
    console.log('Server is running on port 8080');
});