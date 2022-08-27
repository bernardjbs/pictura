import { gql } from '@apollo/client';


export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      email
      pictures {
        _id
        cloud_url
      }
    }
  }
`;

// export const QUERY_USER = gql`
//     query($firstName: String){
//       user(firstName: $firstName) {
//       firstName
//       lastName
//     }
//   }
// `;
export const QUERY_PICTURE = gql`
  {
    picture {
      filename
      contentType
      imageBase64
      cloud_assetId
      cloud_url
      user
      orders {
        pictureOrders {
          pictureOrder {
            size
            quantity
          }
        }
        status
        note
      }
    }
  }
`;