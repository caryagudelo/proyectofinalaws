'use strict';
const aws=require('aws-sdk');
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
  const messageBody = {
    Cliente: cliente_id,
    Producto: producto_id,
    Cantidad: pedido.cantidad_und,
    "Valor Total": pedido.valorTotal,
  };
  // Configura los parámetros del mensaje
  const params = {
    MessageBody: JSON.stringify(messageBody),
    QueueUrl: 'URL-de-tu-cola-SQS', // Reemplaza con la URL de tu cola SQS
  };
await SQS.sendMessage(params).promise();
};

const paramsEmail = {
  Source: "cary.agudelo26894@ucaldas.edu.co", 
  Destination: {
    ToAddresses: [clienteEmail],
  },
  Message: {
    Subject: {
      Data: "Detalles del pedido",
    },
    Body: {
      Text: {
          
            Data: `Detalles del pedido:\n\nCliente: ${cliente_id}\nProducto: ${producto_id}\nValor unitario: ${producto_valor}\nCantidad: ${pedido.cantidad_und}\nValor Total: ${pedido.valorTotal}`,
          },
        },
      },
    };
    await ses.sendEmail(paramsEmail).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: "exitoso",
          cliente_id: pedido.cliente_id,
          producto_id: pedido.producto_id,
          cantidad_und: pedido.cantidad_und,
          valorUnidad: pedido.valorUnidad,
          valorTotal: pedido.valorTotal,  
        },
        null,
        2
      ),
    };
    connection.end();
  
  
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





