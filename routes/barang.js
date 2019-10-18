var express = require('express');
const Barang = require('../controllers/BarangController');
const check = require('../helpers/TokenValidaton')
const bar = new Barang()
var router = express.Router();

router.get('/barang',check.verifyToken,check.verifyAuthorizationView,bar.Show);
router.get('/barang/:id',check.verifyToken,check.verifyAuthorizationEdit,bar.Edit);
router.patch('/barang/:id',check.verifyToken,check.verifyAuthorizationEdit,check.RedisAutoFlush,(req,res) =>{
  bar.Update(req,res,req.params.id,JSON.parse(JSON.stringify(req.body)))
});
router.post('/barang',check.verifyToken,check.verifyAuthorizationSave,check.RedisAutoFlush,(req,res) => {
  bar.Create(res,JSON.parse(JSON.stringify(req.body)))
});
router.delete('/barang/:id',check.verifyToken,check.verifyAuthorizationDelete,check.RedisAutoFlush,(req,res) => {
  bar.Destroy(req,res,req.params.id)
});
module.exports = router;
