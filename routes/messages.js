/**
 * @api {get} api/messages Request Message information
 *  
*/
const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate_jwt');
const { getAllMessages } = require('../controllers/messages');
const router = Router();

// router.get('/', [validateJWT], getAllMessages);
router.get('/:from', [validateJWT], getAllMessages);

module.exports = router;