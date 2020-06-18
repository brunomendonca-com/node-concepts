const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require( "uuidv4" );

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function validateUuid(request, response, next) {
  const { id } = request.params;

  if ( !isUuid( id ) ) {
    return response.status(400).json({error: "Invalid repository ID."})
  }

  return next();
};

app.use('/repositories/:id', validateUuid)

app.get("/repositories", (request, response) => {
  // TODO
  return response.json( repositories );
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;

  const repo = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push( repo );

  return response.json( repo );
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repoIndex = repositories.findIndex( repo => repo.id === id );

  if ( repoIndex < 0 ) {
    return response.status(400).json({message: "Repository not found."})
  };

  const { likes } = repositories[repoIndex];

  const edittedRepo = { id, title, url, techs, likes };

  repositories[ repoIndex ] = edittedRepo;

  return response.json( edittedRepo );

});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;

  const repoIndex = repositories.findIndex( repo => repo.id === id );

  if ( repoIndex < 0 ) {
    return response.status(400).json({message: "Repository not found."})
  };

  repositories.splice( repoIndex, 1 );

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;

  const repoIndex = repositories.findIndex((repo) => repo.id === id);

  if (repoIndex < 0) {
    return response.status(400).json({ message: "Repository not found." });
  }

  const { title, url, techs } = repositories[repoIndex];
  let { likes } = repositories[repoIndex];

  likes = likes + 1;

  const edittedRepo = { id, title, url, techs, likes };

  repositories[repoIndex] = edittedRepo;

  return response.json(edittedRepo);
});

module.exports = app;
