const express = require('express');
const app = express();
const path = require('path');
// router
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');
// port
const port = 3002;
// config template engine
app.set('view engine', 'ejs');
app.set('views', 'views');
// body-parser
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// static file
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(port, () => {
	console.log(`Moe in port ${port}`);
});
