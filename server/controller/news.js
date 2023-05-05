const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWSAPI)

exports.getNews = (req, res) => {
  newsapi.v2.topHeadlines({
    // q: 'cricket',
    category: 'sports',
    country: 'in'
  }).then(response => {
    const articles = response.articles;

    var result=[];
    articles.forEach(news => {
      const article = {
        title: news.title,
        url: news.url
      }
      result.push(article)
    });
    res.status(200).json(result);
  });
};