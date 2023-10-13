import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import axios from 'axios';

import { prismaClient } from './database'

const app = express();
const port = 3000;
require('dotenv').config();
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({extended: true})); 
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/pages'));


app.get('/', async (req, res) => {
  try {
    const [moviesResponse, filmes, desenhos, variedades, esportes] = await Promise.all([
      axios.get('https://api.themoviedb.org/3/movie/popular?api_key=506fadb0256c13349acc05dabebf9604&language=pt-BR&page=1'),
      prismaClient.filmes.findMany(),
      prismaClient.desenhos.findMany(),
      prismaClient.variedades.findMany(),
      prismaClient.esports.findMany(),
    ]);

    const listMovies = moviesResponse.data.results.map((val: any) => {
      const releaseDateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' } as const;
      const formattedDate = new Date(val.release_date).toLocaleDateString('pt-BR', releaseDateOptions);
      
      return {
        id: val._id,
        adult: val.adult,
        backdrop_path: val.backdrop_path,
        overview: val.overview,
        title: val.title,
        poster_path: val.poster_path,
        release_date: formattedDate,
      };
    });

    res.render('home', { listMovies, filmes, desenhos, variedades, esportes });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});

app.get('/filmes/:id', async (req, res) => {
  const slug = req.params.id;

  try {
    const filme = await prismaClient.filmes.findUnique({
      where: {
        id: slug,
      },
    });

    if (filme) {
      res.render('filmes', { filmes: [filme] });
    } else {
      res.status(404).render('404');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});
app.get('/desenho/:id', async (req, res) => {
  const slug = req.params.id;

  try {
    const desenho = await prismaClient.desenhos.findUnique({
      where: {
        id: slug,
      },
    });

    if (desenho) {
      res.render('desenho', { desenhos: [desenho] });
    } else {
      res.status(404).render('404');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});
app.get('/variedades/:id', async (req, res) => {
  const slug = req.params.id;

  try {
    const variedades = await prismaClient.variedades.findUnique({
      where: {
        id: slug,
      },
    });

    if (variedades) {
      res.render('variedades', { variedades: [variedades] });

    } else {
      res.status(404).render('404');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});
app.get('/esportes/:id', async (req, res) => {
  const slug = req.params.id;

  try {
    const esporte = await prismaClient.esports.findUnique({
      where: {
        id: slug,
      },
    });

    if (esporte) {
      res.render('esportes', { esportes: [esporte] });
    } else {
      res.status(404).render('404');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
