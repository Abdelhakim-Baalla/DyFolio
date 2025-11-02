import { gql } from 'graphql-tag';


export const typeDefs = gql`
  type Projet {
    id: ID!
    titre: String!
    description: String
    image: String
    lienDemo: String
    lienCode: String
    competences: [Competence!]!
  }

  type Categorie {
    id: ID!
    nom: String!
    description: String
  }

  type Competence {
    id: ID!
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
    getProjet(id: ID!): Projet
    getCompetences: [Competence!]!
    getCompetence(id: ID!): Competence
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

  input RegisterInput {
    username: String!
    email: String!
    password: String!
    nom: String!
    prenom: String!
    metier: String!
  }

  input CreateProjetInput {
    titre: String!
    description: String
    image: String
    lienDemo: String
    lienCode: String
    competences: [ID!]
  }

  input UpdateProjetInput {
    titre: String
    description: String
    image: String
    lienDemo: String
    lienCode: String
    competences: [ID!]
  }

  input CreateCompetenceInput {
    nom: String!
    niveau: Int!
    categorie: ID!
  }

  input UpdateCompetenceInput {
    nom: String
    niveau: Int
    categorie: ID
  }

  type Mutation {
    login(username: String!, password: String!): AuthPayload!
    updateProfil(input: UpdateProfilInput!): Profil!
    register(input: RegisterInput!): AuthPayload!
    createProjet(input: CreateProjetInput!): Projet!
    updateProjet(id: ID!, input: UpdateProjetInput!): Projet!
    deleteProjet(id: ID!): Boolean!
    createCompetence(input: CreateCompetenceInput!): Competence!
    updateCompetence(id: ID!, input: UpdateCompetenceInput!): Competence!
    deleteCompetence(id: ID!): Boolean!
  }
`;
