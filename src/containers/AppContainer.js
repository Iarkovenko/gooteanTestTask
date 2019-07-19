import React from 'react';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import PropTypes from 'prop-types';

class App extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistStore(store)}>
          <div style={{ height: '100%' }}>
            <Router history={browserHistory} children={this.props.routes} />
          </div>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
