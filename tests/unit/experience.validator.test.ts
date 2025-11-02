import { createExperienceSchema } from '../../src/validators/experience.validator';

describe('Experience Validator - Tests Unitaires', () => {
  
  test('Validation réussie avec des données valides', () => {
    const data = {
      titre: 'Développeur Web',
      entreprise: 'Tech Corp',
      description: 'Développement d\'applications web',
      dateDebut: '2023-01-01',
      dateFin: '2024-01-01'
    };

    const { error } = createExperienceSchema.validate(data);
    expect(error).toBeUndefined();
  });

  test('Échec si titre manquant', () => {
    const data = {
      entreprise: 'Tech Corp',
      description: 'Développement d\'applications web',
      dateDebut: '2023-01-01'
    };

    const { error } = createExperienceSchema.validate(data);
    expect(error).toBeDefined();
    expect(error?.message).toContain('titre');
  });

  test('Validation réussie sans dateFin (poste actuel)', () => {
    const data = {
      titre: 'Développeur Web',
      entreprise: 'Tech Corp',
      description: 'Développement d\'applications web',
      dateDebut: '2023-01-01'
    };

    const { error } = createExperienceSchema.validate(data);
    expect(error).toBeUndefined();
  });
});
