
import { createExperienceSchema, updateExperienceSchema } from '../../src/validators/experience.validator';

describe('Experience Validator', () => {
  describe('createExperienceSchema', () => {
    it('should validate a valid experience', () => {
      const validExperience = {
        poste: 'Développeur Fullstack',
        entreprise: 'Tech Corp',
        description: 'Développement d\'applications web complexes.',
        dateDebut: '2023-01-01',
        dateFin: '2023-12-31',
        lieu: 'Paris',
        type: 'CDI'
      };
      const { error } = createExperienceSchema.validate(validExperience);
      expect(error).toBeUndefined();
    });

    it('should fail if dateFin is before dateDebut', () => {
      const invalidExperience = {
        poste: 'Développeur',
        entreprise: 'Tech Corp',
        description: 'Description longue...',
        dateDebut: '2023-12-31',
        dateFin: '2023-01-01'
      };
      const { error } = createExperienceSchema.validate(invalidExperience);
      expect(error).toBeDefined();
      expect(error?.details[0].message).toBe('La date de fin doit être postérieure à la date de début');
    });
  });

  describe('updateExperienceSchema', () => {
    it('should validate a valid update', () => {
      const validUpdate = {
        poste: 'Senior Dev',
        dateDebut: '2022-01-01',
        dateFin: '2022-12-31'
      };
      const { error } = updateExperienceSchema.validate(validUpdate);
      expect(error).toBeUndefined();
    });

    it('should fail update if dateFin is before dateDebut', () => {
      const invalidUpdate = {
        dateDebut: '2023-12-31',
        dateFin: '2023-01-01'
      };
      const { error } = updateExperienceSchema.validate(invalidUpdate);
      expect(error).toBeDefined();
      expect(error?.details[0].message).toBe('La date de fin doit être postérieure à la date de début');
    });
  });
});
