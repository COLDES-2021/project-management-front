import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

const DropDown = ({ label, name, defaultValue = '', required, options }) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const optionsSelect = [['', 'Seleccione una opción', true], ...Object.entries(options)];
  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);
  return (
    <div className='grid grid-cols-2 items-center'>
      <label htmlFor={name} className='tracking-wide mb-2'>{label}</label>
      <select
        required={required}
        name={name}
        className='inputTextE text-gray-600 w-64'
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}>
        {optionsSelect.map((o) => {
          return (
            <option key={nanoid()} value={o[0]} disabled={o[2] ?? false}>
              {o[1]}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default DropDown;
