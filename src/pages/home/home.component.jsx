import React, { Component } from "react";
import "./home.styles.scss";
import { connect } from "react-redux";
import { addReminder, deleteReminder, clearReminders } from "../../actions";
import moment from "moment";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      dueDate: ""
    };
  }

  addReminder() {
    const { text, dueDate } = this.state;
    this.props.addReminder(text, dueDate);
    this.setState({
      text: "",
      dueDate: ""
    });
  }

  deleteReminder(id) {
    this.props.deleteReminder(id);
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  }

  renderReminders() {
    const { reminders } = this.props;

    return (
      <ul className="list-group col-sm-4">
        {reminders.map(reminder => (
          <li key={reminder.id} className="list-group-item">
            <div className="list-item">
              <div>{reminder.text}</div>
              <div>
                <em>{moment(new Date(reminder.dueDate)).fromNow()}</em>
              </div>
            </div>
            <div
              onClick={() => this.deleteReminder(reminder.id)}
              className="list-item delete-button"
            >
              &#x2715;
            </div>
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="home">
        <div className="title">Reminder Pro</div>
        <div className="form-inline">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="I have to..."
              name="text"
              value={this.state.text}
              onChange={this.handleChange.bind(this)}
            />
            <input
              type="datetime-local"
              className="form-control"
              name="dueDate"
              onChange={this.handleChange.bind(this)}
            />
          </div>
          <button
            type="button"
            className="btn btn-success"
            onClick={this.addReminder.bind(this)}
          >
            Add reminder
          </button>
        </div>
        {this.renderReminders()}
        <div
          className="btn btn-danger"
          onClick={() => this.props.clearReminders()}
        >
          Clear reminders
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    reminders: state
  };
}

export default connect(mapStateToProps, {
  addReminder,
  deleteReminder,
  clearReminders
})(Home);
