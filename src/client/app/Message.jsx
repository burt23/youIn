import React from 'react';
import TimeAgo from 'react-timeago';
import $ from 'jquery';

class Message extends React.Component {
  constructor(props){
    super(props);
    this.state={}
  }

  render(){
    let msg = this.props.message;

    return(
      <li class='chatMessage'>
        <img src={msg.photourl}/>
        <p className='msgContent'>{msg.message}</p>
        <TimeAgo className='msgTime' date={msg.created}/>
      </li>
      )
  }
}

export default Message;