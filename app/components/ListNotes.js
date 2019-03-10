import React from 'react';
import { connect } from 'react-redux';
// import Pagination from 'react-js-pagination';
import ipc from 'electron-better-ipc';
import {
  getAllNotesThunk,
  selectedNoteThunk,
  createNewThunk,
  saveThunk,
  saveAllThunk,
  deleteNoteThunk,
  exportThunk
} from '../actions/noteActions';

class ListNotes extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.createNew = this.createNew.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    this.props.getAllNotesThunk();

    ipc.answerMain('open', async data => {
      // console.log(data, 'i hit open');
      this.props.createNewThunk(data);
    });

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

    ipc.answerMain('export', async () => {
      if (this.props.selectedNote.date) {
        // this.props.exportThunk(this.props.selectedNote.notes);
        return this.props.selectedNote;
      } else {
        return false;
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

  handleDelete(e) {
    // console.log(e, 'delete');
    this.props.deleteNoteThunk(e);
  }

  render() {
    // console.log(this.props.allNotes, 'allnotes render from list notes');
    return (
      <div id="list-notes">
        <h2>[ Notes ]</h2>
        <hr />
        <div>
          <div onClick={this.createNew} className="list-hover">
            <i className="fas fa-plus-circle" />
            <p className="list-padding">Create New</p>
          </div>
          <hr />
          {this.props.allNotes
            .map(x => {
              return (
                <React.Fragment key={x.date}>
                  <div className="list-notes">
                    <i
                      onClick={() => this.handleDelete(x.id)}
                      title="delete"
                      className="fas fa-trash"
                    />
                    <div
                      className="list-hover"
                      onClick={() => this.handleClick(x.date)}
                    >
                      <p>
                        {x.notes.slice(0, 15)}...{x.save ? '*' : ''}
                      </p>
                    </div>
                  </div>
                  <hr />
                </React.Fragment>
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
    createNewThunk: note => dispatch(createNewThunk(note)),
    saveThunk: (date, newNote) => dispatch(saveThunk(date, newNote)),
    saveAllThunk: allNotes => dispatch(saveAllThunk(allNotes)),
    deleteNoteThunk: date => dispatch(deleteNoteThunk(date)),
    exportThunk: note => dispatch(exportThunk(note))
  };
};

export default connect(
  mapState,
  mapDispatch
)(ListNotes);
