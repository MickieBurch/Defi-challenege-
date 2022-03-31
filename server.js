const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();
const hbs = exphbs.create({});
const PORT = process.env.PORT || 3002;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.get('/', function (req,res){
  res.render('homepage');
});
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public')));



const sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
		
        res.redirect('/dashboard');
    } else {
        next();
    }    
};



  app.listen(PORT, () => console.log('Now listening this is a test'));
app.get('/', sessionChecker, (req, res) => {
    res.redirect('login');
});



// route for user Login
app.get('/', function (req,res){
    res.render('login');
  });
  app.use(express.json());
  app.use(express.urlencoded({extended:true}))
  app.use(express.static(path.join(__dirname, 'public')));