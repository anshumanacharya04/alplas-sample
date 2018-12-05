import React, { Component } from 'react';
import Header from "../1325/Header";

import {
    setInStorage,
    getFromStorage,
  } from '../../utils/storage';

  class Admin extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        isLoading : true,
        token: '',
        signInError:'',
        signInEmail:'',
        signInPassword:''
      };
  
      this.onTextboxChangesignInEmail = this.onTextboxChangesignInEmail.bind(this);
      this.onTextboxChangesignInPassword = this.onTextboxChangesignInPassword.bind(this);
  
      this.onSignIn = this.onSignIn.bind(this);
    }
  
    componentDidMount() {
      const obj = getFromStorage('the_main_app'); 
      if (obj && obj.token) {
        const { token } = obj;
        // Verify token
        fetch('/api/account/verify?token=' + token)
          .then(res => res.json())
          .then(json => {
            if (json.success) {
              this.setState({
                token,
                isLoading: false
              });
            } else {
              this.setState({
                isLoading: false,
              });
            }
          });
      } else {
        this.setState({
          isLoading : false,
        })
      }
    }
  
    onTextboxChangesignInEmail(event){
      this.setState({
        signInEmail : event.target.value
      })
    }
  
    onTextboxChangesignInPassword(event){
      this.setState({
        signInPassword : event.target.value
      })
    }
  
    onSignIn(){
      // Grab state
      const {
        signInEmail,
        signInPassword,
      } = this.state;
  
      this.setState({
        isLoading: true,
      });
  
      // Post request to backend
      fetch('/api/account/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: signInEmail,
          password: signInPassword,
        }),
      }).then(res => res.json())
        .then(json => {
          console.log('json', json);
          if (json.success) {
            setInStorage('the_main_app', { token: json.token });
            this.setState({
              signInError: json.message,
              isLoading: false,
              signInPassword: '',
              signInEmail: '',
              token: json.token,
            });
          } else {
            this.setState({
              signInError: json.message,
              isLoading: false,
            });
          }
        });
    }
  
    render() {
      const {
        isLoading,
        token,
        signInError,
        signInEmail,
        signInPassword,
      } = this.state;
  
      if(isLoading){
        return(<div><p>Loading ...</p></div>)
      }
  
      if(!token){
        return(
          <div>
            {
              (signInError) ? (
                <p>{signInError}</p>
              ) : (null)
            }
            <p>Sign In</p>
            <input type="email" placeholder="Email" value={signInEmail} onChange={this.onTextboxChangesignInEmail}/><br></br><br></br>
            <input type="password" placeholder="Password" value={signInPassword} onChange={this.onTextboxChangesignInPassword}/><br></br><br></br>
            <button onClick={this.onSignIn}>Sign In</button>
          </div>
        )
      }
      return (
        <>
        <h4>Please follow the links below to enter the details</h4>
        <h4>Each screen in it also has it own details to be followed</h4>
        <Header></Header>
        </>
      );
    }
  }
  
  export default Admin;
  