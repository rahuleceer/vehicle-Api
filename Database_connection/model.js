const Sequelize=require('sequelize')
const DataTypes=Sequelize.DataTypes

const db=new Sequelize({
    //for mysql2
    //dialect: 'mysql',
    //database: 'sampledb22',
    //username: 'sampleuser22',
    //password: 'samplepass22'

    //for sqlite3
    dialect: 'sqlite',
    storage: __dirname+'/tasks.db'  //create the file task.db in current folder
})

const Task= db.define('Vehicle',{   ///task is name of the table
    reg_num: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    model: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    logo: {
        type: DataTypes.STRING(40),
        allowNull: false
    }
})

//  db.authenticate()--> to check that our db is connected or not


//exporting the files
module.exports={
    db,Task
}