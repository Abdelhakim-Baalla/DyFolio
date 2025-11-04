import Joi from 'joi';

/**
 * Schéma de validation pour la création d'une expérience
 */
export const createExperienceSchema = Joi.object({
  poste: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.base': 'Le poste doit être une chaîne de caractères',
      'string.empty': 'Le poste ne peut pas être vide',
      'string.min': 'Le poste doit contenir au moins 3 caractères',
      'string.max': 'Le poste ne peut pas dépasser 100 caractères',
      'any.required': 'Le poste est obligatoire'
    }),

  entreprise: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.base': 'L\'entreprise doit être une chaîne de caractères',
      'string.empty': 'L\'entreprise ne peut pas être vide',
      'string.min': 'L\'entreprise doit contenir au moins 2 caractères',
      'string.max': 'L\'entreprise ne peut pas dépasser 100 caractères',
      'any.required': 'L\'entreprise est obligatoire'
    }),

  description: Joi.string()
    .min(10)
    .max(2000)
    .required()
    .messages({
      'string.base': 'La description doit être une chaîne de caractères',
      'string.empty': 'La description ne peut pas être vide',
      'string.min': 'La description doit contenir au moins 10 caractères',
      'string.max': 'La description ne peut pas dépasser 2000 caractères',
      'any.required': 'La description est obligatoire'
    }),

  dateDebut: Joi.string()
    .isoDate()
    .optional()
    .messages({
      'string.isoDate': 'La date de début doit être au format ISO 8601 (ex: 2024-01-01)'
    }),

  dateFin: Joi.string()
    .isoDate()
    .optional()
    .allow(null)
    .messages({
      'string.isoDate': 'La date de fin doit être au format ISO 8601 (ex: 2024-12-31)'
    }),

  lieu: Joi.string()
    .min(2)
    .max(100)
    .optional()
    .allow('', null)
    .messages({
      'string.base': 'Le lieu doit être une chaîne de caractères',
      'string.min': 'Le lieu doit contenir au moins 2 caractères',
      'string.max': 'Le lieu ne peut pas dépasser 100 caractères'
    }),

  type: Joi.string()
    .valid('CDI', 'CDD', 'Stage', 'Freelance', 'Alternance')
    .optional()
    .messages({
      'any.only': 'Le type doit être: CDI, CDD, Stage, Freelance ou Alternance'
    }),

  competences: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional()
    .messages({
      'array.base': 'Les compétences doivent être un tableau',
      'string.pattern.base': 'Chaque compétence doit être un ID MongoDB valide'
    })
}).custom((value, helpers) => {
  // Validation personnalisée: dateFin doit être après dateDebut
  if (value.dateDebut && value.dateFin) {
    const debut = new Date(value.dateDebut);
    const fin = new Date(value.dateFin);
    if (fin <= debut) {
      return helpers.error('any.custom', { 
        message: 'La date de fin doit être postérieure à la date de début' 
      });
    }
  }
  return value;
});

/**
 * Schéma de validation pour la mise à jour d'une expérience
 */
export const updateExperienceSchema = Joi.object({
  poste: Joi.string()
    .min(3)
    .max(100)
    .optional()
    .messages({
      'string.base': 'Le poste doit être une chaîne de caractères',
      'string.min': 'Le poste doit contenir au moins 3 caractères',
      'string.max': 'Le poste ne peut pas dépasser 100 caractères'
    }),

  entreprise: Joi.string()
    .min(2)
    .max(100)
    .optional()
    .messages({
      'string.base': 'L\'entreprise doit être une chaîne de caractères',
      'string.min': 'L\'entreprise doit contenir au moins 2 caractères',
      'string.max': 'L\'entreprise ne peut pas dépasser 100 caractères'
    }),

  description: Joi.string()
    .min(10)
    .max(2000)
    .optional()
    .messages({
      'string.base': 'La description doit être une chaîne de caractères',
      'string.min': 'La description doit contenir au moins 10 caractères',
      'string.max': 'La description ne peut pas dépasser 2000 caractères'
    }),

  dateDebut: Joi.string()
    .isoDate()
    .optional()
    .messages({
      'string.isoDate': 'La date de début doit être au format ISO 8601 (ex: 2024-01-01)'
    }),

  dateFin: Joi.string()
    .isoDate()
    .optional()
    .allow(null)
    .messages({
      'string.isoDate': 'La date de fin doit être au format ISO 8601 (ex: 2024-12-31)'
    }),

  lieu: Joi.string()
    .min(2)
    .max(100)
    .optional()
    .allow('', null)
    .messages({
      'string.base': 'Le lieu doit être une chaîne de caractères',
      'string.min': 'Le lieu doit contenir au moins 2 caractères',
      'string.max': 'Le lieu ne peut pas dépasser 100 caractères'
    }),

  type: Joi.string()
    .valid('CDI', 'CDD', 'Stage', 'Freelance', 'Alternance')
    .optional()
    .messages({
      'any.only': 'Le type doit être: CDI, CDD, Stage, Freelance ou Alternance'
    }),

  competences: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional()
    .messages({
      'array.base': 'Les compétences doivent être un tableau',
      'string.pattern.base': 'Chaque compétence doit être un ID MongoDB valide'
    })
}).min(1).messages({
  'object.min': 'Au moins un champ doit être fourni pour la mise à jour'
}).custom((value, helpers) => {
  // Validation personnalisée: dateFin doit être après dateDebut
  if (value.dateDebut && value.dateFin) {
    const debut = new Date(value.dateDebut);
    const fin = new Date(value.dateFin);
    if (fin <= debut) {
      return helpers.error('any.custom', { 
        message: 'La date de fin doit être postérieure à la date de début' 
      });
    }
  }
  return value;
});

/**
 * Schéma de validation pour l'ID d'une expérience
 */
export const experienceIdSchema = Joi.string()
  .regex(/^[0-9a-fA-F]{24}$/)
  .required()
  .messages({
    'string.pattern.base': 'L\'ID de l\'expérience doit être un ID MongoDB valide',
    'any.required': 'L\'ID de l\'expérience est obligatoire'
  });
