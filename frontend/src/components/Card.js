import React, {useContext} from 'react';
import {CurrentUserContext} from "../contexts/CurrentUser";

function Card({ photo, onDelete, onLikeClick, onCardClick }) {

  const user = useContext(CurrentUserContext);

  const handleCardClick = () => onCardClick({ name: photo.name, link: photo.link });
  const handleLikeClick = () => onLikeClick(photo._id, isLiked);
  const handleCardDelete = () => onDelete(photo._id);

  const isLiked = photo.likes.some((userId) => userId === user._id);
  const isOwn = photo.owner === user._id;

  return (
    <div className="elements__item">
      <img
        className="elements__photo"
        src={photo.link}
        alt={photo.name}
        onClick={handleCardClick}
      />
      <div className="elements__block">
        <h2 className="elements__title">{photo.name}</h2>
        {isOwn && (
          <button
            className="elements__trash"
            aria-label="active"
            type="button"
            onClick={handleCardDelete}
          />
        )}
        <div className="elements__likes">
          <button
            className={`elements__like ${isLiked ? "elements__like_active" : ""}`}
            aria-label="active"
            type="button"
            onClick={handleLikeClick}
          />
          <div className="elements__counter">{photo.likes.length}</div>
        </div>
      </div>
    </div>
  )
};

export default Card;

