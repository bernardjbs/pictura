const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
  _id: ID!
  firstname: String!
  lastname: String!
  email: String!
  password: String!
  userType: String!
  pictures: [Picture]
  orders: [Order]
}

type Auth {
  token: ID
  user: User
}

type Order {
  _id: ID
  user: ID!
  status: String!
  pictureOrders: [PictureOrder]
}

type Picture {
  _id: ID
  filename: String
  contentType: String
  imageBase64: String
  cloud_assetId: String
  cloud_url: String
  user: ID
  orders: [Order]
}

type PrintSize {
  _id: ID
  size: String
  price: Float
}

type CheckoutSession {
  sessionId: ID!
  sessionURL: String
}

input CreateCheckoutSessionInput {
  cartId: ID!
}

input CartItem {
  quantity: Int
  unitPrice: String
  filename: String
  cloud_url: String
}

input PictureOrderInput {
  size: String
  quantity: Int
  filename: String
  cloud_url: String
}

type PictureOrder {
  size: String
  quantity: Int
  filename: String
  cloud_url: String
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
  updateUser(firstname: String, lastname: String, email: String, password: String): User
  login(email: String!, password: String!): Auth
  addOrder(pictureOrders: [PictureOrderInput]!, user: ID!, status: String): Order
  addPicture(filename: String!, contentType: String!, imageBase64: String!, cloud_assetId: String, cloud_url: String): Picture
  createCheckoutSession(items: [CartItem]): CheckoutSession

  addUser(
    firstname: String!
    lastname: String!
    email: String!
    password: String!
    userType: String!): Auth
}
`

module.exports = typeDefs;