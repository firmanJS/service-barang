'use strict';
const models = require('../models');
const redis = require('redis')
const { Offset,Numb } = require('../helpers/pagination')
const client = redis.createClient()
class BarangController {
  
  Show(req,res){
    const page = req.query.page || 1, limit = 12,
    offset = Offset(page, limit), no = Numb(page, limit);
    client.get(`BarangKeyRedis:${page}`, async (err, result) => {
      if(result){
        const resultJSON = JSON.parse(result);
        const param = {
          status:'token match',source:'redis source',
          callback:resultJSON.rows,total:resultJSON.count,
          no:resultJSON.no,pagination:resultJSON.pagination
        }
        res.status(200).json(param)
      }else{
        const resBarang = await models.Barang.findAndCountAll({
          limit: limit,
          offset: offset,
          order: [
            ['id', 'DESC']
          ]
        });
        const totalPage = Math.ceil(resBarang.count / limit),
        pagination = {
          totalPage: totalPage,
          currentPage: page
        };
        resBarang['no'] = no;
        resBarang['pagination'] = pagination;
        client.setex(`BarangKeyRedis:${page}`, 3600, JSON.stringify(resBarang)) // set redis key
        const param = {
          status:'token match',source:'api source',
          callback:resBarang.rows,total:resBarang.count,
          pagination:resBarang.pagination,no:resBarang.no
        }
        res.json(param)
      }
    });
  }

  Create(res,data) {
    models.Barang.create(data).then(() => {
      res.json({msg:'success inserting !'});
    }).catch((err) => {
      res.json({msg:err});
    });
  }

  async Edit(req,res){
    const id = req.params.id;
    res.json({data:await models.Barang.findByPk(id)})
  }

 Update(req,res,id,data){
    models.Barang.findByPk(id).then((bar) => {
      bar.update(data);
      return res.json({msg:'success updated'});
    }).catch((err) => {
      res.json({msg:err.message});
    });
  }
  
 Destroy(req,res,id){
    models.Barang.findByPk(id).then((row) => {
      row.destroy();
      return res.json({message: 'success deleted'});
    }).catch((err) => {
      res.json({message: err.message});
    });
  }

}
module.exports = BarangController
