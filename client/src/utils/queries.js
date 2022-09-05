import { gql } from '@apollo/client';


export const QUERY_USER = gql`
  {
    user {
      firstname
      lastname
      email
      pictures {
        _id
        cloud_url
      }
    }
  }
`;

export const QUERY_PRINT_SIZES = gql`
  {
    printSizes {
      _id
      size
      price
    }
  }
`;

export const QUERY_PICTURE = gql`
  query getPicture($id: ID!) {
    picture(id: $id) {
      filename
      contentType
      imageBase64
      cloud_assetId
      cloud_url
      user
    }
  }
`;

export const QUERY_ORDERS = gql`
{
  orders {
    _id
    user {
      firstname
      lastname
    }
    status
    pictureOrders {
      size
      quantity
      filename
      cloud_url
    }
    orderNumber
    createdAt
  }
}

`;