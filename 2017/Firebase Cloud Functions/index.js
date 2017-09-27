//---------------Dependencias---------------------//
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

//---------------Configuraciones------------------//
const sender 		= encodeURIComponent('alguien@gmail.com');
const pass		  	= encodeURIComponent('tazocrmjrqjghwbtaft');
const smtp 			= 'smtps://'+sender+':'+pass+'@smtp.gmail.com';
const transport     = nodemailer.createTransport(smtp);

//------------------Funciones--------------------//
exports.hello = functions.https.onRequest((request, response) =>
{
  const json = {action: 'Hello', name: request.query.name};
  response.send(json);
});

exports.sendWelcomeEmail = functions.auth.user().onCreate(event => 
{
  const user 	= event.data; 
  const email 	= user.email; 
  const name 	= user.displayName; 
  const subject	= 'Bienvenido a mi Super App sin backend';
  const text 	= 'Bienvenido '+ name +' , es un gusto tenerte por aca';
  return sendEmail(email, name, subject, text);
});


exports.sendByeEmail = functions.auth.user().onDelete(event => 
{
  const user 	= event.data; 
  const email 	= user.email; 
  const name 	= user.displayName; 
  const subject	= "Estamos Tristes por tu partida :( ";
  const text 	= 'Hola '+ name +' , lamentamos mucho tu partida, esperamos que regreses';
  return sendEmail(email, name, subject, text);
});

//------------------Interno--------------------//
function sendEmail(email, name, subject, text) 
{
  const options		= {};
  options.from 		= '"Yo" <jac.mota@gmail.com>';
  options.to 		= email;
  options.subject 	= subject;
  options.text 		= text;
  
  return transport.sendMail(options);
}.








