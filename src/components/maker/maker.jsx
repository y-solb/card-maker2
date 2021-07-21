import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './maker.module.css';
import Header from '../header/header';
import Editor from '../editor/editor';
import Preview from '../preview/preview';

const Maker = ({ FileInput, authService }) => {
  const [cards, setCards] = useState({
    1: {
      id: '1',
      date: '2021년 05월 08일',
      feeling: 'happy',
      fileName: 'sunnyDay',
      fileURL: '/imgs/0508.png',
      title: '날씨는 맑음',
      contents: '오늘은 그러했다.',
    },
    2: {
      id: '2',
      date: '2021년 05월 09일',
      feeling: 'sad',
      fileName: 'rain',
      fileURL: null,
      title: '날씨는 비옴',
      contents: '오늘은 무슨 일이?!',
    },
    3: {
      id: '3',
      date: '2021년 05월 10일',
      feeling: 'angry',
      fileName: 'rainbow',
      fileURL: null,
      title: '비 온 뒤 무지개',
      contents: '내일은 오늘보다 좋길.',
    },
  });
  const history = useHistory();

  const onLogout = () => {
    authService.logout();
  };

  useEffect(() => {
    authService.onAuthChange((user) => {
      if (!user) {
        history.push('/');
      }
    });
  });

  const createOrUpdateCard = (card) => {
    setCards((cards) => {
      const updated = { ...cards };
      updated[card.id] = card;
      return updated;
    });
  };

  const deleteCard = (card) => {
    setCards((cards) => {
      const updated = { ...cards };
      delete [card.id];
      return updated;
    });
  };

  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor
          FileInput={FileInput}
          cards={cards}
          addCard={createOrUpdateCard}
          updateCard={createOrUpdateCard}
          deleteCard={deleteCard}
        />
        <Preview cards={cards} />
      </div>
    </section>
  );
};

export default Maker;
