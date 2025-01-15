import React, { useState } from 'react';

const DomainSelector = ({ 
  domains, 
  currentDomain, 
  selectedDomains,
  onDomainChange, 
  onDomainSelect,
  onAddDomain 
}) => {
  const [selectAll, setSelectAll] = useState(false);

  const handleDomainClick = (domain) => {
    const newSelected = new Set(selectedDomains);
    if (newSelected.has(domain.id)) {
      if (newSelected.size > 1) { // 确保至少有一个领域被选中
        newSelected.delete(domain.id);
      }
    } else {
      newSelected.add(domain.id);
    }
    onDomainSelect(newSelected);
    onDomainChange(domain);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      onDomainSelect(new Set([currentDomain.id]));
    } else {
      onDomainSelect(new Set(domains.map(d => d.id)));
    }
    setSelectAll(!selectAll);
  };

  const handleAddDomain = () => {
    const name = prompt('请输入新领域名称：');
    if (name && name.trim()) {
      onAddDomain(name.trim());
    }
  };

  const getTotalWords = (domainIds) => {
    return domains
      .filter(d => domainIds.has(d.id))
      .reduce((sum, d) => sum + d.words.length, 0);
  };

  return (
    <div className="domain-selector">
      <div className="domain-header">
        <h2>学习领域</h2>
        <div className="domain-header-actions">
          <button className="select-all-button" onClick={handleSelectAll}>
            {selectAll ? '取消全选' : '全选'}
          </button>
          <button className="add-domain-button" onClick={handleAddDomain}>
            添加领域
          </button>
        </div>
      </div>
      
      <div className="domain-stats">
        <div className="stat-item">
          <span className="stat-label">已选择：</span>
          <span className="stat-value">{selectedDomains.size} 个领域</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">单词总数：</span>
          <span className="stat-value">{getTotalWords(selectedDomains)} 个</span>
        </div>
      </div>

      <div className="domain-list">
        {domains.map(domain => (
          <button
            key={domain.id}
            className={`domain-button ${domain.id === currentDomain.id ? 'active' : ''} ${selectedDomains.has(domain.id) ? 'selected' : ''}`}
            onClick={() => handleDomainClick(domain)}
          >
            <div className="domain-button-content">
              <span className="domain-name">{domain.name}</span>
              <span className="word-count">({domain.words.length})</span>
            </div>
            {selectedDomains.has(domain.id) && (
              <span className="checkmark">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DomainSelector; 