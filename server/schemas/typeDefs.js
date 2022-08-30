const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
  _id: ID
  firstName: String
  lastName: String
  email: String
  pictures: [Picture]
}

type Auth {
  token: ID
  user: User
}

type Order {
  _id: ID
  user: User!
  pictureOrders: [PictureOrder]!
  status: String!
  note: String
}

type Picture {
  _id: ID
  user: User
  filename: String
  contentType: String
  imageBase64: String
  cloud_url: String
}

type PictureOrder {
  _id: ID
  size: String!
  quantity: Int!
  picture: Picture!
}

type PrintSize {
  _id: ID
  size: String
  price: Float
}

type Query {
  user: User
  users: [User]
  order: Order
  orders: [Order]
  picture(id: ID!): Picture
  pictures: [Picture]
  printSizes: [PrintSize]
}

type Mutation {
  addUser(firstName: String!, lastName: String!, email: String!, userType: String!, password: String!, pictures: [ID]): Auth
  updateUser(firstName: String, lastName: String, email: String, password: String): User
  login(email: String!, password: String!): Auth
  addPictureOrder(size: String!, quantity: Int!, picture: [ID]!): PictureOrder
  addOrder(PictureOrder: [ID]!, user: ID!, status: String, note: String): Order
  addPicture(filename: String!, contentType: String!, imageBase64: String!, cloud_assetId: String, cloud_url: String): Picture
}
`

module.exports = typeDefs;