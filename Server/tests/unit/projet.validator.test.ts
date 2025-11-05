import { createProjetSchema } from '../../src/validators/projet.validator';

describe('Projet Validator - Tests Unitaires', () => {
  
  test('Validation réussie avec des données valides', () => {
    const data = {
      titre: 'Mon Portfolio',
      description: 'Un portfolio moderne et responsive',
      technologies: ['React', 'Node.js']
    };

    const { error } = createProjetSchema.validate(data);
    expect(error).toBeUndefined();
  });

  test('Échec si titre manquant', () => {
    const data = {
      description: 'Un portfolio moderne et responsive',
      technologies: ['React', 'Node.js']
    };

    const { error } = createProjetSchema.validate(data);
    expect(error).toBeDefined();
    expect(error?.message).toContain('titre');
  });

  test('Échec si technologies manquantes', () => {
    const data = {
      titre: 'Mon Portfolio',
      description: 'Un portfolio moderne et responsive'
    };

    const { error } = createProjetSchema.validate(data);
    expect(error).toBeDefined();
    expect(error?.message).toContain('technologies');
  });
});
