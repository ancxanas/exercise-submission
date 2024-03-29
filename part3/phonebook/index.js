require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const Person = require('./models/person');

app.use(express.static('build'));
app.use(cors());
app.use(express.json());

morgan.token('body', (request) => JSON.stringify(request.body));
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :body -'
  )
);

app.get('/info', (request, response) => {
  const timeStamp = new Date().toString();

  Person.estimatedDocumentCount((error, count) => {
    if (error) {
      console.log(error);
    } else {
      response.send(
        '<p>' +
          `Phonebook has info for ${count} people` +
          '<p>' +
          `${timeStamp}`
      );
    }
  });
});

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => response.json(persons));
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(400).end();
      }
    })
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body;

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    {
      new: true,
      runValidators: true,
      context: 'query',
    }
  )
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.post('/api/persons', (request, response, next) => {
  const body = request.body;

  Person.find({}).then((people) => {
    console.log(people.find((person) => person.name === body.name));

    if (people.find((person) => person.name === body.name)) {
      console.log('name must be unique');
      return response.status(400).json({ error: 'name must be unique' });
    } else {
      const person = new Person({
        name: body.name,
        number: body.number,
      });

      person
        .save()
        .then((savedPerson) => response.json(savedPerson))
        .catch((error) => next(error));
    }
  });
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
