export interface GameLink {
  _id: string;
  title: string;
  url: string;
  _createdAt: string;
}

export const fetchGameLinks = async (): Promise<GameLink[]> => {
  try {
    const response = await fetch('/api/sanity');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching game links:', error);
    return [];
  }
};