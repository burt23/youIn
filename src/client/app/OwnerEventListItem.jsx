import React from 'react';
import OwnerDetailedView from './OwnerDetailedView.jsx';
import moment from 'moment';

class OwnerEventListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    }
    //bind methods here
    this.handleClickListItem = this.handleClickListItem.bind(this);
    this.handleClickedInvite = this.handleClickedInvite.bind(this);
  }
  //Insert Methods Here
  handleClickListItem() {
    this.setState({clicked: !this.state.clicked});
    if (this.state.clicked) {
      this.props.getEvents(this.props.history, function(result) {
        this.setState({
          ownerEvents: result.ownerEvents,
          friendEvents: result.friendEvents
        });
      });
    }
  }

  handleClickedInvite(event){
  //Triggers FB to render dialog prompt to invite from friends list
    FB.ui({
      method: 'send',
      link: 'http://www.nytimes.com/interactive/2015/04/15/travel/europe-favorite-streets.html',
    });
  }

  render() {
    let date = moment(this.props.event.date);

    return (
      <div>
      <div className="panel list-item row" onClick={this.handleClickListItem}>
        <div className="glyphicon glyphicon-globe col-sm-1"></div>
        <div className="col-sm-4">{this.props.event.title}</div>
        <div className="col-sm-3">{date.format('dddd D') + 'th'} at {this.props.event.time}</div>
        <div className="col-sm-3">{this.props.event.attendees.length}<span> people IN</span></div>
        <div className="col-sm-1"><button className="btn-primary" onClick={this.handleClickedInvite}>Invite</button></div>
        <br/>
      </div>
        {this.state.clicked ? <OwnerDetailedView accessToken={this.props.accessToken} event={this.props.event}/> : '' }
      </div>
    );
  }
}

export default OwnerEventListItem;


