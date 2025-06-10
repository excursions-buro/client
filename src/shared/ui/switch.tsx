import React, { useState } from 'react';

interface SwitchProps {
  id?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
}

const Switch: React.FC<SwitchProps> = ({
  checked = false,
  onChange,
  disabled = false,
  label,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const toggleSwitch = () => {
    if (disabled) return;
    setIsChecked(!isChecked);
    if (onChange) {
      onChange(!isChecked);
    }
  };

  return (
    <label
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      <input
        type='checkbox'
        checked={isChecked}
        onChange={toggleSwitch}
        disabled={disabled}
        style={{ display: 'none' }}
      />
      <span
        style={{
          width: '40px',
          height: '20px',
          backgroundColor: isChecked ? '#4ade80' : '#ccc',
          borderRadius: '12px',
          position: 'relative',
          transition: 'background-color 0.3s',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: '2px',
            left: isChecked ? '22px' : '2px',
            width: '16px',
            height: '16px',
            backgroundColor: '#fff',
            borderRadius: '50%',
            transition: 'left 0.3s',
          }}
        />
      </span>
      {label && <span style={{ marginLeft: '8px' }}>{label}</span>}
    </label>
  );
};

export default Switch;
