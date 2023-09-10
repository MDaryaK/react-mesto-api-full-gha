import React, {useEffect, useState} from 'react';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import { api } from '../utils/api';
import {CurrentUserContext} from "../contexts/CurrentUser";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import {Route, Switch, withRouter} from "react-router-dom";
import InfoTooltipPopup from "./InfoTooltipPopup";
import ProtectedRouter from "./ProtectedRouter";
import AuthForm from "./AuthForm";

function App(props) {
  const [isAuth, setIsAuth] = useState(true);
  const [userEmail, setUserEmail] = useState();

  const [infoTooltipType, setInfoTooltipType] = React.useState("success")

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false)
  const [isImagePopupOpened, setIsImagePopupOpened] = React.useState(false)
  const [isInfoTooltipPopupOpened, setIsInfoTooltipPopupOpened] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({
    name: '',
    link: '',
  });
  const [cardDeleteNumb, setCardDeleteNumb] = React.useState('');

  const [currentUser, setCurrentUser] = React.useState(null);
  const [cards, setCards] = React.useState([]);

  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!isAuth) {
      return;
    }

    Promise.all([
      api.getUserInfo(token),
      api.getInitialCards(token)
    ])
      .then(([userInfo, initialCards]) => {
        setCards(initialCards)
        setCurrentUser(userInfo)
      })
      .catch(errorMessage => {
        console.error(`Операция не выполнена ${errorMessage}`)
      })
  }, [isAuth]);

  useEffect(() => {
    checkToken().catch((e) => console.log(e));
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setIsImagePopupOpened(true);
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsImagePopupOpened(false);
    setIsInfoTooltipPopupOpened(false);
    setSelectedCard({
      name: '',
      link: ''
    })
  }

  function handleDeletePopup(cardId) {
    setCardDeleteNumb(cardId)
    setIsDeleteCardPopupOpen(true);
  }

  function handleCardDelete() {
    api
      .deleteCard(cardDeleteNumb, token)
      .then(() => {
        setCards((cards) => cards.filter(item => {
          return item._id !== cardDeleteNumb;
        }));
        closeAllPopups()
      })
      .catch(errorMessage => {
        console.error(`Операция не выполнена ${errorMessage}`)
      })
  }

  async function handleCardCreate(name, link) {
    try {
      const data = await api.createNewCard(name, link, token);
      setCards((cards) => [data, ...cards]);

      closeAllPopups();
    } catch (e) {
      console.log(e);
    }
  }

  async function handleLikeClick(cardId, isLiked) {
    try {
      const card = !isLiked ? await api.addLike(cardId, token) : await api.deleteLike(cardId, token);

      setCards((cards) => cards.map((item) => {
        if (item._id === card._id) {
          return card;
        }

        return item;
      }));
    } catch (e) {
      console.log(e);
    }
  }

  async function handleUpdateAvatar(link) {
    try {
      await api.updateUserAvatar(link, token);

      setCurrentUser((user) => ({
        ...user,
        avatar: link
      }));

      closeAllPopups();
    } catch (e) {
      console.log(e);
    }
  }

  async function handleUpdateUser(data) {
    try {
      await api.setUserInfo(data, token);

      setCurrentUser((user) => ({
        ...user,
        ...data
      }));

      closeAllPopups();
    } catch (e) {
      console.log(e);
    }
  }

  async function checkToken() {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsAuth(false);
        return;
      }

      const data = await api.getUserInfoAuth(token);
      setUserEmail(data.email);
    } catch (e) {
      console.log(e);

      setIsAuth(false);
      localStorage.removeItem("token");
    }
  }

  async function handleLogin(email, password) {
    try {
      const { token } = await api.login(email, password);

      localStorage.setItem("token", token);

      setUserEmail(email);
      setIsAuth(true);
      props.history.push("/");
    } catch (e) {
      console.log(e);

      await setInfoTooltipType("error");
      setIsInfoTooltipPopupOpened(true);
    }
  }

  async function handleRegister(email, password) {
    try {
      await api.register(email, password);

      setIsAuth(true);
      props.history.push("/sign-in");

      await setInfoTooltipType("success");
    } catch (e) {
      console.log(e);

      await setInfoTooltipType("error");
    }

    setIsInfoTooltipPopupOpened(true);
  }

  function handleSignout() {
    setUserEmail(null);
    localStorage.removeItem("token");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route path="/" exact>
            <ProtectedRouter isAuth={isAuth}>
              <Main
                email={userEmail}
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onDeleteCard={handleDeletePopup}
                onLikeClick={handleLikeClick}
                onSignout={handleSignout}
              />
              <Footer />
            </ProtectedRouter>
          </Route>
          <Route path="/sign-in" children={<AuthForm type="login" onAuth={handleLogin} />} />
          <Route path="/sign-up" children={<AuthForm type="register" onAuth={handleRegister} />} />
        </Switch>
      </div>

      <InfoTooltipPopup
        type={infoTooltipType}
        isOpen={isInfoTooltipPopupOpened}
        onClose={closeAllPopups}
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <DeleteCardPopup
        isOpen={isDeleteCardPopupOpen}
        onClose={closeAllPopups}
        onCardDelete={handleCardDelete}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleCardCreate}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <ImagePopup
        name={'popup__photo'}
        isOpen={isImagePopupOpened}
        onClose={closeAllPopups}
        onCloseMouse={closeAllPopups}
        card={selectedCard}
      />
    </CurrentUserContext.Provider>

  )
}
export default withRouter(App);
