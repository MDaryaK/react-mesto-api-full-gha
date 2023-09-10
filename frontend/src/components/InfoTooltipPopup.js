import { usePopupEscBtn } from "../utils/usePopupEscBtn.js";

import InfoSuccess from "../images/infoSuccess.svg";
import ErrorSuccess from "../images/infoError.svg";

function InfoTooltipPopup({ type, isOpen, onClose }) {

  usePopupEscBtn(isOpen, onClose);

  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`} onClick={onClose}>
      <div className="popup__tooltip_container">
        <button
          className="popup__close popup__close_type-photo"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        />
        {type === "success" ? (
          <>
            <img className="popup__tooltip_icon" src={InfoSuccess} alt="" />
            <p className="popup__tooltip_text">Вы успешно зарегистрировались!</p>
          </>
        ) : (
          <>
            <img className="popup__tooltip_icon" src={ErrorSuccess} alt="" />
            <p className="popup__tooltip_text">Что-то пошло не так! Попробуйте ещё раз!</p>
          </>
        )}
      </div>
    </div>
  );
}


export default InfoTooltipPopup;
