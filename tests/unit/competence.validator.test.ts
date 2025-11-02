import { createCompetenceSchema } from '../../src/validators/competence.validator';

describe('Competence Validator - Tests Unitaires', () => {
  
  test('Validation réussie avec des données valides', () => {
    const data = {
      nom: 'JavaScript',
      niveau: 5,
      categorie: '507f1f77bcf86cd799439011'
    };

    const { error } = createCompetenceSchema.validate(data);
    expect(error).toBeUndefined();
  });

  test('Échec si nom manquant', () => {
    const data = {
      niveau: 5,
      categorie: '507f1f77bcf86cd799439011'
    };

    const { error } = createCompetenceSchema.validate(data);
    expect(error).toBeDefined();
    expect(error?.message).toContain('nom');
  });

  test('Échec si niveau invalide (trop petit)', () => {
    const data = {
      nom: 'JavaScript',
      niveau: 0,
      categorie: '507f1f77bcf86cd799439011'
    };

    const { error } = createCompetenceSchema.validate(data);
    expect(error).toBeDefined();
  });

  test('Échec si niveau invalide (trop grand)', () => {
    const data = {
      nom: 'JavaScript',
      niveau: 11,
      categorie: '507f1f77bcf86cd799439011'
    };

    const { error } = createCompetenceSchema.validate(data);
    expect(error).toBeDefined();
  });
});
