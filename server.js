// server.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// Sample data
let articles = [
    {
        "author": "abc-news",
        "title": '\'Totally disgraced: Trump lashes out at 2024 rivals, possible indictment at Waco campaign rally',
        "source": 'abcnews.go.com',
        "name": "ABC News",
        "description": "Former President Donald Trump addressed his supporters in Texas on Saturday as he faces a possible indictment.\"If we don't win this next election, 2024, I truly believe our country is doomed,\" Trump said. \"I think it's doomed.",
        "url": "https://abcnews.go.com",
        "image": 'https://s.abcnews.com/images/Politics/trump-waco-rally-5-ap-gmh-230325_1679788989755_hpMain_16x9_992.jpg',
        "category": "general",
        "language": "en",
        "country": "us"
      },
      {
          "author": "ktvu.com",
          "title": "Elon Musk tells employees to get back in office with 2:30 am memo",
          "description": "Reportedly sent a notice to staff early Wednesday morning to remind them that working from home is not acceptable. According to Platformer managing editor Zoë Schiffer, Musk emailed employees at 2:30 in the morning, writing that \"office is not optional.\" In t…",
          "url": "https://biztoc.com/x/c2ba83b8779bd800",
          "image": "https://cdn.motor1.com/images/mgl/wllWOo/s1/elon-musk-photo.webp",
          "source": 'biztoc.com',
          "publishedAt": "2023-03-26T02:04:11Z",
          "content": "reportedly sent a notice to staff early Wednesday morning to remind them that working from home is not acceptable.According to Platformer managing editor Zoë Schiffer, Musk emailed employees at 2:30 … [+318 chars]"
      },
      {
          "author": "Michelle Lewis",
          "title": "This award-winning apartment heat pump can fit under a kitchen sink",
          "description": "Swedish heat pump maker Qvantum has debuted an award-winning apartment heat pump that’s so compact, it can fit under a kitchen sink.\n more…\nThe post This award-winning apartment heat pump can fit under a kitchen sink appeared first on Electrek.",
          "url": "https://electrek.co/2023/03/25/award-winning-apartment-heat-pump/",
          "source": 'electrek.co',
          "image": "https://i0.wp.com/electrek.co/wp-content/uploads/sites/3/2023/03/apartment-heat-pump-qvantum.jpg?resize=1200%2C628&quality=82&strip=all&ssl=1",
          "publishedAt": "2023-03-25T20:48:21Z",
          "content": "Swedish heat pump maker Qvantum has debuted an award-winning apartment heat pump that’s so compact, it can fit under a kitchen sink.\r\nLimhamn, Sweden-based Qvantum’s new QG apartment heat pump, which… [+2573 chars]"
      },
  
      {
          "author": "Je chau timi chau",
          "title": "Swopna Suman X Samir Shrestha",
          "description": "Lyrics/Composition : Swoopna suman Vocals : Samir Shrestha & Swoopna Suman Produced/Mixed/Mastered by : Saswot Shrestha Recorded at : Omniphonix Studio, Balaju Project Managed by : Rashik Bhattarai ( Garage Entertainment) Video by : Stellar Studios Direction/DOP : Nayan Rai VFX/edit : Ashok Adhikari Colorist : Anjon Limbu Production Manager : Nisim Gorkhali",
          "url": "https://youtu.be/_Tk9_kPpO1U",
          "source": 'YouTube.com',
          "image":"https://i.ytimg.com/vi/_Tk9_kPpO1U/maxresdefault.jpg",
          "publishedAt": "2023-03-25T20:48:21Z",
      }  
];

// GET all articles
app.get('/', (req, res) => {
  res.send('Welcome to the News API. Use /api/articles for fetching articles.');
});



// GET a specific article by ID
app.get('/api/articles/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const article = articles.find((article) => article.id === id);

  if (!article) {
    res.status(404).json({ message: 'Article not found' });
  } else {
    res.json(article);
  }
});

// POST a new article
app.post('/api/articles', (req, res) => {
  const newArticle = {
    id: articles.length + 1,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  };

  articles.push(newArticle);
  res.status(201).json(newArticle);
});

// PUT (update) an existing article
app.put('/api/articles/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const articleIndex = articles.findIndex((article) => article.id === id);

  if (articleIndex === -1) {
    res.status(404).json({ message: 'Article not found' });
  } else {
    const updatedArticle = {
      id,
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
    };

    articles[articleIndex] = updatedArticle;
    res.json(updatedArticle);
  }
});

// DELETE an article
app.delete('/api/articles/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const articleIndex = articles.findIndex((article) => article.id === id);

  if (articleIndex === -1) {
    res.status(404).json({ message: 'Article not found' });
  } else {
    articles.splice(articleIndex, 1);
    res.status(204).json({ message: 'Article deleted' });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port http://localhost:${PORT}`);
});
