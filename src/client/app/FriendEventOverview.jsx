import React from 'react';
import AttendeeTable from './AttendeeTable.jsx';

class FriendEventOverview extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      youIn: 'maybe', // yes / maybe /
      guests: 0,
      donation: 0,
      brings: ''
    }
  }
  componentDidMount() {
    console.log('inside DID MOUNT EVENT for Friend OVERVIEW')
  }

  onYouInChanged(e) {
    // console.log('YouIn change, event:', e);
    this.setState({youIn: e.currentTarget.value});
  }

  onGuestsChanged(e) {
    this.setState({guests: e.currentTarget.value});
  }

  onDonationChanged(e) {
    this.setState({donation: e.currentTarget.value});
  }

  render() {
    const event = this.props.event ? this.props.event : undefined;
    const date = this.props.event ? this.props.event.date.slice(0,10) : undefined;

    console.log('event', event);
    return (
      <div className='EventOverviewWrapper'>
        {event &&
        <div className='eventDetails'>
          <h4>Title: {event.title}</h4>
          <h4>Location: {event.location}</h4>
          <h4>Date: {date}</h4>
          <h4>Type: {event.short_desc}</h4>
          <h4>Description: {event.description}</h4>
          <a href='#' onClick={this.updateEventDetails}>Update</a>
        </div>}

        <div className='youIn'>
          <h3>You In?</h3>
          <input type='radio'
                  name='youInChoice'
                  value='yes'
                  checked={this.state.youIn === 'yes'}
                  onChange={this.onYouInChanged.bind(this)}/> <span className='glyphicon glyphicon-ok-sign' />
                  <span> </span>
          <input type='radio'
                  name='youInChoice'
                  value='maybe'
                  checked={this.state.youIn === 'maybe'}
                  onChange={this.onYouInChanged.bind(this)}/> <span className='glyphicon glyphicon-question-sign' />
                  <span> </span>
          <input type='radio'
                  name='youInChoice'
                  value='no'
                  checked={this.state.youIn === 'no'}
                  onChange={this.onYouInChanged.bind(this)}/> <span className='glyphicon glyphicon-remove-sign' />
        </div>
        <div><span>I would like to invite</span><input type='text' value={this.state.guests}
          onChange={this.onGuestsChanged.bind(this)} /><span> guests</span>
        </div>
        <div><span>Suggested donation: [TODO: insert var here]. I'll contribute: </span>
          <input type='text' value={this.state.donation}
            onChange={this.onDonationChanged.bind(this)} />
        </div>
        <div><input type='submit' value='Send RVSP'/>TODO: link to a state update function</div>
        <div className='whosIn col-md-12'>
          <h2 className='whosIn'> Who's In? </h2>
          <div className="col-md-12">
            <AttendeeTable attendees={event.attendees}/>
          </div>
        </div>
      </div>
    )
  }
}

export default FriendEventOverview;
