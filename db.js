const mongoose = require ('mongoose');

function connectDB()
{
    mongoose.connect("mongodb+srv://MOHIBRIYAZ:MOHIBRIYAZ@cluster0.1e8ga.mongodb.net/test" , {useUnifiedTopology:true , useNewUrlParser: true})

    const connection = mongoose.connection

    connection.on('connected' , () => {
        console.log('Connection sucessfully')
    })
    connection.on('error' , () => {
        console.log('Connection Failed')
    })
}

connectDB()

module.exports = mongoose



