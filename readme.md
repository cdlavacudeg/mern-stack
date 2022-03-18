# MERN Stack Course
[Learn](https://www.youtube.com/watch?v=mrHNSanmqQ4)
 how to create a full-stack web app using the MERN stack. The MERN stack is MongoDB, Express, React, and Node.js.

Also, learn how to use MongoDB Realm to convert the backend to serverless and host the entire thing for free in the cloud. You will even learn how to host the React frontend for free.

## Mongo DB

| Tabular (Relational) | MongoDB    |
|----------------------|------------|
| Database             | Database   |
| Table                | Collection |
| Row                  | Document   |
| Index                | Index      |
| Join                 | $lookup    |
| Foreign Key          | Reference  |

Example of a mongoDB document model (JSON, binary JSON):
```json
{
      name: "Beau Carnes",
      title: "Developer & Teacher",
      address: {
            address1: "123 Main Street"
            city: "Grand Rapids",
            state: "Michigan",
            postal_code: "49503",
        },
      topics : [ "Python", "JavaScript","Robots"],
      employee_number : 1234,
      location : [44.9901, 123.0262],
}
```
### Setting Up MongoDB Atlas
[Cloud MongoDB](https://cloud.mongodb.com/v2/619f90483a6a333254c01c2f#clusters)
- Conect to MongoDB Atlas
- Create a Cluster
- Load Sample data
### MongoDB Links:
- [MongoDB Basics](https://university.mongodb.com/courses/M001/about?utm_campaign=new_students&utm_source=partner&utm_medium=referral)
- [MongoDB for JavaScript Developers](https://university.mongodb.com/courses/M220JS/about?utm_campaign=new_students&utm_source=partner&utm_medium=referral)
- [Query Operators](https://docs.mongodb.com/manual/reference/operator/)
- [MongoDB security best practices](https://www.mongodb.com/security-best-practices)

## Create Node/Expres Backend
- create backend directory and init `npm init -y`
- intall dependecies: `npm install express cors mongodb dotenv`
    - express: Web server
    - cors: Cross origin resource sharing, allaws AJAX request to skip origin policies, access data remote hosts, Rigth conection
    - mongodb:Interact with the mongo db database
    - dotenv: Envioremental variables, serves on a file
- install nodemon:`npm install -g nodemon`,development node.js aplications

## .env
Data from conection with cluster of MongoDBAtlas:
`mongodb+srv://cdlavacudeg:<password>@cluster0.4zumk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

[Process .env](https://codeburst.io/process-env-what-it-is-and-why-when-how-to-use-it-effectively-505d0b2831e7)

## Test Backend
`nodemon server`

dao: data access object

## Set name filter on MongoDB Atlas
- create a new index(field option):
```json
{
  "name": "text",
}
```

## Test review
Postman post JSON:
- Add (Post):
    ```json
    {
        "restaurant_id":"5eb3d668b31de5d588f4292a",
        "text": "Great Food!",
        "user_id":"1234",
        "name":"Cristian"
    }
    ```

- Update(Put):

    ```json
    {
        "review_id":"62338e3a73de9c75076cd130",
        "text": "Update Test Food!",
        "user_id":"1234",
        "name":"Cristian"
    }
    ```

- Delete:
`http://localhost:5000/api/v1/restaurants/review?id=62338e3a73de9c75076cd130`
```json
{
    "user_id":"1234"
}

```

## Frontend
`npx create-react-app frontend`
`npm install bootstrap`
`npm install react-router-dom`