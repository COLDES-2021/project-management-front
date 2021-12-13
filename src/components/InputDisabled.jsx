import React from 'react';

const InputDisabled = ({ label, name, defaultValue, type, required }) => {
  return (
    <div className='grid grid-cols-2 items-center'>
      <label htmlFor={name} className='tracking-wide mb-2'>{label}</label>
      <input
        required={required}
        type={type}
        name={name}
        className='inputTextD text-gray-600 w-64'
        defaultValue={defaultValue}
        disabled='true' />
    </div>
  );
};

export default InputDisabled;
