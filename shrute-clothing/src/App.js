import React from "react";
import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import { Switch, Route, Link } from "react-router-dom";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";

// const HatsPage = () => (
//   <div>
//     <h1>Hats Page</h1>
//   </div>
// );

class App extends React.Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     currentUser: null,
  //   };
  // }
  // removed constructor cuz using redux now

  unsubscribeFromAuth = null;

  componentDidMount() {
    // auth.onAuthStateChanged((user) => {
    //   this.setState({ currentUser: user });
    //   console.log(user);
    // });

    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async (user) => {
    //   createUserProfileDocument(user); //Creates a user in the db after creating a snapshot if the user doesn't exist in the firestore db
    // });

    // removed cuz using redux
    //   this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
    //     if (userAuth) {
    //       const userRef = await createUserProfileDocument(userAuth);
    //       userRef.onSnapshot((snapShot) => {
    //         this.setState({
    //           currentUser: {
    //             id: snapShot.id,
    //             ...snapShot.data(),
    //           }
    //         })
    //       });
    //       // console.log(this.state);
    //     }
    //     this.setState({ currentUser: userAuth }); //sets either the valid user or null depending on the auth status
    //   });
    // }

    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        {/* <Header currentUser={this.state.currentUser} /> */}
        <Header />
        {/* removed passing currentUser from here and passing it instead from redux */}
        <Switch>
          <Route exact path="/" component={HomePage} />
          {/* <Route path="/shop/hats" component={HatsPage} /> */}
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

// returns a dispatch object that dispatches whatever prop we pass in (which here is SET_CURRENT_USER)
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)), // dispatch lets redux reducer know that whatever is being passed is an action object (action.type and action.payload waalo)
});

export default connect(null, mapDispatchToProps)(App);
