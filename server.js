const express = require('express');
const app = express();
const mongoose = require('mongoose');
const productModel = require("./models/productModel")
const PORT = 3000;


// POST Endpoint to return the request body in the response 
app.use(express.json());
app.post('/root', (req, res) => {
    console.log(req.body)
	res.send(req.body);
});

// POST Endpoint to save productModel to MongoDB 
app.post('/product', async(req, res) => {
	try {
		const product = await productModel.create(req.body);
		res.status(200).json(product);
	} catch (error) {
		res.status(500).json({message: error.message});
	}
});

// GET Endpoint get all products from MongoDB
app.get('/products', async(req, res) => {
	try {
		const product = await productModel.find({});
		res.status(200).json(product);
	} catch (error) {
		res.status(500).json({message: error.message});
	}
});

// GET Endpoint to a specific product by Id from MongoDB
app.get('/products/:id', async(req, res) => {
	try {
		const {id} = req.params;
		const product = await productModel.findById(id);
		res.status(200).json(product);
	} catch (error) {
		res.status(500).json({message: error.message});
	}
});

// PUT Endpoint to update a specific product by Id from MongoDB
app.put('/products/:id', async(req, res) => {
	try {
		const {id} = req.params;
		const product = await productModel.findByIdAndUpdate(id, req.body);
		if(!product){
			return res.status(404).json({message: 'can not find product with id'})
		}
		res.status(200).json(product);
	} catch (error) {
		res.status(500).json({message: error.message});
	}
});

// DELETE Endpoint to delete a specific product by Id from MongoDB
app.delete('/products/:id', async(req, res) => {
	try {
		const {id} = req.params;
		const product = await productModel.findByIdAndDelete(id, req.body);
		if(!product){
			return res.status(404).json({message: 'can not find product with id'})
		}
		res.status(200).json(product);
	} catch (error) {
		res.status(500).json({message: error.message});
	}
});




/**
 * Connect to MongoDB
 * Run the app server on PORT 3000
 */
mongoose
.connect('mongodb+srv://<USER_NAME>:<PASSWORD>@mongodbcluster.diz3oox.mongodb.net/Node-API?retryWrites=true&w=majority')
.then( ()=> {
	console.log('conneced to MongoDB...');
	app.listen(PORT, function (err) {
		if (err) console.log(err);
		console.log("Server listening on PORT", PORT);
	});
}).catch(()=>{
	console.log('error');
})