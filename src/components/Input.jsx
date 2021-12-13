import React from 'react';

const Input = ({ label, name, defaultValue, type, required }) => {
  return (
    <div className='grid grid-cols-2 items-center'>
      <label htmlFor={name} className='tracking-wide mb-2'>{label}</label>
      <input
        required={required}
        type={type}
        name={name}
        className='inputTextE text-gray-600 w-64'
        defaultValue={defaultValue} />
    </div>
  );
};

export default Input;
