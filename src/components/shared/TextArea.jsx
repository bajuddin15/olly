import React from "react";

const TextArea = ({ label, name, rows, value, onChange }) => {
  return (
    <div className="space-y-4">
      <label htmlFor={name}>{label}</label>
      <textarea
        name={name}
        id={name}
        style={{ scrollbarWidth: "none" }}
        className="bg-gray-100 text-sm w-full rounded-lg border border-gray-300 outline-none p-4"
        rows={rows}
        value={value}
        onChange={onChange}
      ></textarea>
    </div>
  );
};

export default TextArea;
