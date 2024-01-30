import { useState } from 'react';
import dynamic from 'next/dynamic';

const Calendar = dynamic(()=>import('./calendar/calendar'))
const ExerciseGuide = dynamic(()=>import('./exerciseguide/exerciseguide'))
const Timer = dynamic(()=>import('./timer/timer'))

const Menu = () => {
  const [activeMenu, setActiveMenu] = useState('exerciseGuide');

  const renderComponent = () => {
    switch (activeMenu) {
      case 'exerciseGuide':
        return <ExerciseGuide />;
      case 'timer':
        return <Timer />;
      case 'calendar':
        return <Calendar />;
      default:
        return null;
    }
  };

  return (
    <div className='w-screen h-screen'>
      <nav className='w-full border-b-2 border-wine p-4'>
        <ul className='w-full flex flex-row justify-around'>
          <li onClick={() => setActiveMenu('exerciseGuide')}>Exercise Guide</li>
          <li onClick={() => setActiveMenu('timer')}>Timer</li>
          <li onClick={() => setActiveMenu('calendar')}>Calendar</li>
        </ul>
      </nav>
      {renderComponent()}
    </div>
  );
};

export default Menu;