import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Header';
import CatTablePage from './CatTablePage';
import WelcomePage from './WelcomePage';
import UserCreate from './UserCreate';
import Login from './Login';
import CatDetail from './CatDetail';
import Logout from './Logout';
import CatCreate from './CatCreate';
import CatEdit from './CatEdit';
import Chat from './Chat';
import ChatTable from './ChatTable';
import OfferTable from './OfferTable';
import OfferCats from './OfferCats';
import CatsTableRegistered from './CatsTableRegistered';
import { RecoilRoot } from 'recoil';
import UserStatus from '../function/UserStatus';
import RouteAuthCheck from './RouteAuthCheck';

const Router = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <UserStatus />
        <Header />
        <Routes>
          <Route path={`/`} element={<WelcomePage />} />
          <Route
            path={`/adopterusercreate`}
            element={<UserCreate type="Adopter" />}
          />
          <Route
            path={`/supporterusercreate`}
            element={<UserCreate type="Supporter" />}
          />
          <Route path={`/login`} element={<Login />} />
          <Route path={`/logout`} element={<Logout />} />

          <Route
            path={`/cats`}
            element={
              <RouteAuthCheck
                component={<CatTablePage />}
                redirect="/login"
                role={['Adopter', 'Supporter']}
              />
            }
          />
          <Route
            path={`/catDetail/:id`}
            element={
              <RouteAuthCheck
                component={<CatDetail />}
                redirect="/login"
                role={['Adopter', 'Supporter']}
              />
            }
          />
          <Route
            path={`/chat/:partner`}
            element={
              <RouteAuthCheck
                component={<Chat />}
                redirect="/login"
                role={['Adopter', 'Supporter']}
              />
            }
          />
          <Route
            path={`/chatTable/`}
            element={
              <RouteAuthCheck
                component={<ChatTable />}
                redirect="/login"
                role={['Adopter', 'Supporter']}
              />
            }
          />

          <Route
            path={`/offerCats`}
            element={
              <RouteAuthCheck
                component={<OfferCats />}
                redirect="/login"
                role={['Adopter']}
              />
            }
          />

          <Route
            path={`/catCreate`}
            element={
              <RouteAuthCheck
                component={<CatCreate />}
                redirect="/login"
                role={['Supporter']}
              />
            }
          />
          <Route
            path={`/catEdit/:id`}
            element={
              <RouteAuthCheck
                component={<CatEdit />}
                redirect="/login"
                role={['Supporter']}
              />
            }
          />
          <Route
            path={`/catsTableRegistered`}
            element={
              <RouteAuthCheck
                component={<CatsTableRegistered />}
                redirect="/login"
                role={['Supporter']}
              />
            }
          />
          <Route
            path={`/offerTable`}
            element={
              <RouteAuthCheck
                component={<OfferTable />}
                redirect="/login"
                role={['Supporter']}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};
export default Router;
