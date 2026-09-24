import { useState, useEffect } from 'react';

export default function Contador(props:any) {
    const {initialMinute = 30,initialSeconds = 0} = props;
    const [ minutes, setMinutes ] = useState(initialMinute);
    const [seconds, setSeconds ] =  useState(initialSeconds);
    useEffect(()=>{
    let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
            };
    });
  return (
      <div className='flex items-center justify-between gap-4 px-6 py-4 mb-6 border-[3px] border-ink bg-mist shadow-hard'>
        <span className='bh-eyebrow'><span className='w-3 h-3 rounded-full bg-ink' /> Tiempo restante</span>
        { minutes === 0 && seconds === 0
            ? <span className='text-2xl font-black'>0:00</span>
            : <span className='text-3xl font-black tabular-nums'>{minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</span>
        }
      </div>
  )
}
