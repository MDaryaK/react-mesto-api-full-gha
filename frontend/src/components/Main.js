import React, {useContext} from 'react';
import Card from './Card.js';

import {CurrentUserContext} from "../contexts/CurrentUser";
import Header from "./Header";
import {Link} from "react-router-dom";

function Main({
  email,
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onLikeClick,
  onDeleteCard,
  onSignout
}) {
  const user = useContext(CurrentUserContext);

  return (
    <>
      <Header>
        <div>
          <span className="header__email">{email}</span>
          <Link
            className="header__link header__link-signout"
            to="/sign-in"
            onClick={onSignout}
          >
            Выйти
          </Link>
        </div>
      </Header>
      <main className="main">
        <section className="profile">
          <button className="profile__avatar-button" type="button" onClick={onEditAvatar}>
            <img
              className="profile__photo"
              src={user?.avatar}
              alt="Аватар"
            />
          </button>
          <div className="profile__info">
            <div className="profile__title-wrapper">
              <h1 className="profile__title">{user?.name}</h1>
              <button className="profile__add-button" type="button" onClick={onEditProfile} />
            </div>
            <p className="profile__subtitle">{user?.about}</p>
          </div>
          <button className="profile__button" aria-label="active" type="button" onClick={onAddPlace} />
        </section>
        <section className="elements">
          {cards.map(item => (
            <Card
              key={item._id}
              photo={item}
              onCardClick={onCardClick}
              onLikeClick={onLikeClick}
              onDelete={onDeleteCard}
            />
          ))}
        </section>
      </main>
    </>
  )
}

export default Main;
