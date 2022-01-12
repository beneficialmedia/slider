import React, { useState } from 'react';
import SkillProfSlider from './components/Slider/SkillProfSlider';

import './App.scss';

const App = ({}: {}) => {
  const [value, setValue] = useState([50, 100]);
  const onValueChange = (values) => {
    setValue(values);
  };
  return (
    <main className="App">
      <header className="App-header">
        Skills Assessment Slider
      </header>
      <section>
        <SkillProfSlider assessment={value[1]} benchmark={value[0]} customBenchmarkDot={{borderRadius: '0'}} draggable={true} max={100} min={0} onValueChange={onValueChange} personName={"Dylan Kilgore"} step={1} values={[value[0], value[1]]} />
      </section>
    </main>
  );
}

export default App;
