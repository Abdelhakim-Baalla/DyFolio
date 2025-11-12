import { gql } from "@apollo/client";

export const GET_PORTFOLIO = gql`
  query GetPortfolio {
    getPortfolio {
      profil {
        nom
        prenom
        metier
      }
    }
  }
`;
