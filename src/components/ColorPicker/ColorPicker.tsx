import React from 'react';

interface ColorPickProps {
  children?: React.ReactNode;
  func?: (e: any) => void;
}

const ColorPicker: React.FC<ColorPickProps> = (cpPrps: ColorPickProps) => {
  return (
    <p>
      <br />
      <span onClick={cpPrps.func} id='green'>
        Green
      </span>
      <span onClick={cpPrps.func} id='orange'>
        Oringe
      </span>
      <span onClick={cpPrps.func} id='red'>
        Red
      </span>
      <span onClick={cpPrps.func} id='erase'>
        Erase
      </span>
    </p>
  );
};

export default ColorPicker;
