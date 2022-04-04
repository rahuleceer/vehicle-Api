const {db,Task}=require('./model')
const { genSaltSync, hashSync, compareSync} = require('bcrypt');
const {sign} = require('jsonwebtoken');

//create vehicle
const create = async function(req,res){
    try{
        await db.sync();
        const salt =genSaltSync(10);
        req.body.password=hashSync(req.body.password, salt);
        //console.log(req.body);
        await Task.create(req.body);
        return res.status(201).json({
            success: 1,
            data: req.body
        })
    }catch(e){
        console.log(e);
        return res.status(500).json({
            success: 0,
            msg: "cannot create the data"
        })
    }
}
//get vehicle by registration id
const getvehicle = async function(req,res){
    try{
        const data= await Task.findAll({
            where :{
                reg_num : req.query.reg_num
            }
        })
        return res.status(200).json({
            success: 1,
            data: data
        })
    }catch(e){
        console.log(e);
        return res.status(500).json({
            success: 0,
            msg: "cannot find the data"
        })
    }
}

//delete the data by registation number
const deleteInfo = async function(req,res){
    try{
        const data= await Task.destroy({
            where :{
                reg_num : req.query.reg_num
            }
        })
        return res.status(202).json({
            success: 1,
            msg: "successfully destroyed"
        })
    }catch(e){
        console.log(e);
        return res.status(500).json({
            success: 0,
            msg: "cannot find the data"
        })
    }
}

//update the name data by registation number
const update = async function(req,res){
    try{
        const data= await Task.findAll({
            where :{
                reg_num : req.query.reg_num
            }
        })
        data.name=req.query.name;
        const data1= await Task.update(data,{
            where :{
                reg_num : req.query.reg_num
            }
        })
        return res.status(200).json({
            success: 1,
            msg: "successfully updated"
        })
    }catch(e){
        console.log(e);
        return res.status(500).json({
            success: 0,
            msg: "cannot find the data"
        })
    }
}

//get vehicle by registration id
const pagination = async function(req,res){
    try{
        const data= await Task.findAll({})
        //console.log(data);
        let limit= req.query.limit;
        let index= req.query.index;
        let results=[];
        for(let i=index; i<data.length && i<index+limit-1; i++){
            results.push(data[i]);
        }
        return res.status(200).json({
            success: 1,
            data: results
        })
    }catch(e){
        console.log(e);
        return res.status(500).json({
            success: 0,
            msg: "getting error in pagination"
        })
    }
}


//bulk create
const bulkcreate = async function(req,res){
    try{
        //console.log(JSON.parse(req.body.bulk));
        await Task.bulkCreate(JSON.parse(req.body.bulk));
        return res.status(200).json({
            success: 1,
            data: req.body
        })
    }catch(e){
        console.log(e);
        return res.status(500).json({
            success: 0,
            msg: "cannot create the bulk data"
        })
    }
}

//login
const login = async function(req,res){
    try{
        const data= await Task.findAll({
            where :{
                username : req.body.username
            }
        })
        console.log(data[0])
        if(!data[0]) return res.json({
            success: 0,
            msg: "invalid username or password"
        })

        const result=compareSync(req.body.password,data[0].password);
        if(result){
            result.password=undefined; //because i don't want to show the password to user
            const jsontoken= sign({result: data[0]}, "qwe1234",{
                expiresIn: "1h"
            });
            return res.status(200).json({
                success: 1,
                data: data[0],
                token: jsontoken
            })
        }else{
            return res.json({
                success: 0,
                msg: "invalid username or password"
            })
        }
    }catch(e){
        console.log(e);
        return res.json({
            success: 0,
            msg: "invalid username or password"
        })
    }
}

module.exports= {
    create,
    getvehicle,
    deleteInfo,
    update,
    pagination,
    bulkcreate,
    login
}