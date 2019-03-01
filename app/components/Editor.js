import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { connect } from 'react-redux';
import { updateNoteThunk } from '../actions/noteActions';

class Editor extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(editor, data, value) {
    // console.log(value, 'e');
    // console.log(this.props, 'rpops');
    this.props.updateNoteThunk(value);
  }

  render() {
    console.log(this.props, 'props at the editor');
    return (
      <CodeMirror
        className="editor-override"
        value={
          this.props.selectedNote.date
            ? this.props.selectedNote.notes
            : this.props.currentNote
        }
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
    currentNote: state.noteReducer.currentNote,
    selectedNote: state.noteReducer.selectedNote
  };
};

const mapDispatch = dispatch => {
  return {
    updateNoteThunk: note => dispatch(updateNoteThunk(note))
  };
};

export default connect(
  mapState,
  mapDispatch
)(Editor);
