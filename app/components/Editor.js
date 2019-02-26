import React from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';

class Editor extends React.Component {
  constructor() {
    super();
    this.updateCode = this.updateCode.bind(this);
  }

  updateCode(e) {
    this.props.change(e);
  }

  render() {
    return (
      <CodeMirror
        value={this.props.value}
        onDblClick={this.updateCode}
        onChange={this.updateCode}
        options={{
          mode: 'xml',
          theme: 'material',
          lineNumbers: true
        }}
      />
    );
  }
}

export default Editor;
