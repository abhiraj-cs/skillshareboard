const router = require('express').Router();
const Service = require('../models/service.model');
const auth = require('../middleware/auth.middleware'); // Corrected import path

// --- CREATE a new service ---
router.post('/add', auth, async (req, res) => {
  try {
    const { title, description, price } = req.body; // ✅ Added 'price'
    const newService = new Service({
      title,
      description,
      price, // ✅ Added 'price'
      user: req.user.id,
    });

    await newService.save();
    res.status(201).json(newService);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// --- GET all services ---
router.get('/', async (req, res) => {
  try {
    const services = await Service.find().populate('user', 'username');
    res.json(services);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// --- UPDATE a service by ID (Protected) ---  ✅ NEW ROUTE
router.put('/:id', auth, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json('Service not found.');
    }

    // Security check: ensure the logged-in user owns this service
    if (service.user.toString() !== req.user.id) {
      return res.status(401).json('User not authorized.');
    }

    // Update fields from request body
    service.title = req.body.title || service.title;
    service.description = req.body.description || service.description;
    service.price = req.body.price || service.price;

    await service.save();
    res.json(service); // Send back the updated service
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});


// --- DELETE a service by ID (Protected) ---
router.delete('/:id', auth, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json('Service not found.');
    }
    
    // ✅ Security check: ensure the logged-in user owns this service
    if (service.user.toString() !== req.user.id) {
      return res.status(401).json('User not authorized.');
    }

    await service.deleteOne();
    res.json('Service deleted successfully.');

  } catch (err) {
    res.status(500).json('Error: ' + err);
  }
});

module.exports = router;
