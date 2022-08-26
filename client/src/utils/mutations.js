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
  mutation addPicture($filename: String!, $contentType: String!, $imageBase64: String!, $userId: ID!) {
    addPicture(filename: $filename, contentType: $contentType, imageBase64: $imageBase64, user: $userId) {
      _id
      filename
      contentType
      imageBase64
      user {
        _id
      }
    }
  }
`;

export const UPLOAD_PHOTO = gql`
  mutation uploadPhoto($photo: String!) {
    uploadPhoto(photo: $photo) 
  }
`;