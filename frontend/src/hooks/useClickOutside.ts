import { RefObject, useEffect } from "react";

const PORTAL_SELECTOR =
  '[data-slot="dialog-portal"],[data-slot="dialog-overlay"],[data-slot="dialog-content"],[data-slot="popover-portal"],[data-slot="popover-content"],[data-slot="alert-dialog-portal"],[data-slot="alert-dialog-overlay"],[data-slot="alert-dialog-content"],[role="dialog"],[role="alertdialog"]';

export function useClickOutside<T extends HTMLElement, U extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  onOutsideClick: () => void,
  ignoreRef?: RefObject<U | null>
) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (ref.current && ref.current.contains(target)) return;
      if (ignoreRef?.current && ignoreRef.current.contains(target)) return;
      if (target instanceof Element && target.closest(PORTAL_SELECTOR)) return;
      onOutsideClick();
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, onOutsideClick, ignoreRef]);
}
