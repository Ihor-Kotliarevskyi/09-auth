"use client"

import React, { useEffect, type ReactNode } from "react";
import css from "./Modal.module.css";
interface ModalProps {
  readonly onClose?: () => void | undefined;
  readonly children: ReactNode | React.ReactElement<{ onClose?: () => void }>;
}

interface ChildProps {
  readonly onClose?: () => void;
}

function Modal({ onClose, children }: ModalProps) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose?.();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        {React.isValidElement<ChildProps>(children)
          ? React.cloneElement(children, { onClose })
          : children}
      </div>
    </div>
  );
}

export default Modal;
