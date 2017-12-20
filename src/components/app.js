import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { PropTypes } from 'mobx-react';
import _ from 'lodash';
import Selection from './selection';
import Profile from './profile';
import store from '/home/dhinesh/WebstormProjects/mobx_eg/src/models/user-store.js';



const propTypes = {
    store: PropTypes.object
};

class  App extends Component {
constructor(){
    super();
    this.state={
        flag:true
    }
}

    componentWillMount() {

        console.log("in app");
        store.getUsers();
    }

    renderSelection(){
        if (_.isEmpty(store.selectedUser)) return <noscript />;
        return (
            <div className='selection'>
                <Selection user={store.selectedUser}/>
                <button onClick={this.deleteEmp} id={"delete"}>Delete employee<i className="fa fa-minus-square" ></i></button>
                <button onClick={this.invert.bind(this)} id={"edit"}>Edit employee<i class="fa fa-pencil-square-o"></i></button>
                <button id={"closebutt"} onClick={store.clearSelectedUser}>Close Profile<i className="fa fa-close" ></i></button>

            </div>
        );
    }

    renderProfiles(){
        if (_.isEmpty(store.users)) return <p>No data found</p>;
       // store.users.sort((a,b) => b.timeM - a.timeM);
        return store.users
            .map((user) => {
            return (
                <div>
                <Profile
                    selected = {user.id === store.selectedId}
                    key = {user.id}
                    label = {user.name}
                    onClick = { () => {store.selectUser(user);} }

                />
                { user.id === store.selectedId
                            ? this.renderSelection()
                            : null
                    }
                </div>
            );
        });
    }
logout=()=>{
    sessionStorage.removeItem("mobile");
    window.location.href='/';
}
deleteEmp=()=>{
        store.removeUser(store.selectedId);
}
change=()=>{
    console.log(this.state.flag);
    document.getElementById("contactForm").style.display='block';
    document.getElementById("main").className = 'main';
}
hide=()=>{
        document.getElementById("contactForm").style.display='none';
    document.getElementById("main").className = '';
    document.getElementById('fname').value='';
    document.getElementById('fmail').value='';
    document.getElementById('fcity').value='';

}
invert=(e)=>{
    this.setState({
        flag:false},() =>{
        this.editEmp(e);
    });

}
add=(e)=>{
        var value={
            name:'',
            email:'',
            City:'',
            gender:''
        };
        value.name=document.getElementById('fname').value;
        value.email=document.getElementById('fmail').value;
        value.City=document.getElementById('fcity').value;
        if(document.getElementById('male').checked)
            value.gender=document.getElementById('male').value;
        else
            value.gender=document.getElementById('female').value;
        document.getElementById('fname').value='';
        document.getElementById('fmail').value='';
        document.getElementById('fcity').value='';
        store.addUser(value);
        this.hide();
        e.preventDefault();
        //console.log(JSON.stringify(value));
    }
    editEmp=(e)=>{
        var value=store.selectedUser;
        document.getElementById("contactForm").style.display='block';
        document.getElementById("main").className = 'main';
        document.getElementById('fname').value=value.name
        document.getElementById('fmail').value=value.email;
        document.getElementById('fcity').value=value.City;
        console.log(this.state.flag);
        e.preventDefault();

    }
editData=(e)=>{
    var value={
        name:'',
        email:'',
        City:'',
        gender:''
    };
    value.name=document.getElementById('fname').value;
    value.email=document.getElementById('fmail').value;
    value.City=document.getElementById('fcity').value;
    if(document.getElementById('male').checked)
        value.gender=document.getElementById('male').value;
    else
        value.gender=document.getElementById('female').value;
    store.editUser(value,store.selectedId);

    console.log(this.state.flag);
    this.renderProfiles();

    document.getElementById('fname').value='';
    document.getElementById('fmail').value='';
    document.getElementById('fcity').value='';
    this.hide();
    e.preventDefault();
}
invert1=()=>{
    this.setState({
        flag:true},() =>{
        this.change();
    });
}
    render(){

        return (
            <div>
                <div id={"main"}>
                <h3>Employee Directory</h3><p>Welcome: {sessionStorage.getItem("mobile")}</p>
                <div className="logout">
                    <button onClick={this.logout}>Logout<i className="fa fa-sign-out" ></i>
                </button></div>
                <div className="add">
                    <button onClick={this.invert1} id={"adde"}>Add employee<i className="fa fa-plus-square"></i>
                    </button></div>
                {this.renderProfiles()}
                </div>
                <div id="contactForm">
                    <form action="#" onSubmit={this.state.flag?this.add.bind(this):this.editData.bind(this)}>
                        <h3>Employee Details</h3>
                        <i onClick={this.hide} className="fa fa-close" id={'close'}></i>
                        <input placeholder="Name" type={"text"} required id={"fname"} ></input>
                        <br/>
                        <input placeholder="Email" type="email"id={"fmail"} required /><br/>
                        <input placeholder="City" type="text"id={"fcity"} required /><br/>
                        <input type="radio" name="gender" value="male" id="male"checked/> Male
                        <input type="radio" name="gender" value="female" id="female"/> Female
                        <br/><br/>
                        <button class="formBtn" type="submit">Submit</button>
                        <button class="formBtn" type="reset">Reset</button>
                    </form>
                </div>
            </div>
        );
    }
}

App.propTypes = propTypes;
export default  observer(App);