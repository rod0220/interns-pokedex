import axios from 'axios';
import { config } from '../config/index.js';

// Get the base URL from config
const { baseUrl: BASE_URL } = config.pokeapi;

/**
 * Fetch a paginated list of all Pokemon
 * @param {number} limit - Number of Pokemon to fetch
 * @param {number} offset - Starting position
 * @returns {Promise<Object>} - List of Pokemon with count
 */
export const getAllPokemon = async (limit = 20, offset = 0) => {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon`, {
      params: { limit, offset }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch Pokemon list: ${error.message}`);
  }
};

/**
 * Fetch a single Pokemon by name or ID
 * @param {string|number} nameOrId - Pokemon name or ID
 * @returns {Promise<Object|null>} - Pokemon data or null if not found
 */
export const getPokemonByNameOrId = async (nameOrId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/pokemon/${nameOrId.toString().toLowerCase()}`
    );
    return response.data;
  } catch (error) {
    // Return null for 404 (not found) instead of throwing
    if (error.response && error.response.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch Pokemon: ${error.message}`);
  }
};

/**
 * Fetch Pokemon species data (for descriptions)
 * @param {string|number} nameOrId - Pokemon name or ID
 * @returns {Promise<Object|null>} - Species data or null if not found
 */
export const getPokemonSpecies = async (nameOrId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/pokemon-species/${nameOrId.toString().toLowerCase()}`
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch Pokemon species: ${error.message}`);
  }
};