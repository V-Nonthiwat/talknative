import React, { Component } from 'react';
import './LoginPage.css';

class LoginPage extends Component {

    constructor() {
        super();
        this.state = {
            username: "",
            password: ""
        }
    }

    usernameChanged() {
        this.setState({
            username: this.refs.username.value
        });
    }

    passwordChanged() {
        this.setState({
            password: this.refs.password.value
        });
    }

    submit(event) {
        console.log(this.state);

        let u = this.state.username;

        fetch('/login/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "username": u,
                "password": this.state.password
            })
        })
            .then(response => {
                return response.json();
            }).then(body => {
                console.log(body);
                if (body.isOk && body.username == u) {
                    this.props.action(u);
                    window.location = "/selectRoom";
                } else {
                    alert('Invalid username or password!');
                }
            });
        event.preventDefault();
    }

    render() {
        return (
            <div className="LoginPage">
                <div className="KeeImage"></div>
                <div className="KeeTitle">TALKNATIVE</div>
                <div className="LoginPanel">
                    <div className="sign" >Sign in</div>
                    <br/>
                    <br/>
                    <div className="Rform" >
                        <form>
                            <input type="text" ref="username" placeholder="USERNAME" onChange={this.usernameChanged.bind(this)} />
                            <input type="password" ref="password" placeholder="PASSWORD" onChange={this.passwordChanged.bind(this)} />
                            <input type="submit" value="SUBMIT" onClick={this.submit.bind(this)} />
                        </form>
                        <br />
                        <a href="/register">Sign up</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;
