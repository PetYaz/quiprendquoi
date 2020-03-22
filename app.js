const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const axios = require('axios');


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('pwa'));
app.set('view engine', 'pug');

app.get('/', function(req, res) {
  res.render('index', { title: 'coucou', message:'Salut' });
  
});

app.post('/party', function(req, res) {
  console.log(req.body);
  axios
  .post(`${process.env.API_URL}/party`, req.body)
  .then(({ data }) => res.redirect(`/party/${data._id}`))
  .catch((err) => res.send(err));

});

app.get('/party/:id', function(req, res){
  console.log(req.params.id)
  axios
  .get(`${process.env.API_URL}/party/${req.params.id}`)
  .then(({ data }) =>
    res.render('party', {
      party: data,
      title: data.name,
      url: `${process.env.FRONT_URL}:${process.env.PORT}/party/${data._id}`
    }),
  )
  .catch((err) => console.log(err));
 
});

app.post('party/:id', function(req, res) {
  console.log(req.params.id)
  console.log(req.body);
  axios
  .post(`${process.env.API_URL}/party`, req.body)
  .then(({ data }) => res.redirect(`/party/${data._id}`))
  .catch((err) => res.send(err));
})





app.listen(port, () => console.log(`Front app listening on port ${port}!`));





