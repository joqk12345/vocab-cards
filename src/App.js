import React, { useState, useMemo } from 'react';
import './App.css';
import VocabCard from './components/VocabCard';
import DomainSelector from './components/DomainSelector';
import DataControls from './components/DataControls';
import WordList from './components/WordList';

// Sample data with domains
const initialDomains = [
  {
    id: 1,
    name: '商务英语',
    words: [
      {
        word: "endeavor",
        phonetic: "/ɪnˈdevər/",
        partOfSpeech: "verb",
        definition: "努力；尽力；力图",
        example: "She endeavored to keep her business running during difficult times.",
        translation: "她努力在困难时期维持企业的运营。"
      }
    ]
  },
  {
    id: 2,
    name: '技术英语',
    words: [
      {
        word: "resilient",
        phonetic: "/rɪˈzɪljənt/",
        partOfSpeech: "adjective",
        definition: "有弹性的；能快速恢复的；适应力强的",
        example: "The team proved to be resilient in the face of challenges.",
        translation: "面对挑战，这个团队表现出了强大的适应力。"
      }
    ]
  },
  {
    id: 3,
    name: '日常英语',
    words: []
  }
];

function App() {
  const [domains, setDomains] = useState(initialDomains);
  const [currentDomain, setCurrentDomain] = useState(domains[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDomains, setSelectedDomains] = useState(new Set([domains[0].id]));

  // 合并所有选中领域的单词
  const allSelectedWords = useMemo(() => {
    return domains
      .filter(domain => selectedDomains.has(domain.id))
      .flatMap(domain => domain.words.map(word => ({
        ...word,
        domainName: domain.name // 添加领域名称以便显示
      })));
  }, [domains, selectedDomains]);

  const handleDomainChange = (domain) => {
    setCurrentDomain(domain);
    setCurrentIndex(0);
  };

  const handleDomainSelect = (domainIds) => {
    setSelectedDomains(new Set(domainIds));
    // 如果当前选中的领域被取消选中，则切换到第一个选中的领域
    if (!domainIds.has(currentDomain.id)) {
      const firstSelectedDomain = domains.find(d => domainIds.has(d.id));
      if (firstSelectedDomain) {
        setCurrentDomain(firstSelectedDomain);
        setCurrentIndex(0);
      }
    }
  };

  const handleAddDomain = (name) => {
    const newDomain = {
      id: domains.length + 1,
      name,
      words: []
    };
    setDomains([...domains, newDomain]);
  };

  const handleImportData = (words, targetDomain) => {
    const updatedDomains = domains.map(domain => {
      if (domain.id === targetDomain.id) {
        return {
          ...domain,
          words: [...domain.words, ...words]
        };
      }
      return domain;
    });
    setDomains(updatedDomains);
    setCurrentDomain(updatedDomains.find(d => d.id === targetDomain.id));
  };

  const handlePrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(allSelectedWords.length - 1, prev + 1));
  };

  const handleWordSelect = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>词汇学习卡片</h1>
        <DataControls
          currentDomain={currentDomain}
          domains={domains}
          onImportData={handleImportData}
        />
      </div>
      <div className="main-content">
        <div className="sidebar">
          <DomainSelector
            domains={domains}
            currentDomain={currentDomain}
            selectedDomains={selectedDomains}
            onDomainChange={handleDomainChange}
            onDomainSelect={handleDomainSelect}
            onAddDomain={handleAddDomain}
          />
        </div>
        <div className="center-panel">
          <VocabCard
            word={allSelectedWords[currentIndex]}
            onPrevious={handlePrevious}
            onNext={handleNext}
            isFirst={currentIndex === 0}
            isLast={currentIndex === allSelectedWords.length - 1}
          />
        </div>
        <WordList
          words={allSelectedWords}
          currentIndex={currentIndex}
          onSelect={handleWordSelect}
        />
      </div>
    </div>
  );
}

export default App;
