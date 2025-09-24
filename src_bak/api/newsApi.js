const NEWSAPI_KEY = process.env.REACT_APP_NEWSAPI_KEY;
const CURRENTS_KEY = process.env.REACT_APP_CURRENTSAPI_KEY;


export const fetchNewsAPI = async (limit = 15) => {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?category=technology&pageSize=${limit}&apiKey=${NEWSAPI_KEY}`
    );
    const data = await res.json();
    return data.articles.map(article => ({
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.urlToImage,
    }));
  } catch (err) {
    console.error('NewsAPI error:', err);
    return [];
  }
};

export const fetchCurrentsAPI = async (limit = 15) => {
  try {
    const res = await fetch(
      `https://api.currentsapi.services/v1/latest-news?category=technology&pageSize=${limit}&apiKey=${CURRENTS_KEY}`
    );
    const data = await res.json();
    return data.news.map(article => ({
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.image,
    }));
  } catch (err) {
    console.error('CurrentsAPI error:', err);
    return [];
  }
};



