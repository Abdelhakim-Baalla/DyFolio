import { useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';

// GraphQL queries
const GET_PROJECTS = gql`
  query {
    getProjets {
      id
      titre
      description
      image
      lienDemo
      lienCode
    }
  }
`;

const GET_COMPETENCES = gql`
  query {
    getCompetences {
      id
      nom
      niveau
      categorie {
        id
        nom
      }
    }
  }
`;

const GET_EXPERIENCES = gql`
  query {
    getExperiences {
      id
      poste
      entreprise
      description
      dateDebut
      dateFin
    }
  }
`;

// Mutations
const CREATE_PROJECT = gql`
  mutation($input: CreateProjetInput!) {
    createProjet(input: $input) {
      id
      titre
    }
  }
`;

const UPDATE_PROJECT = gql`
  mutation($id: ID!, $input: UpdateProjetInput!) {
    updateProjet(id: $id, input: $input) {
      id
      titre
    }
  }
`;

const DELETE_PROJECT = gql`
  mutation($id: ID!) {
    deleteProjet(id: $id)
  }
`;

const CREATE_COMPETENCE = gql`
  mutation($input: CreateCompetenceInput!) {
    createCompetence(input: $input) {
      id
      nom
    }
  }
`;

const UPDATE_COMPETENCE = gql`
  mutation($id: ID!, $input: UpdateCompetenceInput!) {
    updateCompetence(id: $id, input: $input) {
      id
      nom
    }
  }
`;

const DELETE_COMPETENCE = gql`
  mutation($id: ID!) {
    deleteCompetence(id: $id)
  }
`;

const CREATE_EXPERIENCE = gql`
  mutation($input: CreateExperienceInput!) {
    createExperience(input: $input) {
      id
      poste
    }
  }
`;

const UPDATE_EXPERIENCE = gql`
  mutation($id: ID!, $input: UpdateExperienceInput!) {
    updateExperience(id: $id, input: $input) {
      id
      poste
    }
  }
`;

const DELETE_EXPERIENCE = gql`
  mutation($id: ID!) {
    deleteExperience(id: $id)
  }
`;

export default function Admin() {
  const [activeTab, setActiveTab] = useState('projects');
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  // Projects
  const { data: projectsData, refetch: refetchProjects } = useQuery(GET_PROJECTS);
  const [createProject] = useMutation(CREATE_PROJECT);
  const [updateProject] = useMutation(UPDATE_PROJECT);
  const [deleteProject] = useMutation(DELETE_PROJECT);

  // Competences
  const { data: competencesData, refetch: refetchCompetences } = useQuery(GET_COMPETENCES);
  const [createCompetence] = useMutation(CREATE_COMPETENCE);
  const [updateCompetence] = useMutation(UPDATE_COMPETENCE);
  const [deleteCompetence] = useMutation(DELETE_COMPETENCE);

  // Experiences
  const { data: experiencesData, refetch: refetchExperiences } = useQuery(GET_EXPERIENCES);
  const [createExperience] = useMutation(CREATE_EXPERIENCE);
  const [updateExperience] = useMutation(UPDATE_EXPERIENCE);
  const [deleteExperience] = useMutation(DELETE_EXPERIENCE);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (activeTab === 'projects') {
        if (editingItem) {
          await updateProject({ variables: { id: editingItem.id, input: formData } });
        } else {
          await createProject({ variables: { input: { ...formData, technologies: [], competences: [] } } });
        }
        refetchProjects();
      } else if (activeTab === 'competences') {
        if (editingItem) {
          await updateCompetence({ variables: { id: editingItem.id, input: formData } });
        } else {
          await createCompetence({ variables: { input: formData } });
        }
        refetchCompetences();
      } else if (activeTab === 'experiences') {
        if (editingItem) {
          await updateExperience({ variables: { id: editingItem.id, input: formData } });
        } else {
          await createExperience({ variables: { input: formData } });
        }
        refetchExperiences();
      }

      setFormData({});
      setEditingItem(null);
    } catch (error) {
      console.error('Error:', error);
      alert('Erreur: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Êtes-vous sûr ?')) return;

    try {
      if (activeTab === 'projects') {
        await deleteProject({ variables: { id } });
        refetchProjects();
      } else if (activeTab === 'competences') {
        await deleteCompetence({ variables: { id } });
        refetchCompetences();
      } else if (activeTab === 'experiences') {
        await deleteExperience({ variables: { id } });
        refetchExperiences();
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Erreur: ' + error.message);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
  };

  const renderProjectsTab = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Gestion des Projets</h2>

      <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Titre"
            value={formData.titre || ''}
            onChange={e => setFormData({ ...formData, titre: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Lien Demo"
            value={formData.lienDemo || ''}
            onChange={e => setFormData({ ...formData, lienDemo: e.target.value })}
            className="border p-2 rounded"
          />
          <textarea
            placeholder="Description"
            value={formData.description || ''}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            className="border p-2 rounded col-span-2"
            required
          />
          <input
            type="text"
            placeholder="Lien Code"
            value={formData.lienCode || ''}
            onChange={e => setFormData({ ...formData, lienCode: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="URL Image"
            value={formData.image || ''}
            onChange={e => setFormData({ ...formData, image: e.target.value })}
            className="border p-2 rounded"
          />
        </div>
        <div className="flex gap-2 mt-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            {editingItem ? 'Mettre à jour' : 'Créer'}
          </button>
          {editingItem && (
            <button
              type="button"
              onClick={() => { setEditingItem(null); setFormData({}); }}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Annuler
            </button>
          )}
        </div>
      </form>

      <div className="grid gap-4">
        {projectsData?.getProjets?.map(project => (
          <div key={project.id} className="border p-4 rounded flex justify-between items-center">
            <div>
              <h3 className="font-bold">{project.titre}</h3>
              <p className="text-gray-600 text-sm">{project.description}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(project)} className="bg-yellow-500 text-white px-3 py-1 rounded">
                Éditer
              </button>
              <button onClick={() => handleDelete(project.id)} className="bg-red-500 text-white px-3 py-1 rounded">
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCompetencesTab = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Gestion des Compétences</h2>

      <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nom"
            value={formData.nom || ''}
            onChange={e => setFormData({ ...formData, nom: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            placeholder="Niveau (1-5)"
            value={formData.niveau || ''}
            onChange={e => setFormData({ ...formData, niveau: parseInt(e.target.value) })}
            className="border p-2 rounded"
            min="1"
            max="5"
            required
          />
          <input
            type="text"
            placeholder="Catégorie ID"
            value={formData.categorie || ''}
            onChange={e => setFormData({ ...formData, categorie: e.target.value })}
            className="border p-2 rounded col-span-2"
            required={!editingItem}
          />
        </div>
        <div className="flex gap-2 mt-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            {editingItem ? 'Mettre à jour' : 'Créer'}
          </button>
          {editingItem && (
            <button
              type="button"
              onClick={() => { setEditingItem(null); setFormData({}); }}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Annuler
            </button>
          )}
        </div>
      </form>

      <div className="grid gap-4">
        {competencesData?.getCompetences?.map(competence => (
          <div key={competence.id} className="border p-4 rounded flex justify-between items-center">
            <div>
              <h3 className="font-bold">{competence.nom}</h3>
              <p className="text-gray-600 text-sm">Niveau: {competence.niveau}/5</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(competence)} className="bg-yellow-500 text-white px-3 py-1 rounded">
                Éditer
              </button>
              <button onClick={() => handleDelete(competence.id)} className="bg-red-500 text-white px-3 py-1 rounded">
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderExperiencesTab = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Gestion des Expériences</h2>

      <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Poste"
            value={formData.poste || ''}
            onChange={e => setFormData({ ...formData, poste: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Entreprise"
            value={formData.entreprise || ''}
            onChange={e => setFormData({ ...formData, entreprise: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description || ''}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            className="border p-2 rounded col-span-2"
            required
          />
          <input
            type="date"
            placeholder="Date début"
            value={formData.dateDebut || ''}
            onChange={e => setFormData({ ...formData, dateDebut: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="date"
            placeholder="Date fin"
            value={formData.dateFin || ''}
            onChange={e => setFormData({ ...formData, dateFin: e.target.value })}
            className="border p-2 rounded"
          />
        </div>
        <div className="flex gap-2 mt-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            {editingItem ? 'Mettre à jour' : 'Créer'}
          </button>
          {editingItem && (
            <button
              type="button"
              onClick={() => { setEditingItem(null); setFormData({}); }}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Annuler
            </button>
          )}
        </div>
      </form>

      <div className="grid gap-4">
        {experiencesData?.getExperiences?.map(experience => (
          <div key={experience.id} className="border p-4 rounded flex justify-between items-center">
            <div>
              <h3 className="font-bold">{experience.poste}</h3>
              <p className="text-gray-600 text-sm">{experience.entreprise}</p>
              <p className="text-gray-500 text-xs">{experience.dateDebut} - {experience.dateFin || 'Présent'}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(experience)} className="bg-yellow-500 text-white px-3 py-1 rounded">
                Éditer
              </button>
              <button onClick={() => handleDelete(experience.id)} className="bg-red-500 text-white px-3 py-1 rounded">
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Administration</h1>

      <div className="flex gap-4 mb-6 border-b">
        <button
          onClick={() => setActiveTab('projects')}
          className={`px-4 py-2 ${activeTab === 'projects' ? 'border-b-2 border-blue-500 font-bold' : ''}`}
        >
          Projets
        </button>
        <button
          onClick={() => setActiveTab('competences')}
          className={`px-4 py-2 ${activeTab === 'competences' ? 'border-b-2 border-blue-500 font-bold' : ''}`}
        >
          Compétences
        </button>
        <button
          onClick={() => setActiveTab('experiences')}
          className={`px-4 py-2 ${activeTab === 'experiences' ? 'border-b-2 border-blue-500 font-bold' : ''}`}
        >
          Expériences
        </button>
      </div>

      {activeTab === 'projects' && renderProjectsTab()}
      {activeTab === 'competences' && renderCompetencesTab()}
      {activeTab === 'experiences' && renderExperiencesTab()}
    </div>
  );
}