const { Router } = require('express');
const { createUser, loginUser, refresh } = require('../controllers/authentication');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate_fields');
const { validateJWT } = require('../middlewares/validate_jwt');
const router = Router();
/**
 * /api/login
 */
router.post('/new', [
  check('name', 'Name is required').not().isEmpty(),
  check('name', 'Name has bad type').isString(),
  check('email', 'Email is required').not().isEmpty(),
  check('email', 'Email has bad type').isString(),
  check('email', 'Enter a valid email').isEmail(),
  check('password', 'Password is required').not().isEmpty(),
  check('password', 'Password has bad type').isString(),
  validateFields
], createUser);

router.post('/', [
  check('email', 'Email is required').not().isEmpty(),
  check('email', 'Email has bad type').isString(),
  check('email', 'Enter a valid email').isEmail(),
  check('password', 'Password is required').not().isEmpty(),
  check('password', 'Password has bad type').isString(),
  validateFields
], loginUser);

router.get('/refresh', [
  validateJWT
], refresh);



module.exports = router;