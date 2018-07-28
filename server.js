const   express   =   require('express'),
        mongoose = require('mongoose'),
        bodyParser = require('body-parser'),
        passport = require('passport'),
        app =express();

const usersRoute = require('./routes/Users');


// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Passport
app.use(passport.initialize());
// Passport Config
require('./config/passport')(passport);

//DB Config
const db = require('./config/key').mongoURI;

// Connect to MongoDB
mongoose
.connect(db,{ useNewUrlParser: true })
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

app.get('/', function(req, res){
    res.send('This is the Index PAGE');
});

app.use('/users', usersRoute);

app.get('/dashboard', passport.authenticate('jwt', {session:false}),(req,res) => res.json({msg:"This is the private dashboard"}));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));