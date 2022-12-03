import React, {useState} from 'react';
import Link from "next/link";
import Header from '../../components/Header';
import axios from "axios";
import surl from "../../components/surl";
import {setjwt} from "../../components/getjwt";
import {useRouter} from "next/router";

const Index = () => {
    let router = useRouter();
    let [errorString, setErrorString] = useState('');
    let [emailInput, setEmailInput] = useState('');
    let [nameInput, setNameInput] = useState('');
    let [passwordInput, setPasswordInput] = useState('');

    const nextAction = () => {
        var bodyFormData = new FormData();
        bodyFormData.append('Email', emailInput);
        bodyFormData.append('Name', nameInput);
        bodyFormData.append('Password', passwordInput);
        let res = axios({
            method: 'post',
            url: surl + 'users/create',
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" }
        })
            .then(resp => {
                setjwt(resp.data);
                // redirect to home
                router.push("/home");
            })
            .catch(e => setErrorString(e.response.data))
    }

    return (
        <div>
            <Header selected="account"/>
            <div className="cont">
                <div className="singup_main main">
                    <h2>Создайте новый аккаунт</h2>

                    <div className="forms">
                        <input type="text" placeholder="Имя пользователя" className="singupinput"
                               value={nameInput} onChange={(p) => setNameInput(p.target.value)}/>
                        <input type="email" placeholder="Email" className="singupinput"
                               value={emailInput} onChange={(p) => setEmailInput(p.target.value)}/>
                        <input type="password" placeholder="Пароль" className="singupinput"
                               value={passwordInput} onChange={(p) => setPasswordInput(p.target.value)}/>

                        <div className="singupbtns">

                            <div className="nextbtn" onClick={() => nextAction()}>Далее</div>
                            <Link href="/account/login" legacyBehavior>
                                <a href="/my-app/pages" className="simple_a alreadyhav">Уже есть аккаунт?</a>
                            </Link>

                        </div>

                        <div className={errorString == '' ? "errorbtn hidden" : "errorbtn"}>{errorString}</div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Index;