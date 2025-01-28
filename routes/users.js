/**
 * @api {get} api/users Request User information
 *  
*/
const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate_jwt');
const { getAllUsers } = require('../controllers/users')
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate_fields');
const { createUser } = require('../controllers/users');
const router = Router();

router.get('/', [validateJWT], getAllUsers);

router.post('/create', [
  check('name', 'Name is required').not().isEmpty(),
  check('name', 'Name has bad type').isString(),
  check('email', 'Email is required').not().isEmpty(),
  check('email', 'Email has bad type').isString(),
  check('email', 'Enter a valid email').isEmail(),
  check('password', 'Password is required').not().isEmpty(),
  check('password', 'Password has bad type').isString(),
  validateFields
], createUser);


module.exports = router;