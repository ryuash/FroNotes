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
    return (
      <CodeMirror
        className="editor-override"
        value={this.props.currentNote}
        options={{
          mode: 'xml',
          theme: 'material',
          autoScroll: false
        }}
        onBeforeChange={(editor, data, value) => {
          this.handleChange(editor, data, value);
        }}
        // onChange={(editor, data, value) => {
        //   this.handleChange(editor, data, value);
        // }}
      />
    );
  }
}

const mapState = state => {
  return {
    currentNote: state.noteReducer.currentNote
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
