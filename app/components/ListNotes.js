import React from 'react';
import { connect } from 'react-redux';
// import Pagination from 'react-js-pagination';
import { getAllNotesThunk, selectedNoteThunk } from '../actions/noteActions';

class ListNotes extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.props.getAllNotesThunk();
  }

  handleClick(e) {
    //grabs the title on click.
    //need to create a thunk to set as selected title;
    //on change make sure to the current selected file first
    //have listeners on editor and the other one
    console.log(e, 'e from click');
    this.props.selectedNoteThunk(e);
  }

  render() {
    return (
      <div id="list-notes">
        <h1>Them Notes</h1>
        <div>
          {this.props.allNotes.map(x => {
            return (
              <div onClick={() => this.handleClick(x.date)} key={x.date}>
                {x.title}
              </div>
            );
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
    getAllNotesThunk: () => dispatch(getAllNotesThunk()),
    selectedNoteThunk: date => dispatch(selectedNoteThunk(date))
  };
};

export default connect(
  mapState,
  mapDispatch
)(ListNotes);
