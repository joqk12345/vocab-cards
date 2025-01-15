import React from 'react';

const WordList = ({ words, currentIndex, onSelect }) => {
  const truncateText = (text, maxLength = 30) => {
    if (!text) return '';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  return (
    <div className="word-list-container">
      <h2>词汇列表</h2>
      <div className="word-list-content">
        {words.map((word, index) => (
          <div
            key={index}
            className={`word-list-item ${index === currentIndex ? 'active' : ''}`}
            onClick={() => onSelect(index)}
          >
            <div className="word-list-item-header">
              <span className="word-list-item-word">{word.word}</span>
              <span className="word-list-item-pos">{word.partOfSpeech}</span>
            </div>
            <div className="word-list-item-preview">
              {truncateText(word.definition)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordList; 