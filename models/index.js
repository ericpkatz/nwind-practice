var Sequelize = require('sequelize');

var db = new Sequelize('sqlite:nwind.db', { 
  define: {timestamps: false }
});

var Department = db.define('department', {
  name: Sequelize.STRING
}, {
  classMethods: {
    findDepartments: function(){
      return this.findAll({
        order: 'name'
      });
    },
    findByName : function(name){
      return this.find({ 
        where: { name: name },
        include: [ { model: Employee, as: 'manager'} ]
      });
    }
  }
});

var Employee = db.define('employee', {
  name: Sequelize.STRING
}, {
  classMethods: {
    findEmployees: function(){
      return this.findAll({ order: 'name' });
    },
    findByName : function(name){
      return this.find({ where: { name: name }});
    }
  }

});

Employee.belongsTo(Department);
Department.belongsTo(Employee, { as: 'manager', foreignKey: 'managerId', constraints: false});

var _conn;
module.exports = {
  connect: function(){
    if(_conn)
      return _conn;
    _conn = db.authenticate();
    return _conn;
  },
  sync: function(){
    return db.sync({force: true});
  },
  models: {
    Department: Department,
    Employee: Employee
  }
};
