const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
  _id: ID
  firstName: String
  lastName: String
  email: String, 
  pictures: [Picture]
}

type Auth {
  token: ID
  user: User
}

type printOrder {
  _id: ID
  picture: Picture
  quantity: Int
  size: String
}

type Order {
  _id: ID
  customer: User
  printOrders: [printOrder]
  status: String
  note: String
}

type Picture {
  _id: ID
  customer: User
  filename: String
  contentType: String
  imageBase64: String
  filepath: String
}

type Query {
  user: User
  users: [User]
  order: Order
  orders: [Order]
  picture(id: ID!): Picture
  pictures: [Picture]
}

type Mutation {
  addUser(firstName: String!, lastName: String!, email: String!, userType: String!, password: String!, pictures: [ID]): Auth
  updateUser(firstName: String, lastName: String, email: String, password: String): User
  login(email: String!, password: String!): Auth
  addPrintOrder(pictureId: ID, filename: String, quantity: Int, size: String): [printOrder]
  addOrder(printOrders: [ID]!, customer: ID!, status: String, note: String): Order
  addPicture(filename: String!, contentType: String!, imageBase64: String!, filepath: String!, userId: ID!): Picture
}
`

module.exports = typeDefs;