import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base, { firebaseApp } from '../base';

class Inventory extends React.Component {

  static propTypes = {
    fishes: PropTypes.object,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    addFish: PropTypes.func,
    loadSampleFishes: PropTypes.func
  };

  state = {
    uid: null,
    owner: null
  };

  // Every time we load the page firebase will see if we are logged in and authenticated.
  // Without this, even if we log in, once we reload the page it will log us out.
  // I presume firebase is storing the data regardin 'whether we are loggin in or not'.
  // Seems it's stored in the 'local' (https://firebase.google.com/docs/auth/web/auth-state-persistence#supported_types_of_auth_state_persistence)
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      // If this is true, we pass the 'user' to the 'authHandler' function.
      if(user) {
        this.authHandler({ user });
      }
    })
  }

  authHandler = async authData => {
    // 1. Look up the current store in the firebase database.
    // In this case we are assigning the 'promise' that is returned by fetch.
    // const store = base.fetch()
    // However by using 'await' we are assining the 'value of the promise' that is returned by fetch.
    const store = await base.fetch(this.props.storeId, {context: this});
    console.log(store);
    // 2. Claim it if there is no owner.
    if(!store.owner) {
      // Lets save it as our own by posting out data to firebase by posting it to a 'owner' field.
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      });
    }
    // 3. Set the state of the inventory to reflect the current user.
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    });
    console.log(authData);
  };

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  logout = async () => {
    console.log('Logging Out!');
    await firebase.auth().signOut();
    this.setState({ uid: null });
  }

  render() {
    const logout = <button onClick={this.logout}>Log Out</button>;
    // 01. If they are not logged in show the Login component.
    if(!this.state.uid) {
      return <Login authenticate={this.authenticate} />
    }
    // 02. If they are the not the owner of the store.
    if(this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you are not the owner...</p>
          {logout}
        </div>
      );
    }
    // 03. If there are not objections, it must mean they are the owner so render the following.
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(key =>
          <EditFishForm
            key={key}
            index={key}
            fish={this.props.fishes[key]}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />
        )}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button> {/* loadSample made in app.js since it's where the fish state is. */}
      </div>
    )
  }
}

export default Inventory;