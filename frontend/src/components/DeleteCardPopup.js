import React from "react";

import PopupWithForm from "./PopupWithForm";

export default function DeleteCardPopup({ isOpen, onClose, onCardDelete }) {

  const handleCardDelete = (e) => {
    e.preventDefault();

    onCardDelete();
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      name={'delete card'}
      onClose={onClose}
      onCloseMouse={onClose}
      onSubmit={handleCardDelete}
      title={'Вы уверены?'}
      textSubmit={'Да'}
    />
  );
}