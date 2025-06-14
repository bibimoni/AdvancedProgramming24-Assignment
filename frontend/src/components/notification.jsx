import React from "react";

const Notification = ({ message, type, onClose }) => {
    if (!message) return null;

    const bgColor = type === "error" ? "bg-red-500" : "bg-green-500";

    return (
        <div
            className={`fixed top-4 right-4 p-4 rounded shadow-lg text-white ${bgColor}`}
            role="alert"
        >
            <span>{message}</span>
            <button
                className="ml-4 text-white font-bold"
                onClick={onClose}
                aria-label="Close"
            >
                ×
            </button>
        </div>
    );
};

export default Notification;