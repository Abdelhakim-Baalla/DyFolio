import { gql } from 'graphql-tag';


export const typeDefs = gql`
  type Projet {
    titre: String!
    description: String
    image: String
    lienDemo: String
    lienCode: String
  }

  type Competence {
    nom: String!
    niveau: Int!
  }

  type Experience {
    poste: String!
    entreprise: String!
    description: String
    dateDebut: String
    dateFin: String
  }

  type Portfolio {
    bio: String
    projets: [Projet!]!
    competences: [Competence!]!
    experiences: [Experience!]!
  }

  type Profil {
    nom: String!
    prenom: String!
    metier: String!
    bio: String
    photo: String
    reseauxSociaux: [String!]!
    localisation: String!
  }

  type Query {
    getPortfolio: Portfolio!
    getProfil: Profil!
    getProjets: [Projet!]!
    getCompetences: [Competence!]!
    getExperiences: [Experience!]!
  }
`;
