
import { resolvers } from '../../src/resolvers';
import { describe, it, expect, jest, beforeEach } from '@jest/globals';

// Mock Models
const mockProfilFindOne = jest.fn();
const mockProjetFind = jest.fn();
const mockCompetenceFind = jest.fn();
const mockExperienceFind = jest.fn();
const mockUtilisateurFindOne = jest.fn();

jest.mock('../../src/models', () => ({
    __esModule: true,
    Profil: { findOne: mockProfilFindOne },
    Projet: { find: mockProjetFind },
    Competence: { find: mockCompetenceFind },
    Experience: { find: mockExperienceFind },
    Utilisateur: { findOne: mockUtilisateurFindOne },
}));

describe('Resolvers', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Query.getPortfolio', () => {
        it('should return empty portfolio if no user found', async () => {
            mockUtilisateurFindOne.mockResolvedValue(null as any);
            mockProfilFindOne.mockResolvedValue(null as any);

            const result = await resolvers.Query.getPortfolio(null, { username: 'unknown' }, null);

            expect(result.profil.nom).toBe('');
            expect(result.projets).toEqual([]);
        });

        it('should return portfolio for authenticated user if no username provided', async () => {
            const userId = 'user123';
            const mockProfil = {
                utilisateur: userId,
                nom: 'Doe',
                prenom: 'John',
                metier: 'Dev',
                bio: 'Hello',
                photo: 'pic.jpg',
                reseauxSociaux: [],
                localisation: 'Paris'
            };

            mockProfilFindOne.mockResolvedValue(mockProfil as any);
            mockProjetFind.mockReturnValue({ populate: jest.fn().mockReturnValue({ lean: jest.fn().mockResolvedValue([] as any[]) }) } as any);
            mockCompetenceFind.mockReturnValue({ populate: jest.fn().mockReturnValue({ lean: jest.fn().mockResolvedValue([] as any[]) }) } as any);
            mockExperienceFind.mockReturnValue({ lean: jest.fn().mockResolvedValue([] as any[]) } as any);

            const context = { user: { id: userId } };
            const result = await resolvers.Query.getPortfolio(null, {}, context);

            expect(mockProfilFindOne).toHaveBeenCalledWith({ utilisateur: userId });
            expect(result.profil.nom).toBe('Doe');
        });
    });
});
