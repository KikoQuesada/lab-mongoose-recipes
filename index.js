const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
//ITERATION 2:
    const cubanRice = {
      title: 'Cuban Rice',
      level: 'Easy Peasy',
      ingredients: ['rice', 'fried tomato', 'eggs', 'banana'],
      cuisine: 'Spanish',
      dishType: 'main_course',
      image: 'https://recetasdecocina.elmundo.es/wp-content/uploads/2016/11/receta-arroz-a-la-cubana.jpg',
      duration: 20,
      creator: 'Kiko',
    };
    Recipe.create(cubanRice)
      .then(recipe => console.log(`The recipe ${recipe.title} was created`))
      .catch(error => console.error(error));

//ITERATION 3:
      Recipe.insertMany(data)
        .then(recipes =>{
          recipes.forEach(recipe => {
            console.log(`The recipe ${recipe.title} was created`)
          })
        })
        .catch(error => console.error(error));

        
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
