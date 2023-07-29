import React, { FC, ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 flex items-center   justify-center z-50 ${
        isOpen ? "visible" : "invisible"
      }`}
    >
      <div
        className="relative container mx-auto w-11/12 md:w-2/3 max-w-lg bg-white  p-4 rounded-md shadow-lg"
        style={{ zIndex: 10 }}
      >
        {children}
        <button
          className="cursor-pointer bg-red-600 absolute top-0 right-0 mt-4 mr-5 text-white hover:bg-red-500 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
          aria-label="close modal"
          role="button"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-x"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
      <div
        className="fixed inset-0 bg-black opacity-20 "
        style={{ zIndex: 0 }}
        onClick={onClose}
      ></div>
    </div>
  );
};

export default Modal;
