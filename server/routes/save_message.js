'use strict'

let db = require('../config.js');

module.exports = function(message){
  console.log('inside save message', message);

return db.query('INSERT INTO messages (event_id, event_owner, message, photourl, author_email, author_id) VALUES ($1, $2, $3, $4, $5, $6)', [message.event_id, message.event_owner, message.message, message.photourl, message.author_email, message.author_id])
}



  // .then( (data) => {
  //   console.log('data after db query insert message:', data)
  //   console.log('message.event_id after db query insert message:', message.event_id)
  //   console.log('message.event_id after db query insert message:', typeof message.event_id)
  //   return db.query('SELECT * FROM MESSAGES WHERE event_id=(CAST ? as INT)', [message.event_id]);
  //   console.log('getting hotter');
  // })
  // .catch( (error) => {
  //   console.log('inside error buddy', error);

  // })