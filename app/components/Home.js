import React from 'react';
import SplitPane from 'react-split-pane';
import ipc from 'electron-better-ipc';
import Editor from './Editor';
import ListNotes from './ListNotes';
import Markdown from './Markdown';
import Welcome from './Welcome';
import { connect } from 'react-redux';
import { saveThunk } from '../actions/noteActions';

class Home extends React.Component {
  componentDidMount() {
    ipc.answerMain('save', async () => {
      if (this.props.selectedNote.notes) {
        this.props.saveThunk(
          this.props.selectedNote.date,
          this.props.selectedNote.notes
        );
      }
    });
  }

  render() {
    return (
      <div id="home-container">
        <ListNotes />
        {this.props.selectedNote.date ? (
          <div id="editor-container">
            <SplitPane split="vertical" defaultSize="50%">
              {/* editor */}
              <div className="editor-pane">
                <Editor className="editor" />
              </div>
              {/* preview */}
              <div className="view-pane">
                <Markdown />
              </div>
            </SplitPane>
          </div>
        ) : (
          <Welcome />
        )}
      </div>
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
    saveThunk: (date, newNote) => dispatch(saveThunk(date, newNote))
  };
};

export default connect(
  mapState,
  mapDispatch
)(Home);
