var express = require('express');
const Barang = require('../controllers/BarangController');
const check = require('../helpers/TokenValidaton')
const bar = new Barang()
var router = express.Router();

/* GET users listing. */
router.get('/barang',check.verifyToken,check.verifyAuthorization,bar.Show);
//router.post('/barang',check.verifyAuthorization,check.verifyToken,bar.Create);
router.get('/test',(req,res) => {
  res.json({'msg':'helo'});
});

module.exports = router;
