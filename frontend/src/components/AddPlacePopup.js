import PopupWithForm from "./PopupWithForm";
import React, {useEffect, useState} from "react";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen])

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddPlace(name, link);
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      name={'create place'}
      onClose={onClose}
      onCloseMouse={onClose}
      onSubmit={handleSubmit}
      title={'Новое место'}
      textSubmit={'Создать'}
    >
      <fieldset className="form__info">
        <input
          className="form__box form__box_type_name"
          value={name}
          placeholder="Название"
          minLength={2}
          maxLength={30}
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <span className="form__error form-place-error form__error_active">
          </span>
        <input
          className="form__box form__box_type_link"
          type="url"
          value={link}
          placeholder="Ссылка на картинку"
          required
          onChange={(e) => setLink(e.currentTarget.value)}
        />
        <span className="form__error form-web-error form__error_active">
          </span>
      </fieldset>
    </PopupWithForm>
  );

}