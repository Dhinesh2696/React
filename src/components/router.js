import React from 'react';
import {BrowserRouter as Router, Route,Redirect } from 'react-router-dom';
import '../index.css';
import Login from '/home/dhinesh/WebstormProjects/mobx_eg/src/components/login'
import App from './app'

const checkAuth=()=>{
    var user= sessionStorage.getItem("mobile");
    if(!user)
        return false;
    else
        return true;
}
const AuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
       checkAuth() ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                 pathname: '/'
            }}/>
        )
    )}/>
)
const clear=()=>{
    sessionStorage.removeItem("mobile");
    return true;
}
const Root=({component:Component,...rest})=>(
    <Route {...rest} render={props =>(
        clear()?
        (<Component {...props}/>): null
    )}/>
)

export default class Routers extends React.Component {

    render() {

        return (
            <Router>
                <div>
                    <Root exact path="/"  component={Login}/>
                    <AuthRoute exact path="/content"  component={App}/>
                </div>
            </Router>
        )
    }
}
