'use strict';
const querystring = require("querystring")
const mysql=require('mysql');
const connection=mysql.createConnection({
  host:'database-1.cz1ybvsh329r.us-east-1.rds.amazonaws.com',
  user:'admin',
  port:'3306',
  password:'12345678',
  database:'proyectorestaurante',
});

module.exports.hacerpedido = async (event) => {
  const pedidos = querystring.parse(event["body"])
  await new Promise((resolve, reject) => {
  const queryclient = "CALL insert_pedidos(?,?,?,?,?);";
    connection.query(queryclient,[pedidos.producto_id,pedidos.cantidad_und,pedidos.valorUnidad,pedidos.valorTotal,pedidos.cliente_id], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "exitoso",
        cliente_id: pedidos.cliente_id,
        producto_id: pedidos.producto_id,
        cantidad_und: pedidos.cantidad_und,
        valorUnidad: pedidos.valorUnidad,
        valorTotal: pedidos.valorTotal,  
      },
      null,
      2
    ),
  };
  connection.end();
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.obtenerpedido = async (event) => {
  const pedidos = event.queryStringParameters.id;
  const queryPedido = "SELECT * FROM proyectorestaurante.Pedidos WHERE id= ?";
  const results = await new Promise((resolve, reject) => {
    connection.query(queryPedido, [pedidos], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        pedido: results[0],
      },
      null,
      2
    ),
  };
};





