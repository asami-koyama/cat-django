import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userDataState } from '../function/Atom';

const RouteAuthCheck = (props) => {
  // グローバル変数から操作ユーザのデータを取得
  const status = useRecoilValue(userDataState);
  const component = props.component;
  const redirect = props.redirect;
  const role = props.role;
  console.log(component);

  let navigate = useNavigate();
  if (!role.includes(status.user_type)) {
    navigate(redirect);
  }

  return <>{component}</>;
};

export default RouteAuthCheck;
