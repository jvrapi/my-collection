import axios from 'axios';

const baseURL = process.env.SCRYFALL_API_URL as string;

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});
