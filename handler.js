'use strict';
const mysql=require('mysql');
const connection=mysql.createConnection({
  host:'database-1.cz1ybvsh329r.us-east-1.rds.amazonaws.comñ',
  user:'admin',
port:"3306",
password:'12345678',
database:'data base1',
});

module.exports.hacerpedido = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.obtenerpedido = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'ejemplo de pedido',
        input: event,
      },
      null,
      2
    ),
  };
};










