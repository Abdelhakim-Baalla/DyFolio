import { gql } from "@apollo/client";

export const SEND_CONTACT_EMAIL = gql`
  mutation SendContactEmail($input: SendContactEmailInput!) {
    sendContactEmail(input: $input)
  }
`;
