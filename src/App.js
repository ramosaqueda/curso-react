import React from 'react';
import { Switch, Route } from "react-router-dom";

import './App.css';
// import components
import HomePage from './pages/homepage/homepage.component';
import Header from './components/header/header.component';
import ShopPage from './pages/shop/shop.component';

import {auth, createUserProfileDocument} from './firebase/firebase.utils'


//Patter Dewsing> Statefull, Stateless


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      curretUser: null


    };

  }

  unsubscribeFromAuth = null;
  // types: mount, update, umount
  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          this.setState({
            curretUser: {
              id:snapShot.id,
              ...snapShot.data()
            }
          })
        })
      }

      this.setState({ curretUser: userAuth});
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  };

  render() {
 
    return(
      <div>
        <Header />
        <Switch>
           <Route path='/' component={HomePage}/>
           <Route path='/shop' component={ShopPage} />
       

        </Switch>
      </div>
    )
  }

}


export default App;
