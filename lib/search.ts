import Fuse from 'fuse.js';
import { GameLink } from './sanity';

const fuseOptions = {
  keys: ['title'],
  threshold: 0.4, // More fuzzy matching
  ignoreLocation: true,
  includeScore: true,
};

export const searchLinks = (links: GameLink[], query: string): GameLink[] => {
  if (!query.trim()) return links;
  
  // Fuzzy search with Fuse.js
  const fuse = new Fuse(links, fuseOptions);
  const fuseResults = fuse.search(query).map(result => result.item);
  
  // Simple substring search for exact matches
  const substringResults = links.filter(link => 
    link.title.toLowerCase().includes(query.toLowerCase())
  );
  
  // Combine and deduplicate results, prioritizing substring matches
  const combinedResults = [
    ...substringResults,
    ...fuseResults.filter(fuzzyResult => 
      !substringResults.some(subResult => subResult._id === fuzzyResult._id)
    )
  ];
  
  return combinedResults;
};