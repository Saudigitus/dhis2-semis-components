import classNames from "classnames";
import styles from "./modal.module.css";
import React, { useEffect, useRef } from "react";
import { ModalProps } from "../../types/modal/ModalProps";
import { Modal, ModalTitle, ModalContent } from "@dhis2/ui";

function ModalComponent(props: ModalProps): React.ReactElement {
  const modalRef: React.MutableRefObject<HTMLDivElement | undefined> = useRef();
  const { open, title, children, handleClose, position = "middle", size = "large", isClickAway = false } = props;

  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (modalRef.current && !modalRef?.current?.contains(event.target) && isClickAway) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleClickOutside);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.addEventListener('keydown', handleClickOutside);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClose]);

  return (
    <React.Fragment>
      {
        open ?
          <div ref={modalRef as any}>
            <Modal
              position={position}
              className={classNames(styles.modalContainer, styles[size])}
            >
              <div className={styles.closeModalButton}>
                <button
                  onClick={() => handleClose()}
                >
                  <svg height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M4.284 3.589l.07.057L8 7.293l3.646-3.647a.5.5 0 01.765.638l-.057.07L8.707 8l3.647 3.646a.5.5 0 01-.638.765l-.07-.057L8 8.707l-3.646 3.647a.5.5 0 01-.765-.638l.057-.07L7.293 8 3.646 4.354a.5.5 0 01.638-.765z" fill="currentColor"></path></svg>
                </button>
              </div>
              <ModalTitle>{title}</ModalTitle>
              <ModalContent>{children}</ModalContent>
            </Modal>
          </div>
          : null
      }
    </React.Fragment>

  );
}

export default ModalComponent;

