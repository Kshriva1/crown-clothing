import React from 'react';
import './App.css';
import {Route,Switch,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from './redux/user/user.selectors'
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';
import Header from './components/header/header.component.jsx';
import { auth,createUserProfileDocument } from './firebase/firebase.utils.js';
import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {
  
  unSubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser} = this.props;
    this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
   if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            })
          },() => {
            console.log(this.state);
          });
      }


      setCurrentUser(userAuth);
    });

  }

  componentWillUnmount() {
    this.unSubscribeFromAuth();
  }

  render() {
    return (
    <div className="App">
    <Header />
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route path='/shop' component={ShopPage} />
      <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)} />
      <Route path='/checkout' component={CheckoutPage} />
    </Switch>  
    </div>
  );
  }

}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(App);