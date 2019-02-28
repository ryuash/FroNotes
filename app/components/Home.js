import React from 'react';
import SplitPane from 'react-split-pane';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import Editor from './Editor';
import ListNotes from './ListNotes';

class Home extends React.Component {
  render() {
    return (
      <div id="home-container">
        <ListNotes />
        <div id="editor-container">
          <SplitPane split="vertical" defaultSize="50%">
            {/* editor */}
            <div className="editor-pane">
              <Editor className="editor" />
            </div>
            {/* preview */}
            <div className="view-pane">
              <ReactMarkdown
                className="result"
                source={this.props.currentNote}
              />
            </div>
          </SplitPane>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    currentNote: state.noteReducer.currentNote
  };
};

export default connect(mapState)(Home);

// @flow
// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import routes from '../constants/routes';
// import styles from './Home.css';

// type Props = {};

// export default class Home extends Component<Props> {
//   props: Props;

//   render() {
//     return (
//       <div>
//         <div>Answer</div>
//       </div>
//     );
//   }
// }
//=============================================
// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import routes from '../constants/routes';
// import styles from './Home.css';
// import { connect } from 'react-redux';
// import { homeTestThunk } from '../actions/noteActions';

// type Props = {};

// class Home extends Component<Props> {
//   constructor() {
//     super();
//     this.state = {
//       input: ''
//     };
//     this.handleClick = this.handleClick.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//   }

//   handleChange(e) {
//     this.setState({ input: e.target.value });
//   }
//   handleClick(e) {
//     e.preventDefault();
//     this.props.homeTestThunk(this.state.input);
//   }
//   render() {
//     return (
//       <div>
//         <h1>IS HOME</h1>
//         <form onSubmit={this.handleClick}>
//           <input
//             value={this.state.input}
//             onChange={this.handleChange}
//             placeholder="enter"
//           />
//           <button type="submit" onClick={this.handleClick}>
//             Hit me
//           </button>
//         </form>
//       </div>
//     );
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     homeTestThunk: input => {
//       dispatch(homeTestThunk(input));
//     }
//   };
// };
// export default connect(
//   null,
//   mapDispatch
// )(Home);
//===============================
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import Counter from '../components/Counter';
// import * as CounterActions from '../actions/counter';

// function mapStateToProps(state) {
//   return {
//     counter: state.counter
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(CounterActions, dispatch);
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Counter);
