import { Article } from "./types";

export const fetchData = async () => {
  try {
    const response = await fetch("/api/newsapi", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || 'Unknown error occurred');
    }

    return result.articles as Article[];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const classifyArticle = async (article: Article) => {
  try {
    const response = await fetch('/api/openai/entityextraction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ article }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || 'Unknown error occurred');
    }

    return result as Article;
  } catch (error) {
    console.error("Error classifying article:", error);
    throw error;
  }
};