import React from 'react';
import { connect } from 'react-redux';
import { getAllNotesThunk } from '../actions/noteActions';

class ListNotes extends React.Component {
  componentDidMount() {
    this.props.getAllNotesThunk();
  }
  render() {
    console.log(this.props, 'props from list notes');
    return (
      <div id="list-notes">
        <h1>Them Notes</h1>
        <div>
          {this.props.allNotes.map(x => {
            return <div>{x.title}</div>;
          })}
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    allNotes: state.noteReducer.allNotes
  };
};

const mapDispatch = dispatch => {
  return {
    getAllNotesThunk: () => dispatch(getAllNotesThunk())
  };
};

export default connect(
  mapState,
  mapDispatch
)(ListNotes);
