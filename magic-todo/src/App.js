import React, {useState, useEffect} from 'react'
import './App.css';
import { v4 as uuidv4} from 'uuid'
import { randomColor} from 'randomcolor'
import Draggable from 'react-draggable'

function App() {
  const [item, setItem] = useState('')
  const [items, setItems] = useState(() => {
    // Отримуємо дані з localStorage або повертаємо порожній масив, якщо значення немає
    const savedItems = localStorage.getItem('items');
    return savedItems ? JSON.parse(savedItems) : [];
  });
  

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const newItem = () => {
    if(item.trim() !== ''){
      const newItem = {
        id: uuidv4(),
        item: item,
        color: randomColor({
          luminosity: 'light',
        }),
        defaultPos: {
          x: -100,
          y: -100
        }
      }
      setItems((items) => [...items, newItem])
      setItem('')
    } else {
      alert('Введіть текст в поле ...')
      setItem('')
    }
    
  }

  return (
    <div className="App">
      <div className="wrapper">
        <input   
          type="text"
          placeholder='Введіть завдання'
          onChange={(e)=>setItem(e.currentTarget.value)}
          />
        <button 
          className='enter'
          onClick={newItem}
        >
            Зберегти

        </button>
      </div>

    </div>
  );
}

export default App;
