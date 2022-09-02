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
  mutation addOrder($pictureOrders: [PictureOrderInput]!, $user: ID!, $status: String) {
    addOrder(pictureOrders: $pictureOrders, user: $user, status: $status) {
      _id
      pictureOrders {
        size
        quantity
        filename
        cloud_url
      }
      user
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