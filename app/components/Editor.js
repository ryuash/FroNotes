import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { connect } from 'react-redux';
import { updateNoteThunk, trackUnsaveThunk } from '../actions/noteActions';

class Editor extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(editor, data, value) {
    if (!this.props.selectedNote.save) {
      this.props.trackUnsaveThunk(this.props.selectedNote);
    }
    this.props.updateNoteThunk(value);
  }

  render() {
    return (
      <CodeMirror
        className="editor-override"
        value={this.props.selectedNote.notes}
        options={{
          mode: 'xml',
          theme: 'material',
          autoScroll: false,
          lineWrapping: true
        }}
        onBeforeChange={(editor, data, value) => {
          this.handleChange(editor, data, value);
        }}
        // onChange={(editor, data, value) => {
        //   this.handleChange(editor, data, value)s;
        // }}
      />
    );
  }
}

const mapState = state => {
  return {
    selectedNote: state.noteReducer.selectedNote
  };
};

const mapDispatch = dispatch => {
  return {
    updateNoteThunk: note => dispatch(updateNoteThunk(note)),
    trackUnsaveThunk: note => dispatch(trackUnsaveThunk(note))
  };
};

export default connect(
  mapState,
  mapDispatch
)(Editor);
