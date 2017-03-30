'use strict'

let db = require('../config.js');

module.exports = function(event_id){
  console.log('inside save messageyoyoyo', event_id);

return db.query('SELECT * FROM MESSAGES WHERE event_id=$1', [event_id]);
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