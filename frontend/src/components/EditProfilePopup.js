import PopupWithForm from "./PopupWithForm";
import React, {useContext, useEffect, useState} from "react";
import {CurrentUserContext} from "../contexts/CurrentUser";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const user = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    if (!user) {
      return;
    }

    setName(user.name);
    setAbout(user.about);
  }, [user, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateUser({
      name,
      about
    });
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      name={'Profile'}
      onClose={onClose}
      onCloseMouse={onClose}
      title={'Редактировать профиль'}
      textSubmit={'Сохранить'}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__info">
        <input
          className="form__box form__box_type_name"
          value={name}
          minLength={2}
          maxLength={40}
          placeholder="Введите имя"
          name="name"
          required=""
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <span className="form__error form-name-error" />
        <input
          className="form__box form__box_type_about"
          value={about}
          minLength={2}
          maxLength={200}
          placeholder="О себе"
          name="about"
          required=""
          onChange={(e) => setAbout(e.currentTarget.value)}
        />
        <span className="form__error form-job-error" />
      </fieldset>
    </PopupWithForm>
  );
}