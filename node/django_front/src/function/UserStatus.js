import axios from 'axios';
import { userDataState } from './Atom';
import { isLoginState } from './Atom';
import { useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

const UserStatus = () => {
  const API_AUTH_URL = 'http://192.168.150.201:8000/api/auth/';
  const setUserData = useSetRecoilState(userDataState);
  const setisLogin = useSetRecoilState(isLoginState);
  const isLogin = useRecoilValue(isLoginState);

  console.log('userStatus');

  useEffect(() => {
    console.log('②');
    if (localStorage.getItem('user') !== null) {
      const accessToken = JSON.parse(localStorage.getItem('user'));

      axios
        .get(API_AUTH_URL + 'users/me/', {
          headers: { Authorization: 'JWT ' + accessToken.access },
        })
        .then((res) => {
          console.log(res.data);
          setUserData(res.data);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 401) {
            localStorage.removeItem('user');
            setisLogin(false);
            setUserData({
              username: '',
              user_type: '',
              id: null,
              email: '',
            });
          }
        });
    } else {
      setUserData({ username: '', user_type: '', id: null, email: '' });
    }
  }, [isLogin]);
};

export default UserStatus;
