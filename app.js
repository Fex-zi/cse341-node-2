const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy; 
const User = require('./models/user');
const itemRoutes = require('./routes/itemRoutes');  
const authRoutes = require('./routes/authRoutes');  
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
const dotenv = require('dotenv');
dotenv.config();
const router = express.Router();
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Connect to the database
require('./db/connection');

// Configure session
app.use(session({ secret: 'secret-key', resave: true, saveUninitialized: true }));

// Initialize Passport and session
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

const authenticate = (req, res, next) => {
  if (req.url.startsWith('/api-docs')) {
    return next();
  }

  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'Unauthorized' });
};



// POST: Create a new item
router.post('/api/items', authenticate, async (req, res) => {
  // Logic to create a new item
});

// PUT: Update an item
router.put('/api/items/:id', authenticate, async (req, res) => {
  // Logic to update an item
});

// DELETE: Delete an item
router.delete('/api/items/:id', authenticate, async (req, res) => {
  // Logic to delete an item
});

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Define routes
app.use('/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/', router);

// Route to display user info 
app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`<h1>Hello, ${req.user.username}</h1><a href="/auth/logout">Logout</a>`);
  } else {
    res.send('<h1>Home</h1><a href="/auth/github">Login with GitHub</a>');
  }
});



// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
