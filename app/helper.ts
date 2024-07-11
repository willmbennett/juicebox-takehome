export const fetchData = async () => {
  const response = await fetch("/api/newsapi", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  return data
};

export const classifyArticle = async (article: any) => {
  const response = await fetch('/api/openai/entityextraction', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ article }),
  });

  const data = await response.json();
  return data;
};