// Leftdrop.tsx
import React from "react";

type ModalProps = {
  children: React.ReactNode;
  onClick: () => void;
};

export const Leftdrop = ({ children, onClick }: ModalProps) => {
  return (
    <div
      onClick={onClick}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      {children}
    </div>
  );
};
