import { gql } from 'graphql-tag';


export const typeDefs = gql`
  type Projet {
    id: ID!
    titre: String!
    description: String
    technologies: [String!]!
    lienGithub: String
    lienDemo: String
    images: [String!]
    image: String
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
    description: String
    icone: String
  }

  type Experience {
    id: ID!
    poste: String!
    entreprise: String!
    description: String
    dateDebut: String
    dateFin: String
    lieu: String
    type: String
    competences: [Competence!]
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
  getPortfolio(username: String): Portfolio!
    getProfil: Profil!
    getProjets: [Projet!]!
    getProjet(id: ID!): Projet
    getCompetences: [Competence!]!
    getCompetence(id: ID!): Competence
    getExperiences: [Experience!]!
    getExperience(id: ID!): Experience
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
    description: String!
    technologies: [String!]!
    lienGithub: String
    lienDemo: String
    images: [String!]
    image: String
    lienCode: String
    competences: [ID!]
  }

  input UpdateProjetInput {
    titre: String
    description: String
    technologies: [String!]
    lienGithub: String
    lienDemo: String
    images: [String!]
    image: String
    lienCode: String
    competences: [ID!]
  }

  input CreateCompetenceInput {
    nom: String!
    niveau: Int!
    categorie: ID!
    description: String
    icone: String
  }

  input UpdateCompetenceInput {
    nom: String
    niveau: Int
    categorie: ID
    description: String
    icone: String
  }

  input CreateExperienceInput {
    poste: String!
    entreprise: String!
    description: String!
    dateDebut: String
    dateFin: String
    lieu: String
    type: String
    competences: [ID!]
  }

  input UpdateExperienceInput {
    poste: String
    entreprise: String
    description: String
    dateDebut: String
    dateFin: String
    lieu: String
    type: String
    competences: [ID!]
  }

  input SendContactEmailInput {
    username: String!
    nom: String!
    email: String!
    message: String!
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
    createExperience(input: CreateExperienceInput!): Experience!
    updateExperience(id: ID!, input: UpdateExperienceInput!): Experience!
    deleteExperience(id: ID!): Boolean!
    sendContactEmail(input: SendContactEmailInput!): Boolean!
  }
`;
