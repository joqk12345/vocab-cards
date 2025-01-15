import React from 'react';

const VocabCard = ({ word, onPrevious, onNext, isFirst, isLast }) => {
  if (!word) return null;

  return (
    <div className="card-section">
      <div className="vocab-card">
        <div className="word-section">
          <div className="domain-tag">{word.domainName}</div>
          <h1>{word.word}</h1>
          {word.phonetic && <div className="phonetic">{word.phonetic}</div>}
          {word.partOfSpeech && <div className="part-of-speech">{word.partOfSpeech}</div>}
        </div>
        
        <div className="definition-section">
          <div className="definition">{word.definition}</div>
          {word.explanation && (
            <div className="explanation">
              <div className="explanation-label">解释</div>
              <div className="explanation-content">{word.explanation}</div>
            </div>
          )}
          {word.notes && (
            <div className="notes">
              <div className="notes-label">备注</div>
              <div className="notes-content">{word.notes}</div>
            </div>
          )}
        </div>
        
        {(word.example || word.translation) && (
          <div className="example-section">
            {word.example && <div className="example-english">{word.example}</div>}
            {word.translation && <div className="example-chinese">{word.translation}</div>}
          </div>
        )}
      </div>
      
      <div className="navigation-buttons">
        <button 
          className="nav-button" 
          onClick={onPrevious}
          disabled={isFirst}
        >
          ← 上一个
        </button>
        <button 
          className="nav-button" 
          onClick={onNext}
          disabled={isLast}
        >
          下一个 →
        </button>
      </div>
    </div>
  );
};

export default VocabCard; 