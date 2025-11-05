import Joi from 'joi';

/**
 * Schéma de validation pour la création d'une compétence
 */
export const createCompetenceSchema = Joi.object({
  nom: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.base': 'Le nom doit être une chaîne de caractères',
      'string.empty': 'Le nom ne peut pas être vide',
      'string.min': 'Le nom doit contenir au moins 2 caractères',
      'string.max': 'Le nom ne peut pas dépasser 50 caractères',
      'any.required': 'Le nom est obligatoire'
    }),

  niveau: Joi.number()
    .integer()
    .min(1)
    .max(5)
    .required()
    .messages({
      'number.base': 'Le niveau doit être un nombre',
      'number.integer': 'Le niveau doit être un nombre entier',
      'number.min': 'Le niveau doit être au minimum 1',
      'number.max': 'Le niveau doit être au maximum 5',
      'any.required': 'Le niveau est obligatoire'
    }),

  categorie: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'string.pattern.base': 'La catégorie doit être un ID MongoDB valide',
      'any.required': 'La catégorie est obligatoire'
    }),

  description: Joi.string()
    .min(10)
    .max(500)
    .optional()
    .allow('', null)
    .messages({
      'string.base': 'La description doit être une chaîne de caractères',
      'string.min': 'La description doit contenir au moins 10 caractères',
      'string.max': 'La description ne peut pas dépasser 500 caractères'
    }),

  icone: Joi.string()
    .uri()
    .optional()
    .allow('', null)
    .messages({
      'string.uri': 'L\'icône doit être une URL valide'
    })
});

/**
 * Schéma de validation pour la mise à jour d'une compétence
 */
export const updateCompetenceSchema = Joi.object({
  nom: Joi.string()
    .min(2)
    .max(50)
    .optional()
    .messages({
      'string.base': 'Le nom doit être une chaîne de caractères',
      'string.min': 'Le nom doit contenir au moins 2 caractères',
      'string.max': 'Le nom ne peut pas dépasser 50 caractères'
    }),

  niveau: Joi.number()
    .integer()
    .min(1)
    .max(5)
    .optional()
    .messages({
      'number.base': 'Le niveau doit être un nombre',
      'number.integer': 'Le niveau doit être un nombre entier',
      'number.min': 'Le niveau doit être au minimum 1',
      'number.max': 'Le niveau doit être au maximum 5'
    }),

  categorie: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .optional()
    .messages({
      'string.pattern.base': 'La catégorie doit être un ID MongoDB valide'
    }),

  description: Joi.string()
    .min(10)
    .max(500)
    .optional()
    .allow('', null)
    .messages({
      'string.base': 'La description doit être une chaîne de caractères',
      'string.min': 'La description doit contenir au moins 10 caractères',
      'string.max': 'La description ne peut pas dépasser 500 caractères'
    }),

  icone: Joi.string()
    .uri()
    .optional()
    .allow('', null)
    .messages({
      'string.uri': 'L\'icône doit être une URL valide'
    })
}).min(1).messages({
  'object.min': 'Au moins un champ doit être fourni pour la mise à jour'
});

/**
 * Schéma de validation pour l'ID d'une compétence
 */
export const competenceIdSchema = Joi.string()
  .regex(/^[0-9a-fA-F]{24}$/)
  .required()
  .messages({
    'string.pattern.base': 'L\'ID de la compétence doit être un ID MongoDB valide',
    'any.required': 'L\'ID de la compétence est obligatoire'
  });
