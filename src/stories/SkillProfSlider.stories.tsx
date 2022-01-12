/** @jsxImportSource @emotion/react */
import { useArgs } from '@storybook/client-api';
import SkillProfSlider from '../components/Slider/SkillProfSlider';

export default {
  title: "Components/SkillProfSlider",
  component: SkillProfSlider,
  argTypes: { onValueChange: { action: "onValueChange" } },
}

const Template = args => {
  const [values, updateArgs] = useArgs();
  const handleChange = () => updateArgs(values);
  return (
    <div css={{position: 'relative', top: '100px', fontFamily: 'sans-serif'}}>
      <SkillProfSlider max={100} min={0} onValueChange={handleChange} step={1} values={[values[0], values[1]]} {...args} />
    </div>
  );
};

export const Slider = Template.bind({})
Slider.args = {
  ariaValueText: '',
  assessment: 100,
  assessmentDotColor: ['#005f98', '#33947d'],
  benchmark: 50,
  customAssessmentDot: {},
  customBenchmarkDot: {borderRadius: '0'},
  customOverlapDot: {},
  draggable: true,
  gapColors: ['#c62828', '#33947d'],
  labelStyle: {},
  labelTextStyle: {},
  min: 0,
  max: 100,
  personName: 'Foo',
  showLabels: true,
  sliderStyle: {},
  sliderThumbFocusStyle: {},
  sliderTrackColor: '#eeeeee',
  step: 1,
  railColor: '#eeeeee',
  values: [50, 100]
}