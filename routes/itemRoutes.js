const express = require('express');
const router = express.Router();
const User = require('../models/user'); 

router.get('/', async (req, res) => {
  try {
    const users = await User.find(); 
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { username, displayName } = req.body; 
    if (!username || !displayName) {
      return res.status(400).json({ error: 'Bad Request' });
    }

    const user = new User({ username, displayName });
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { username, displayName } = req.body; 
    if (!username && !displayName) {
      return res.status(400).json({ error: 'Bad Request' });
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, { username, displayName }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(204).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
