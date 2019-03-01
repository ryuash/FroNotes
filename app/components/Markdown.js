import React from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';

const Markdown = props => {
  return (
    <ReactMarkdown
      className="result"
      source={
        props.selectedNote.date ? props.selectedNote.notes : props.currentNote
      }
    />
  );
};

const mapState = state => {
  return {
    currentNote: state.noteReducer.currentNote,
    selectedNote: state.noteReducer.selectedNote
  };
};

export default connect(mapState)(Markdown);
