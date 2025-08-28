import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // Token opcional para acessar dados privados
  withCredentials: true, // Permite enviar credenciais com as requisições
});

export interface GameLink {
  _id: string;
  title: string;
  url: string;
  _createdAt: string;
}

export const fetchGameLinks = async (): Promise<GameLink[]> => {
  try {
    const query = `*[_type == "gameLink"] | order(title asc) {
      _id,
      title,
      url,
      _createdAt
    }`;
    return await client.fetch(query);
  } catch (error) {
    console.error('Error fetching game links:', error);
    return [];
  }
};