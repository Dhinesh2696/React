import React from 'react';


export default class Login extends React.Component {



handleSubmit=(e)=>{
    var phoneno = /^\d{10}$/;
    var mob= document.getElementById("im").value;
    if(mob.match(phoneno))
    {
        var pwd=document.getElementById("ip").value;
        if(mob==="7708911096"&&pwd==="test"){

            document.getElementById("im").value="";
            document.getElementById("ip").value="";
            e.preventDefault();
            sessionStorage.setItem("mobile",mob);
            this.validate();
        }
        else{
            document.getElementById("im").value="";
            document.getElementById("ip").value="";
            alert("login failed");
            return false;
        }
    }
    else
    {
        document.getElementById("im").value="";
        document.getElementById("ip").value="";
        alert("Mobile not valid");
        return false;
    }


}
    validate(){
        this.props.history.push("/content");

    }


    render() {

        return (
            <div>
                <div id={"header"}>
                    <h1 id={"htext"}>
                        <center>Employee Portal</center>
                    </h1>
                </div>
                <div id={"content"}>
                    <form id={"f1"} onSubmit={this.handleSubmit}>
                        <label id={"lm"}>Mobile: </label>
                        <i className="fa fa-mobile-phone" id={"fam"}></i>
                        <input type={"text"} required id={"im"} maxLength={10}></input>
                        <br/><br/>
                        <label id={"lp"}>Password: </label>
                        <i className="fa fa-lock" id={"fam"}></i>
                        <input type={"password"} required id={"ip"} maxLength={30}/>
                        <br/><br/>
                        <button type={"submit"} id={"bs"}   >Login<i className="fa fa-sign-out" ></i></button>
                        <button type={"reset"} id={"bc"}>Cancel<i className="fa fa-close" ></i></button>
                    </form>
                </div>
            </div>
        );
    }
}