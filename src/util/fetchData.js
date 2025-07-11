import { useState } from 'react';

// Generic fetch function
const fetchData = async (url, dataType) => {
  try {
    console.log(`Fetching from:`, url);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
    }

    return response;
  } catch (error) {
    console.error(`Error fetching ${dataType}:`, error.message);
    throw error; // Re-throw to be caught by the calling function
  }
};

export default fetchData;
