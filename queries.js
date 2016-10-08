var promise = require('bluebird');
var options = {
	promiseLib: promise
};
var pgp = require('pg-promise')(options);

// De elephantSQL
var connectionString = 'postgres://lyujkhab:muizBDuZHtX2mYjACgXbb66Cw59T2xNw@elmer.db.elephantsql.com:5432/lyujkhab';
var db = pgp(connectionString);

function getAllRestaurants (req, res, next) {
	// retorna lo que encuentre o si no encuentra
	db.any('select * from restaurant')
		.then(function(data){
			res.status(200)
			.json({
				status: 'Exitoso',
				data: data,
				message: 'Recuperados todos los restaurantes'
			});
		})
		.catch(function(err){
			return next(err);
		});
};

function getRestaurantByName (req, res, next) {
	var name = req.params.name;
	db.any('select * from restaurant where name = $1', name)
		.then(function(data){
			res.status(200)
			.json({
				status: 'Exitoso',
				data: data,
				message: 'Recuperados restaurantes por nombre'
			});
		})
		.catch(function(err){
			return next(err);
		});
};

function createRestaurant (req, res, next) {
	// none es que no va a retornar nada
	db.none('insert into restaurant(name, city, address, phone)' + 'values($1, $2, $3, $4)',
			[req.body.name, req.body.city, req.body.address, parseInt(req.body.phone)])
		.then(function(){
			res.status(200)
			.json({
				status: 'Exitoso',
				message: 'Insertado restaurante'
			});
		})
		.catch(function(err){
			return next(err);
		});
};

function removeRestaurant (req, res, next) {
	var restaurantId = parseInt(req.params.id);
	// Espera el resultado de la operacion
	db.result('delete from restaurant where id = $1', restaurantId)
		.then(function(){
			res.status(200)
			.json({
				status: 'Exitoso',
				message: 'Borrado restaurante'
			});
		})
		.catch(function(err){
			return next(err);
		});
};

function updateRestaurant (req, res, next) {
	db.none('update restaurant set name=$1, city=$2, address=$3, phone=$4 where id=$5',
			[req.body.name, req.body.city, req.body.address, parseInt(req.body.phone), parseInt(req.params.id)])
		.then(function(){
			res.status(200)
			.json({
				status: 'Exitoso',
				message: 'Actualizado restaurante'
			});
		})
		.catch(function(err){
			return next(err);
		});
};

function getAllMenu(req, res, next){
	db.any('select * from menu')
	.then(function(data){
			res.status(200)
			.json({
				status: 'Exitoso',
				data: data,
				message: 'Recuperados todos los menus'
			});
	})
	.catch(function(err){
		return next(err);
	});
};

function getMenuByRestaurant(req,res,next){
	db.any('select * from menu  where restaurant=$1',req.params.id)
	.then(function(data){
			res.status(200)
			.json({
				status:'Exitoso',
				data:data,
				message: 'Recuperados menus por restaurante'
			});
	})
	.catch(function(err){
		return next(err);
	});
};

function createMenu(req,res,next){
	db.none('insert into menu(name,description,price,restaurant) values ($1,$2,$3,$4)',
		[req.body.name, req.body.description, parseInt(req.body.price), parseInt(req.body.restaurant)]
	)
	.then(function(data){
			res.status(200)
			.json({
				status:'Exitoso',
				message: 'Insertado menu'
			});
	})
	.catch(function(err){
		return next(err);
	});
};

module.exports = {
	getAllRestaurants : getAllRestaurants,
	getRestaurantByName : getRestaurantByName,
	createRestaurant : createRestaurant,
	removeRestaurant : removeRestaurant,
	updateRestaurant : updateRestaurant,
	getAllMenu:getAllMenu,
	getMenuByRestaurant:getMenuByRestaurant,
	createMenu:createMenu
}
