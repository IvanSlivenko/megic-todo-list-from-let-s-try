import React, { useState, useEffect } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { randomColor } from 'randomcolor';
import Draggable from 'react-draggable';

function App() {
  const [item, setItem] = useState('');
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('items');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const newItem = () => {
    if (item.trim() !== '') {
      const newItem = {
        id: uuidv4(),
        item,
        color: randomColor({
          luminosity: 'light',
        }),
        defaultPos: {
          x: 500,
          y: -500,
        },
      };
      setItems((items) => [...items, newItem]);
      setItem(''); // Очищуємо поле після додавання
    } else {
      alert('Введіть текст в поле ...');
      setItem('');
    }
  };

  const deleteItem = (id) => {
    setItems((items) => items.filter((item) => item.id !== id)); // Видаляємо елемент за id
  };

  const updatePos = (data, index) => {
    const newArray = [...items];
    newArray[index].defaultPos = { x: data.x, y: data.y };
    setItems(newArray); // Оновлюємо `items` зі зміненою позицією
  };

  return (
    <div className="App">
      <div className="wrapper">
        <input
          type="text"
          placeholder="Введіть завдання"
          value={item} // Прив'язуємо значення поля введення
          onChange={(e) => setItem(e.currentTarget.value)}
        />
        <button className="enter" onClick={newItem}>
          Зберегти
        </button>
      </div>
      {items.map((item, index) => (
        <Draggable 
          key={item.id} 
          position={item.defaultPos}
          onStop={(_, data) => updatePos(data, index)}
        >
          <div className="todo__item" style={{ backgroundColor: item.color }}>
            {item.item}
            <button
              className="delete"
              onClick={() => deleteItem(item.id)} // Додаємо функціонал видалення
            >
              x
            </button>
          </div>
        </Draggable>
      ))}
    </div>
  );
}

export default App;


