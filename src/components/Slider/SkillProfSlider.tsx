/** @jsxImportSource @emotion/react */
import React, { useMemo, useRef, useState } from 'react'

import {
  calculateRatio,
  calculateThumbPositions,
  calculateInputBackgroundColor,
  calculateThumbPositionOnClick,
} from '../../utilities/helpers'

import SliderLabel from './SliderLabel'
import Slider from './Slider'

export interface ISkillProfSliderProps {
  ariaValueText?: string;
  assessment?: number;
  assessmentDotColor?: [string, string];
  benchmark?: number;
  customAssessmentDot?: React.CSSProperties;
  customBenchmarkDot?: React.CSSProperties;
  customOverlapDot?: React.CSSProperties;
  draggable?: boolean;
  gapColors?: [string, string];
  labelStyle?: React.CSSProperties;
  labelTextStyle?: React.CSSProperties;
  min: number;
  max: number;
  onValueChange: (values: [number, number]) => void;
  personName?: string;
  showLabels?: boolean;
  sliderStyle?: React.CSSProperties;
  sliderThumbFocusStyle?: React.CSSProperties;
  sliderTrackColor?: string;
  step?: number;
  railColor?: string;
  values: [number, number];
}

const SkillProfSlider = ({
  ariaValueText = '',
  assessment = 100,
  assessmentDotColor = ['#005f98', '#33947d'],
  benchmark = 50,
  customAssessmentDot,
  customBenchmarkDot,
  customOverlapDot,
  draggable = true,
  gapColors = ['#c62828', '#33947d'],
  labelStyle,
  labelTextStyle,
  min = 0,
  max = 100,
  onValueChange,
  personName = 'Name',
  showLabels = true,
  sliderStyle,
  sliderThumbFocusStyle,
  sliderTrackColor = '#eeeeee',
  step = 1,
  railColor = '#eeeeee',
  values}: ISkillProfSliderProps) => {
  const limitsRef = useRef({ min, max });
  const range1Ref = useRef<HTMLInputElement | null>(null);
  const range2Ref = useRef<HTMLInputElement | null>(null);
  const inputGroupRef = useRef<HTMLDivElement | null>(null);
  const [ showTooltip, setShowTooltip ] = useState(false);

  const thumbPositions = useMemo(() => {
    return calculateThumbPositions({
      limits: limitsRef.current,
      rangeValue1: values[0],
      rangeValue2: values[1],
    });
  }, [values]);

  const onInputDragHandler = () => {
    if (!range1Ref.current || !range2Ref.current) {
        return;
    }

    const rangeValue1 = parseInt(range1Ref.current.value);
    const rangeValue2 = parseInt(range2Ref.current.value);

    onValueChange([rangeValue1, rangeValue2]);
  }

  const sliderBgColor = useMemo(() => {
    if (values[0] > values[1]) {
        sliderTrackColor = gapColors[0];
    } else {
        sliderTrackColor = gapColors[1];
    }
    return calculateInputBackgroundColor({
      thumbPositions,
      sliderTrackColor,
      railColor,
    })
  }, [railColor, thumbPositions, sliderTrackColor]);

  const onInputClickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!inputGroupRef.current) {
        return;
    }

    const { left, width } = inputGroupRef.current.getBoundingClientRect();
    const percentageValueOfClickedPositionX = calculateRatio({ value: e.clientX - left, max: width });

    const { rangeValue1, rangeValue2 } = calculateThumbPositionOnClick({
      limits: limitsRef.current,
      rangeValue1: values[0],
      rangeValue2: values[1],
      percentageValueOfClickedPositionX,
    });

    onValueChange([rangeValue1, rangeValue2]);
  }

  const tooltip = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!inputGroupRef.current) {
        return;
    }
    setShowTooltip(true);
  }

  const thumbStyle = (name: string): React.CSSProperties => {
    if (!range1Ref.current || !range2Ref.current) {
        return;
    }

    let dotStyle: React.CSSProperties;

    const rangeValue1 = parseInt(range1Ref.current.value);
    const rangeValue2 = parseInt(range2Ref.current.value);

    customBenchmarkDot = {
        borderRadius: 0
    }

    if (rangeValue1 === rangeValue2) {
        dotStyle = customOverlapDot;
    } else {
        if (name === 'assessment') {
            dotStyle = customAssessmentDot;
        } else {
            dotStyle = customBenchmarkDot;
        }
    }
    return dotStyle;
  }

  return (
    <div
      css={{
        alignItems: 'center',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        height: 'max-content',
        justifyContent: 'center',
        margin: '0 auto',
        width: 'max-content'}}>
      {showLabels && (
        <SliderLabel
          value={values}
          sliderThumbPositions={thumbPositions}
          labelStyle={labelStyle}
          labelTextStyle={labelTextStyle}
        />
      )}

      <div
        ref={inputGroupRef}
        onMouseDown={(e) => onInputClickHandler(e)}
        onMouseEnter={(e) => tooltip(e)}
        onMouseLeave={(e) => setShowTooltip(false)}
        css={{
          alignItems: 'center',
          borderRadius: '8px',
          display: 'flex',
          height: '4px',
          justifyContent: 'center',
          position: 'relative',
          width: '200px',
          ...sliderStyle,
          background: sliderBgColor,
        }}>

        <label css={{
          position: 'absolute',
          right: 'calc(100% + 12px)',
          top: '-8px',
          display: 'block',
          fontSize: '12px'}}>{min}</label>

        <Slider
          ariaValueText={ariaValueText}
          componentRef={range1Ref}
          draggable={draggable}
          max={max}
          min={min}
          name="benchmark"
          onValueChange={onInputDragHandler}
          sliderThumbColor={assessmentDotColor[0]}
          sliderThumbFocusStyle={sliderThumbFocusStyle}
          sliderThumbStyle={thumbStyle('benchmark') || customBenchmarkDot}
          step={step}
          value={values[0]} />

        <Slider
          ariaValueText={ariaValueText}
          componentRef={range2Ref}
          max={max}
          min={min}
          name="assessment"
          onValueChange={onInputDragHandler}
          sliderThumbColor={assessmentDotColor[1]}
          sliderThumbFocusStyle={sliderThumbFocusStyle}
          sliderThumbStyle={thumbStyle('assessment') || customAssessmentDot}
          step={step}
          value={values[1]} />

        <label css={{
          position: 'absolute',
          left: 'calc(100% + 12px)',
          top: '-8px',
          display: 'block',
          fontSize: '12px'}}>{max}</label>
      </div>
      {showTooltip && (
        <div
          css={{
              backgroundColor: '#666666',
              borderRadius: '4px',
              color: '#ffffff',
              display: 'block',
              fontSize: '12px',
              padding: '8px',
              position: 'relative',
              top: '32px'
          }}>
            <div
            css={{
                fontWeight: '600',
                paddingBottom: '8px'
            }}>Assessment</div>
            <div>{personName}</div>
            <div>Assessment Score: {assessment}</div>
        </div>
      )}
    </div>
  )
}

export default SkillProfSlider