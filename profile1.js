var connection = require('./../config');
var express=require('express');
//var deasync = require('deasync');
//var Q = require('Q');
var router=express.Router();

function get_data(user_id,callback){
	connection.query("select experience,qualification,specialization,department_name from doctor inner join department on doctor.department_id=department.department_id where user_id_ref=?",[user_id],function(error,result,field){
							if(error){
								return false;
							}
							else{
								//console.log(result);
								return callback(result[0]);
							}
				
					});
}

//user_id will come from session value
module.exports.profile= deasync (function(req,res){
	//var user_id=19;
	if(req.session.user_id){
	var user_id=req.session.user_id;
	var ans;
	var answer;
	connection.query("select user_type,email,phone,age,gender,firstname,lastname from login where user_id=?",[user_id],function(errormain,resultmain,fieldmain){
			if(errormain){res.json({message:"Something went wrong!!"})}
			else{ 

					get_data(user_id, function(result){
									//answer =  result;
									res.json({
									status:true,
									message:resultmain,
									message2:result
					})
							});

			}
		})

	}
	else{
		res.json({message: "Please login."});
	}
})
