// Query` type:
//Make sure they are capitalized. Where i see require, I will use (!)
//For mongoDB, id is normally always required
// This .js file is for FETCHING data from the database.
const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    savedBooks: [Book]
    bookCount:Int
  }

  type Book {
  description: String!
  bookId: ID!
  image: String
  link: String
  title: String!
  authors:[String]
  }


  type Auth {
    token: ID!
    user: User
  }

  input BookData{
  description: String!
  bookId: String!
  image: String
  link: String
  title: String!
  authors:[String]
  }

  type Query {
    me: User
  }


  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(bookInput: BookData) : User
    removeBook(bookId: ID!) : User 
  }
`;

module.exports = typeDefs;