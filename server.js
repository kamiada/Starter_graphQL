var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

//initialise graphql schema
var schema = buildSchema(`
  type Query {
    user(id: Int!): Person
    users(shark: String): [Person]
  },
  type Person {
    id: Int
    name: String
    age: Int
    shark: String
  }
  type Mutation {
      updateUser(id: Int!, name: String!, age: String): Person
  }
`);

var users = [
    {
        id: 1,
        name: 'Jolanta',
        age: '21',
        shark: 'Tiger Shark'
    },
    {
        id: 2,
        name: 'Elizabeth',
        age: '34',
        shark: 'Hammrhead Shark'
    },
    {
        id: 3,
        name: 'Julian',
        age: '29',
        shark: 'Whale Shark'
    }
];

var getUser = function(args) {
    var UserID = args.id;
    return users.filter(user => user.id === UserID)[0];
}

var retrieveUsers = function(args) {
    if(args.shark){
        var shark = args.shark;
        return users.filter(user => user.shark === shark);
    }
    else {
        return users;
    }
}

var updateUser = ({ id, name, age }) => {
    users.map(user=> {
        if(user.id === id){
            user.name = name;
            user.age = age;
            return user;
        }
    });
    return users.filter(user => user.id === id)[0];
}

//root resolver
var root = {
    user: getUser,
    users: retrieveUsers,
    updateUser: updateUser
};

//express server with graphql endpoint
var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,  // Must be provided
    rootValue: root,
    graphiql: true,  // Enable GraphiQL when server endpoint is accessed in browser
}));
app.listen(4000, () => console.log('now browse localhost:4000/graphql'));