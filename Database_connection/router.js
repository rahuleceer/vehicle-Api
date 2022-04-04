const res = require('express/lib/response');
const {create, getvehicle, deleteInfo, update,pagination, bulkcreate, login} = require('./controller');
const router = require('express').Router();
const { checkToken } = require("../auth/token_validation");

router.post("/create",checkToken,create);
router.get('/getvehicle',checkToken,getvehicle);
router.delete('/delete',checkToken,deleteInfo);
router.put('/update',checkToken, update);
router.get('/pagination',checkToken,pagination);
router.post('/bulkcreate',checkToken,bulkcreate);
router.post('/login', login)

module.exports= router