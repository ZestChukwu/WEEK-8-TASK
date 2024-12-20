mongoose = require('mongoose');

//app = express();
const MONGO_URI = 'mongodb://127.0.0.1:27017/week8';

mongoose.connect(MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true
}); const db = mongoose.connection;
db.on('error', function(err)
{console.log("Error occured during connection"+err)
}
);
db.once('connected', function()
{console.log(`Connected to ${MONGO_URI}`)
});

//creating the schema
const PersonSchema = new mongoose.Schema({ 
  name: { type: String, required: true },
  age : Number, Gender: String, Salary: Number
});

//creating model named as modelname with collection named as personCollection
const person_doc = mongoose.model('modelname', PersonSchema, 'personCollection');

//creating a single document
const doc1 = new person_doc({
  name: 'Rachana',
  age: 18,
  Gender: 'Female',
  Salary: 50000
});

//adding one document in the collection
// doc1.save().then((doc1) => {
//   console.log("New Article has been Added Into Your DataBase.", doc1);
// }).catch((err) => {
//   console.error(err);
// });

//creating multiple documents
manypersons=[{
          name:'Rachana',
          age:18,
          Gender:'Female',
          Salary:50000
},
          {
          name:'Riya',
          age:19,
          Gender:'Female',
          Salary:60000
},
          {
          name:'Sachin',
          age:20,
          Gender:'Male',
          Salary:70000
},
          {
          name:'Rahul',
          age:21,
          Gender:'Male',
          Salary:80000
}        
]     

//adding multiple documents in the collection
// person_doc.insertMany(manypersons).then(function(){
//   console.log("Data inserted") //success
// }).catch(function(error){
//   console.log(error)  //failure
// });

//finding all the documents in the collection
person_doc.find({})                  //find all users
          .sort({Salary: 1})         //sort ascending by firstName
          .select('name Salary age') //Name and Salary only                 //limit to 10
          .exec()                    //execute query
          .then((docs) => {
            console.log("showing multiple documents")
            docs.forEach(function(Doc){
                    console.log(Doc.age,Doc.name);
            })
          })
          .catch((err) => {
            console.error(err);
          });

var givenage = 21
person_doc.find({Gender:"Female",age:{$gt:givenage}})
//find all users

.sort({Salary: 1})         //sort ascending by firstName
.select('name Salary age') //Name and Salary only 
.limit(10)                 //limit to 10
.exec()                    //execute query
.then((docs) => {
  console.log("showing multiple documents")
  docs.forEach(function(Doc){
          console.log(Doc.age,Doc.name);
  })
})
.catch((err) => {
  console.error(err);
});

//counting all the documents
person_doc.countDocuments().exec()
          .then((count) => {
            console.log("Total number of documents in this collection:", count);
          })
          .catch((err) => {
            console.error(err);
          });

//delete the documents for a given criteria
person_doc.deleteMany({age:{$gt:20}})
          .exec()
          .then(docs => {
            console.log("Deleted documents:", docs.deletedCount);
          })
          .catch(function(error){
            console.log(error);
          })

//update the documents for a given criteria
person_doc.updateMany({Gender: "Female"},{Salary:5555})
          .exec()
          .then(docs => {
            console.log("Updated documents:")
            console.log(docs); //success
          })
          .catch(function(error){
                    console.log(error); //failure
          });