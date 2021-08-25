/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Home.css";
import {useLocation, Redirect} from 'react-router-dom'
import useractions from "../store/user/useractions";
import {useDispatch} from "react-redux";

const {Kakao} = window as any
let add = ""
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === "development") {
    add = "http://localhost:3000/admin";
} else {
    add = "https://admin.byker.io/admin";
}

function loginWithKakao() {
    Kakao
        .Auth
        .logout(function () {
            Kakao
                .Auth
                .authorize({throughTalk: false, redirectUri: add})
        });

}

const Home = () => {
    console.log('Home()');

    const [code,
        setCode] = React.useState('');
    const dispatch = useDispatch();
    let location = useLocation();

    const handleCode = async(nextCode : string) => {
        if (!nextCode) 
            return null;
        setCode(nextCode);
    }

    React.useEffect(() => {
        if (location.search.indexOf('?code=') >= 0) {
            const code = location
                .search
                .split('?code=')[1];
            handleCode(code);
        }
    }, [location]);

    React.useEffect(() => {
        if (code) {
            console.log({code})
            dispatch(useractions.fetchSignIn.request({code, uri: add}));
            <Redirect to="/home" />
        }
    }, [code, dispatch])

    return (
        <div className="container">
            <div className="div-one">
                <img
                    id="cloud"
                    src="https://bykerlogin.s3.ap-northeast-2.amazonaws.com/3525.svg"
                    alt="alternative text"
                    width="20%"
                    height="100%"/>
            </div>
            <div className="div-two">
                <img
                    id="logo"
                    src="https://bykerlogin.s3.ap-northeast-2.amazonaws.com/3526.svg"
                    alt="alternative text"
                    width="150"
                    height="100%"/>
            </div>
            <div className="div-two">
                <a id="custom-login-btn" href="#">
                    <img
                        onClick={loginWithKakao}
                        src="https://k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
                        width="222"
                        alt="alt"/>
                </a>
            </div>
            <div className="div-two">
                <img
                    id="city"
                    src="https://bykerlogin.s3.ap-northeast-2.amazonaws.com/3524.svg"
                    alt="alternative text"
                    width="width"
                    height="20%"/>
            </div>
        </div>

    );

}

export default Home;
