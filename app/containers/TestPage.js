import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';

export default class TestPage extends React.Component {
  render() {
    return (
      <div>
        {/* <BrowserWindow title="Hello, World!" visible={true} /> */}
        <div data-tid="backButton">
          <Link to={routes.HOME}>
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>
        <h1>Hit test</h1>
      </div>
    );
  }
}
