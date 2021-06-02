/*
    Rutas de usuario / auth
    host + /api/auth
*/


const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const router = Router();
const { createUser, loginUser, revalidateToken } = require('../controllers/auth');
const { validateJWB } = require('../middlewares/validate-jwt');


router.post(
    '/register',
    [//middlewares
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        check('password','El password debe de ser de 6 caracteres').isLength({min:6}),
        validateFields
    ], 
    createUser
);

router.post(
    '/',
    [//middlewares
        check('email','El email es obligatorio').isEmail(),
        check('password','El password debe de ser de 6 caracteres').isLength({min:6}),
        validateFields
    ],
    loginUser
);

router.get('/renew', validateJWB ,revalidateToken);

module.exports = router;