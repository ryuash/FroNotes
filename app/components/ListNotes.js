import React from 'react';
import { connect } from 'react-redux';
// import Pagination from 'react-js-pagination';
import {
  getAllNotesThunk,
  selectedNoteThunk,
  createNewThunk
} from '../actions/noteActions';

class ListNotes extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.createNew = this.createNew.bind(this);
  }
  componentDidMount() {
    this.props.getAllNotesThunk();
  }

  createNew() {
    this.props.createNewThunk();
  }

  handleClick(e) {
    this.props.selectedNoteThunk(e);
  }

  render() {
    return (
      <div id="list-notes">
        <h1>Them Notes</h1>
        <div>
          <div onClick={this.createNew}>Create New</div>
          {this.props.allNotes.map(x => {
            return (
              <div onClick={() => this.handleClick(x.date)} key={x.date}>
                {x.notes.slice(0, 15)}...
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
    selectedNoteThunk: date => dispatch(selectedNoteThunk(date)),
    createNewThunk: () => dispatch(createNewThunk())
  };
};

export default connect(
  mapState,
  mapDispatch
)(ListNotes);
