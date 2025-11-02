import { createProjetSchema } from '../../src/validators/projet.validator';

describe('Projet Validator - Tests Unitaires', () => {
  
  test('Validation réussie avec des données valides', () => {
    const data = {
      nom: 'Mon Portfolio',
      description: 'Un portfolio moderne',
      technologies: ['React', 'Node.js'],
      dateDebut: '2023-01-01',
      dateFin: '2024-01-01'
    };

    const { error } = createProjetSchema.validate(data);
    expect(error).toBeUndefined();
  });

  test('Échec si nom manquant', () => {
    const data = {
      description: 'Un portfolio moderne',
      technologies: ['React', 'Node.js'],
      dateDebut: '2023-01-01'
    };

    const { error } = createProjetSchema.validate(data);
    expect(error).toBeDefined();
    expect(error?.message).toContain('nom');
  });

  test('Validation réussie sans dateFin (projet en cours)', () => {
    const data = {
      nom: 'Mon Portfolio',
      description: 'Un portfolio moderne',
      technologies: ['React', 'Node.js'],
      dateDebut: '2023-01-01'
    };

    const { error } = createProjetSchema.validate(data);
    expect(error).toBeUndefined();
  });
});
