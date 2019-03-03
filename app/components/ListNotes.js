import React from 'react';
import { connect } from 'react-redux';
// import Pagination from 'react-js-pagination';
import ipc from 'electron-better-ipc';
import {
  getAllNotesThunk,
  selectedNoteThunk,
  createNewThunk,
  saveThunk,
  saveAllThunk
} from '../actions/noteActions';

class ListNotes extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.createNew = this.createNew.bind(this);
  }
  componentDidMount() {
    this.props.getAllNotesThunk();
    ipc.answerMain('save', async () => {
      if (this.props.selectedNote.date) {
        this.props.saveThunk(
          this.props.selectedNote.date,
          this.props.selectedNote.notes
        );
      }
    });

    ipc.answerMain('save all', async () => {
      if (this.props.selectedNote.date) {
        // console.log(this.props.allNotes, 'ALL NOTES BEFORE ALL SAVE');
        this.props.saveAllThunk(this.props.allNotes);
      }
    });
  }

  createNew() {
    this.props.createNewThunk();
  }

  handleClick(e) {
    const note = this.props.allNotes.filter(x => x.date === e);
    this.props.selectedNoteThunk(note[0]);
  }

  render() {
    // console.log(this.props.allNotes, 'allnotes render from list notes');
    return (
      <div id="list-notes">
        <h1>Them Notes</h1>
        <div>
          <div onClick={this.createNew}>Create New</div>
          {this.props.allNotes
            .map(x => {
              return (
                <div onClick={() => this.handleClick(x.date)} key={x.date}>
                  {x.notes.slice(0, 15)}...{x.save ? '*' : ''}
                </div>
              );
            })
            .reverse()}
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    allNotes: state.noteReducer.allNotes,
    selectedNote: state.noteReducer.selectedNote
  };
};

const mapDispatch = dispatch => {
  return {
    getAllNotesThunk: () => dispatch(getAllNotesThunk()),
    selectedNoteThunk: date => dispatch(selectedNoteThunk(date)),
    createNewThunk: () => dispatch(createNewThunk()),
    saveThunk: (date, newNote) => dispatch(saveThunk(date, newNote)),
    saveAllThunk: allNotes => dispatch(saveAllThunk(allNotes))
  };
};

export default connect(
  mapState,
  mapDispatch
)(ListNotes);
