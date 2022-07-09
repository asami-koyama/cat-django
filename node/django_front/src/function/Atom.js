import { atom } from "recoil";

export const isLoginState = atom({
    key: "isLogin",
    default: false,
});

export const userDataState = atom({
    key: "userData",
    default: {username: '', user_type: '', id: null , email: ''},
    });