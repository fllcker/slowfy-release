import {deleteCookie, getCookie, hasCookie, setCookie} from "cookies-next";

export function getjwt() {
    if (hasCookie('token')) {
        return getCookie('token')
    } else return null;
}

export function setjwt(tok: string) {
    return setCookie('token', tok, {
        maxAge: 604800 // 7 days
    })
}

export function removejwt() {
    return deleteCookie('token');
}