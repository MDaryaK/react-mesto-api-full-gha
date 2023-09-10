import { useEffect } from "react";

export function usePopupEscBtn(isOpen, onClose) {
  useEffect(() => {
    if (!isOpen) return;
    function popupEscapeClose(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener("keydown", popupEscapeClose);

    return () => {
      document.removeEventListener("keydown", popupEscapeClose);
    };
  }, [isOpen]
  );
}
