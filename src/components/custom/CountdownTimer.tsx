"use client"
import { useTimer } from 'react-timer-hook';
import { Box } from './Box';
import { Button } from '../ui/button';

interface Props {
  timeSeconds: number
}
export const CountdownTimer = ({ timeSeconds = 300 }: Props) => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + timeSeconds);

  const { seconds, minutes, isRunning, restart } = useTimer({
    expiryTimestamp: time,
    onExpire: () => console.log('El tiempo ha terminado!'),
  });
  return (
    <Box className='flex flex-col justify-center items-center w-full '>
      <Box className=' se w-[300px] text-center text-stone-500'>
        <h4>Tiempo Restante</h4>
        <Box className='text-emerald-500 font-semibold text-xl'>
          <span>{minutes}</span>:<span>{seconds < 10 ? `0${seconds}` : seconds}</span>
        </Box>
        {!isRunning && <p className='text-red-400/85'>¡El tiempo ha terminado!</p>}
        <Button variant='ghost' onClick={() => restart(time)}>Regresar</Button>
      </Box>
    </Box>
  );
}

