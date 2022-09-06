import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql `
  mutation addUser($firstname: String!, $lastname: String!, $email: String!, $password: String!, $userType: String! ) {
    addUser(firstname: $firstname, lastname: $lastname, email: $email, password: $password, userType: $userType) {
      token
      user {
        _id
        firstname
        lastname
        email
        password
        userType  
      }
    }
  }
`;

export const ADD_PICTURE = gql`
  mutation addPicture($filename: String!, $contentType: String!, $imageBase64: String!) {
    addPicture(filename: $filename, contentType: $contentType, imageBase64: $imageBase64) {
      _id
      filename
      contentType
      imageBase64
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($pictureOrders: [PictureOrderInput]!, $user: ID!, $status: String, $orderNumber: String) {
    addOrder(pictureOrders: $pictureOrders, user: $user, status: $status, orderNumber: $orderNumber) {
      _id
      pictureOrders {
        size
        quantity
        filename
        cloud_url
      }
      user {
        _id
      }
      status
      orderNumber
    }
  }
`;

export const UPDATE_ORDER_STATUS = gql`
  mutation updateOrderStatus($status: String, $_id: ID) {
    updateOrderStatus(status: $status, _id: $_id) {
      _id
      status
    }
  }
`;

export const CHECKOUT = gql`
  mutation checkout($items: [CartItem]) {
    createCheckoutSession(items: $items) {
      sessionId
      sessionURL
    }
  }
`;