import { Form } from "react-router";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./AddBookModal.module.css";

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddBookModal({ isOpen, onClose }: AddBookModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "";
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  const modalContent = (
    <div 
      className={styles.overlay} 
      ref={overlayRef}
      onClick={handleOverlayClick}
    >
      <div className={styles.modal}>
        <h2 className={styles.title}>Add a new book</h2>
        
        <Form method="post" onSubmit={onClose}>
          <div className={styles.formGroup}>
            <label htmlFor="title" className={styles.label}>
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className={styles.input}
              required
              autoFocus
            />
          </div>

          <button type="submit" className={styles.button}>
            Add book
          </button>
        </Form>
      </div>
    </div>
  );

  // Only use portal on client side
  if (typeof document !== "undefined") {
    return createPortal(modalContent, document.body);
  }

  return null;
}
