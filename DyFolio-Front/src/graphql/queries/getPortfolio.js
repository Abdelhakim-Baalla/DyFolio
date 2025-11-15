import { gql } from "@apollo/client";

export const GET_PORTFOLIO = gql`
  query GetPortfolio($username: String) {
    getPortfolio(username: $username) {
      profil {
        nom
        prenom
        metier
        bio
        photo
        localisation
        reseauxSociaux
      }
    }
  }
`;
