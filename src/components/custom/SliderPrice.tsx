
import { Slider } from '../ui/slider'
import { cn } from '@/lib/utils'

import { Box } from './Box'
import { useCallback, useState } from 'react';
import { InputText } from './InputText';


interface Props {
  max?: number;
  min?: number;
  label?: string;
  typeCoin?: string;
  onChange: (value: number) => void;
}

export const SliderPrice = ({ max = 1000, min = 0, onChange, typeCoin, label }: Props) => {
  const [value, setValue] = useState(0);

  const handleSliderChange = useCallback(
    (newValue: number[]) => {
      const newSliderValue = newValue[0];
      if (newSliderValue !== value) {
        setValue(newSliderValue);
        onChange(newSliderValue);
      }
    },
    [value, onChange]
  );

  const handleTextChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(event.target.value);
      if (newValue >= min && newValue <= max && newValue !== value) {
        setValue(newValue);
        onChange(newValue);
      }
    },
    [value, min, max, onChange]
  );

  return (
    <Box className='flex flex-col gap-3 mt-2'>
      <InputText label={label} className='flex gap-2 items-center w-[150px] text-sm' type='number' onChange={handleTextChange} value={value} />
      <Slider
        defaultValue={[0]}
        min={min}
        max={max}
        value={[value]}
        onValueChange={handleSliderChange}
        step={1}
        className={cn("w-[80%]")}

      />
    </Box>
  )
}

