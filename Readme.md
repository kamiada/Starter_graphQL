# Learning GraphQL

In building this simple GraphQL app I followed this tutorial: https://www.freecodecamp.org/news/a-beginners-guide-to-graphql-86f849ce1bec/

## Conclusion

GraphQL returns only the data which it was asked for. It allows data operations like mutations (updating data entries), contional returns, directives and skips (in GraphQL interface). Fragments in GraphQL allows to follow DRY. 

What is the most important, everything needs to be defined in the schema. Resolver in the code (also called root) allows to map oprations from the schema to the functions in the code. 

Important to mention is that GraphQL has one endpoint,ending with /graphql (usually).

An example of GET in GraphQL: 
{me
{
    name
}}

http://myapi/graphql?query={me{name}}