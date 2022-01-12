/** @jsxImportSource @emotion/react */
import React from 'react';

interface ISliderProps {
  ariaValueText?: string;
  componentRef: React.MutableRefObject<HTMLInputElement | null>;
  draggable?: boolean;
  max: number;
  min: number;
  name: string;
  onValueChange: () => void;
  sliderThumbColor?: string;
  sliderThumbFocusStyle?: React.CSSProperties;
  sliderThumbStyle?: React.CSSProperties;
  step: number;
  value: number;
}

const Slider = ({
  ariaValueText,
  componentRef,
  draggable = true,
  max,
  min,
  name,
  onValueChange,
  sliderThumbStyle,
  sliderThumbFocusStyle,
  sliderThumbColor,
  step,
  value}: ISliderProps) => {
  return (
    <>
      <input
        aria-valuemax={max}
        aria-valuemin={min}
        aria-valuenow={value}
        aria-valuetext={ariaValueText}
        disabled={!draggable}
        max={max}
        min={min}
        name={name}
        onChange={onValueChange}
        ref={componentRef}
        step={step}
        type="range"
        value={value}
        css={{
          alignItems: 'center',
          appearance: 'none',
          background: 'transparent',
          display: 'flex',
          height: '100%',
          justifyContent: 'center',
          left: 0,
          margin: 0,
          MozAppearance: 'none',
          outline: 'none',
          padding: 0,
          pointerEvents: 'none',
          position: 'absolute',
          transformOrigin: 'center',
          WebkitAppearance: 'none',
          width: '100%',
          '&::-webkit-slider-runnable-track': {
            background: 'transparent',
            height: '100%',
            width: '100%'
          },
          '&::-webkit-slider-thumb': {
            appearance: 'none',
            background: sliderThumbColor,
            borderRadius: '100%',
            cursor: 'pointer',
            height: '12px',
            MozAppearance: 'none',
            pointerEvents: 'all',
            transition: 'box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1)',
            WebkitAppearance: 'none',
            width: '12px',
            zIndex: 4,
            ...sliderThumbStyle,
          },
          '&:focus::-webkit-slider-thumb': {
            boxShadow: '0px 0px 0px 4px rgba(25, 118, 210, 0.16)',
            ...sliderThumbFocusStyle,
          },
        }} />
    </>
  )
}

export default Slider
