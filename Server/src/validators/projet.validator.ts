import Joi from 'joi';

/**
 * Schéma de validation pour la création d'un projet
 */
export const createProjetSchema = Joi.object({
  titre: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.base': 'Le titre doit être une chaîne de caractères',
      'string.empty': 'Le titre ne peut pas être vide',
      'string.min': 'Le titre doit contenir au moins 3 caractères',
      'string.max': 'Le titre ne peut pas dépasser 100 caractères',
      'any.required': 'Le titre est obligatoire'
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

  technologies: Joi.array()
    .items(Joi.string())
    .min(1)
    .required()
    .messages({
      'array.base': 'Les technologies doivent être un tableau',
      'array.min': 'Au moins une technologie est requise',
      'any.required': 'Les technologies sont obligatoires'
    }),

  lienGithub: Joi.string()
    .uri()
    .allow('', null)
    .optional()
    .messages({
      'string.uri': 'Le lien GitHub doit être une URL valide'
    }),

  lienDemo: Joi.string()
    .uri()
    .allow('', null)
    .optional()
    .messages({
      'string.uri': 'Le lien démo doit être une URL valide'
    }),

  images: Joi.array()
    .items(Joi.string().uri())
    .optional()
    .messages({
      'array.base': 'Les images doivent être un tableau',
      'string.uri': 'Chaque image doit être une URL valide'
    }),

  competences: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional()
    .messages({
      'array.base': 'Les compétences doivent être un tableau',
      'string.pattern.base': 'Chaque compétence doit être un ID MongoDB valide'
    })
});

/**
 * Schéma de validation pour la mise à jour d'un projet
 */
export const updateProjetSchema = Joi.object({
  titre: Joi.string()
    .min(3)
    .max(100)
    .optional()
    .messages({
      'string.base': 'Le titre doit être une chaîne de caractères',
      'string.min': 'Le titre doit contenir au moins 3 caractères',
      'string.max': 'Le titre ne peut pas dépasser 100 caractères'
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

  technologies: Joi.array()
    .items(Joi.string())
    .min(1)
    .optional()
    .messages({
      'array.base': 'Les technologies doivent être un tableau',
      'array.min': 'Au moins une technologie est requise'
    }),

  lienGithub: Joi.string()
    .uri()
    .allow('', null)
    .optional()
    .messages({
      'string.uri': 'Le lien GitHub doit être une URL valide'
    }),

  lienDemo: Joi.string()
    .uri()
    .allow('', null)
    .optional()
    .messages({
      'string.uri': 'Le lien démo doit être une URL valide'
    }),

  images: Joi.array()
    .items(Joi.string().uri())
    .optional()
    .messages({
      'array.base': 'Les images doivent être un tableau',
      'string.uri': 'Chaque image doit être une URL valide'
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
});

/**
 * Schéma de validation pour l'ID d'un projet
 */
export const projetIdSchema = Joi.string()
  .regex(/^[0-9a-fA-F]{24}$/)
  .required()
  .messages({
    'string.pattern.base': 'L\'ID du projet doit être un ID MongoDB valide',
    'any.required': 'L\'ID du projet est obligatoire'
  });
