const router = require('express').Router();
let Request = require('../models/request.model');
const auth = require('../middleware/auth.middleware'); // Import the auth middleware

// ROUTE 1: Get all requests (Public)
router.get('/', async (req, res) => {
  try {
    const requests = await Request.find().populate('user', 'username');
    res.json(requests);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// ROUTE 2: Add a new request (Protected)
router.post('/add', auth, async (req, res) => {
  try {
    const { title, description, budget } = req.body;

    const newRequest = new Request({
      title,
      description,
      budget,
      user: req.user.id, // Get user ID from the authenticated token
    });

    await newRequest.save();
    res.status(201).json('Request added!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// ... (keep the existing GET and POST routes at the top)

// ROUTE 3: Delete a request (Protected) ✅ NEW ROUTE
router.delete('/:id', auth, async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json('Request not found.');
    }

    // Security check: ensure the logged-in user is the owner
    if (request.user.toString() !== req.user.id) {
      return res.status(401).json('User not authorized.');
    }

    await request.deleteOne();
    res.json('Request deleted successfully.');

  } catch (err) {
    res.status(500).json('Error: ' + err);
  }
});

// ... (keep the existing GET, POST, and DELETE routes)

// ROUTE 4: Update a request (Protected) ✅ NEW ROUTE
router.put('/:id', auth, async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json('Request not found.');
    }

    // Security check: ensure the logged-in user is the owner
    if (request.user.toString() !== req.user.id) {
      return res.status(401).json('User not authorized.');
    }

    // Update fields from request body
    request.title = req.body.title || request.title;
    request.description = req.body.description || request.description;
    request.budget = req.body.budget || request.budget;

    await request.save();
    res.json(request); // Send back the updated request

  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

module.exports = router;
