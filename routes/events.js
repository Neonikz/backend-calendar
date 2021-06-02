const { validateJWB } = require('../middlewares/validate-jwt');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const { Router } = require('express');
const { getEvent, createEvent, actEvent, deleteEvent} = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const router = Router();

router.use(validateJWB);

/*
    Event Routes
    /api/events
*/


//Obtener eventos
router.get('/' ,getEvent);

//Crear eventos
router.post(
    '/' ,
    [
        check( 'title', 'El titulo es obligatorio').not().isEmpty(),
        check( 'start', 'La fecha de inicio es obligatoria').custom( isDate ),
        check( 'end', 'La fecha de finalizacion es obligatoria').custom( isDate ),
        validateFields
    ],
    createEvent
);


//Actualiazar eventos
router.put(
    '/:id',
    [
        check( 'title', 'El titulo es obligatorio').not().isEmpty(),
        check( 'start', 'La fecha de inicio es obligatoria').custom( isDate ),
        check( 'end', 'La fecha de finalizacion es obligatoria').custom( isDate ),
        validateFields
    ],
    actEvent
);


//Borrar eventos
router.delete('/:id' ,deleteEvent);


module.exports = router;
