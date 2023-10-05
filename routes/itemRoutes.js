const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST a new item
router.post('/', async (req, res) => {
  try {
    const { name, quantity } = req.body;
    if (!name || !quantity) {
      return res.status(400).json({ error: 'Bad Request' });
    }

    const item = new Item({ name, quantity });
    await item.save();

    res.status(201).json({ message: 'Item created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { name, quantity } = req.body;
    if (!name && !quantity) {
      return res.status(400).json({ error: 'Bad Request' });
    }

    const updatedItem = await Item.findByIdAndUpdate(req.params.id, { name, quantity }, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.status(200).json({ message: 'Item updated successfully', updatedItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.status(204).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
