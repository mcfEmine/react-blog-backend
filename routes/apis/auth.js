const express = require('express');

const validator = require('../../validator');
const {getProfile,registerProfile, login, deleteUser} = require('../../controllers/auth');
const router = express.Router();
router.get('/user', getProfile);

router.post('/register', registerProfile);

router.post('/login', login);
router.delete('/delete/:id', deleteUser);

module.exports = router;
