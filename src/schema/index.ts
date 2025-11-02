import { gql } from 'graphql-tag';


export const typeDefs = gql`
  type Projet {
    titre: String!
    description: String
    image: String
    lienDemo: String
    lienCode: String
    competences: [Competence!]!
  }

  type Categorie {
    nom: String!
    description: String
  }

  type Competence {
    nom: String!
    niveau: Int!
    categorie: Categorie
  }

  type Experience {
    poste: String!
    entreprise: String!
    description: String
    dateDebut: String
    dateFin: String
  }


  type Profil {
    nom: String!
    prenom: String!
    metier: String!
    bio: String
    photo: String
    reseauxSociaux: [String!]
    localisation: String
  }

  type Portfolio {
    profil: Profil!
    projets: [Projet!]!
    competences: [Competence!]!
    experiences: [Experience!]!
  }

  type Query {
    getPortfolio: Portfolio!
    getProfil: Profil!
    getProjets: [Projet!]!
    getCompetences: [Competence!]!
    getExperiences: [Experience!]!
  }

  type MiniUtilisateur {
    id: ID!
    username: String!
    email: String!
  }

  type AuthPayload {
    token: String!
    user: MiniUtilisateur!
  }

  input UpdateProfilInput {
    nom: String
    prenom: String
    metier: String
    bio: String
    photo: String
    reseauxSociaux: [String!]
    localisation: String
  }

  type Mutation {
    login(username: String!, password: String!): AuthPayload!
    updateProfil(input: UpdateProfilInput!): Profil!
  }
`;
