import PopupWithForm from "./PopupWithForm";
import React, {useRef} from "react";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const link = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateAvatar(link.current.value);
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      name={'change avatar'}
      onClose={onClose}
      onCloseMouse={onClose}
      onSubmit={handleSubmit}
      title={'Обновить аватар'}
      textSubmit={'Сохранить'}
    >
      <fieldset className="form__info">
        <input
          className="form__box form__box_type_link"
          type="url"
          ref={link}
          placeholder="Ссылка на картинку"
          required
        />
      </fieldset>
    </PopupWithForm>
  );
}