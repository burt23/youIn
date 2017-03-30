import React from 'react';

class Chat extends React.Component{
  constructor(props){
    super(props);
    this.state={
      message: '',
      messages: []
    }
    //bind functions
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }
  handleFormSubmit(event){
    event.preventDefault();
    event.stopPropagation();

    let context = this;
    console.log('inside form event');
    var socket = io();
    var message = {
      message: this.state.message,
      author: this.props.owner,
      event_id: 3,
      photourl: this.props.owner.photourl,
      author_id: this.props.owner.user_id,
      email: this.props.email
    }

    //route and message to send to server
    socket.emit('chat message', message);
    //listening for 'chat message', setting state

    socket.on('chat message', (msg) => {
      console.log('messages', msg);
      let messages = context.state.messages;
      messages[context.state.messages.length] = msg;
      console.log('messages', messages);
      context.setState({
        messages: messages
      })
    });

    this.setState({
      message: ''
    })

    // this.props
  }
  handleTextChange(event){
    console.log('inside handleTextChange')
    this.setState({
      message: event.target.value
    })
  }

      // <div className='displayChatMessages'>
      // {this.state.messages.length > 0 &&

      //   this.state.messages.map( (msg) => {
      //     // <li key={msg}>{msg}</li>
      //     <h2>hi</h2>
      //   })
      // }
      // </div>
  render(){

    return(
    <div className='chatContainer'>
      <form onSubmit={this.handleFormSubmit} className='chatFlexForm'>

      <div className='chatFlexTop'>
        <div className='flexRowTop'>
          <h2 className='flexRowItemLeft'> Event Name </h2>
          <h2 className='flexRowItemMiddle'> Group Chat </h2>
          <h2 className='flexRowItemRight'> Action Button </h2>
        </div>
      </div>

      <div className='chatFlexMiddle'>
        <div className='flexRowMiddle'>

          <input type='textarea' className='displayChatNames'/>
          <input type='textarea' className='displayChatMessages'/>

        </div>
        <div className='flexRowMiddle'>

          <input type='textarea' className='displayChatNames'/>
          <input type='textarea' className='displayChatMessages'/>

        </div>
        <div className='flexRowMiddle'>

          <input type='textarea' className='displayChatNames'/>
          <input type='textarea' className='displayChatMessages'/>

        </div>
        <div className='flexRowMiddle'>

          <input type='textarea' className='displayChatNames'/>
          <input type='textarea' className='displayChatMessages'/>

        </div>
        <div className='flexRowMiddle'>

          <input type='textarea' className='displayChatNames'/>
          <input type='textarea' className='displayChatMessages'/>

        </div>
      </div>

      <div className='chatFlexBottom'>
        <div className='flexRowBottom'>
          <input type='text' className='chatFlex4-5' onChange={this.handleTextChange} value={this.state.message} placeholder='chat with friends' />
          <input type='submit' className='chatFlex1-5' />
        </div>
      </div>

      </form>
    </div>
    )
  }
}


export default Chat;