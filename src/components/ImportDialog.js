import React, { useState } from 'react';

const ImportDialog = ({ domains, onConfirm, onCancel }) => {
  const [selectedDomain, setSelectedDomain] = useState(domains[0]?.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    const domain = domains.find(d => d.id === selectedDomain);
    if (domain) {
      onConfirm(domain);
    }
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <h3>选择导入领域</h3>
        <form onSubmit={handleSubmit}>
          <div className="dialog-body">
            <label className="domain-select-label">
              请选择要导入到的领域：
              <select 
                value={selectedDomain} 
                onChange={(e) => setSelectedDomain(Number(e.target.value))}
                className="domain-select"
              >
                {domains.map(domain => (
                  <option key={domain.id} value={domain.id}>
                    {domain.name} ({domain.words.length}个单词)
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="dialog-footer">
            <button type="button" className="dialog-button cancel" onClick={onCancel}>
              取消
            </button>
            <button type="submit" className="dialog-button confirm">
              确认导入
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImportDialog; 