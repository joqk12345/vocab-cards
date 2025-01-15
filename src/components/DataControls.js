import React, { useState, useRef } from 'react';
import pptxgen from "pptxgenjs";
import ImportDialog from './ImportDialog';

const DataControls = ({ currentDomain, domains, onImportData }) => {
  const fileInputRef = useRef(null);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [pendingImportData, setPendingImportData] = useState(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const text = await file.text();
      try {
        const words = parseMarkdown(text);
        setPendingImportData(words);
        setShowImportDialog(true);
      } catch (error) {
        alert('导入失败：文件格式不正确');
      }
      e.target.value = ''; // Reset file input
    }
  };

  const handleImportConfirm = (targetDomain) => {
    if (pendingImportData) {
      onImportData(pendingImportData, targetDomain);
      setPendingImportData(null);
      setShowImportDialog(false);
    }
  };

  const handleImportCancel = () => {
    setPendingImportData(null);
    setShowImportDialog(false);
  };

  const parseMarkdown = (markdown) => {
    const words = [];
    const lines = markdown.split('\n');
    let currentWord = null;

    const extractContent = (line, prefix) => {
      const content = line.slice(prefix.length).trim();
      // 移除 Markdown 加粗语法 **
      return content.replace(/\*\*/g, '');
    };

    for (const line of lines) {
      if (line.startsWith('# ')) {
        if (currentWord) {
          words.push(currentWord);
        }
        currentWord = {
          word: line.slice(2).trim(),
          phonetic: '',
          partOfSpeech: '',
          definition: '',
          example: '',
          translation: '',
          notes: '',
          explanation: ''
        };
      } else if (line.match(/^-\s*\*?\*?音标\*?\*?：/)) {
        currentWord.phonetic = extractContent(line, '-').split('：')[1].trim();
      } else if (line.match(/^-\s*\*?\*?词性\*?\*?：/)) {
        currentWord.partOfSpeech = extractContent(line, '-').split('：')[1].trim();
      } else if (line.match(/^-\s*\*?\*?释义\*?\*?：/)) {
        const content = extractContent(line, '-').split('：')[1].trim();
        // 处理多行释义
        if (content.includes('a.') || content.includes('b.')) {
          currentWord.definition = content.replace(/\s+[a-z]\.\s+/g, '; ');
        } else {
          currentWord.definition = content;
        }
      } else if (line.match(/^-\s*\*?\*?例句\*?\*?：/)) {
        currentWord.example = extractContent(line, '-').split('：')[1].trim();
      } else if (line.match(/^-\s*\*?\*?翻译\*?\*?：/)) {
        currentWord.translation = extractContent(line, '-').split('：')[1].trim();
      } else if (line.match(/^-\s*\*?\*?备注\*?\*?：/)) {
        currentWord.notes = extractContent(line, '-').split('：')[1].trim();
      } else if (line.match(/^-\s*\*?\*?解释\*?\*?：/)) {
        currentWord.explanation = extractContent(line, '-').split('：')[1].trim();
      }
    }

    if (currentWord) {
      words.push(currentWord);
    }

    return words;
  };

  const exportMarkdown = () => {
    const markdown = generateMarkdown();
    downloadFile(`${currentDomain.name}_vocabulary.md`, markdown);
  };

  const exportPPT = async () => {
    const pptx = new pptxgen();
    
    // Set presentation properties
    pptx.author = 'Vocab Cards';
    pptx.title = `${currentDomain.name} - 词汇学习`;
    
    // Create title slide
    const titleSlide = pptx.addSlide();
    titleSlide.background = { color: "F1F1F1" };
    titleSlide.addText(
      `${currentDomain.name} - 词汇学习`,
      { 
        x: 0.5, 
        y: 1, 
        w: '90%', 
        h: 1.5,
        fontSize: 44,
        color: '363636',
        bold: true,
        align: 'center'
      }
    );
    titleSlide.addText(
      `共 ${currentDomain.words.length} 个单词`,
      { 
        x: 0.5, 
        y: 3, 
        w: '90%', 
        h: 0.5,
        fontSize: 24,
        color: '666666',
        align: 'center'
      }
    );

    // Add word slides
    for (const word of currentDomain.words) {
      const slide = pptx.addSlide();
      
      // Set background
      slide.background = { color: "FFFFFF" };
      
      // Add word
      slide.addText(word.word, {
        x: 0.5,
        y: 0.5,
        w: '90%',
        h: 1,
        fontSize: 40,
        bold: true,
        color: '2C3E50',
        align: 'center'
      });
      
      // Add phonetic
      slide.addText(word.phonetic, {
        x: 0.5,
        y: 1.5,
        w: '90%',
        h: 0.5,
        fontSize: 24,
        color: '7F8C8D',
        align: 'center',
        italic: true
      });
      
      // Add part of speech
      slide.addText(word.partOfSpeech, {
        x: 0.5,
        y: 2.2,
        w: '90%',
        h: 0.4,
        fontSize: 20,
        color: 'E74C3C',
        align: 'center',
        italic: true
      });
      
      // Add definition
      slide.addText(word.definition, {
        x: 0.5,
        y: 3,
        w: '90%',
        h: 0.8,
        fontSize: 24,
        color: '34495E',
        align: 'center'
      });
      
      // Add example box
      slide.addShape(pptx.ShapeType.rect, {
        x: 0.5,
        y: 4,
        w: '90%',
        h: 1.5,
        fill: { color: 'F8F9FA' },
        line: { color: '3498DB', width: 2 }
      });
      
      // Add example
      slide.addText([
        { text: word.example + '\n', options: { fontSize: 20, color: '2C3E50', breakLine: true } },
        { text: word.translation, options: { fontSize: 18, color: '7F8C8D', italic: true } }
      ], {
        x: 0.7,
        y: 4.2,
        w: '85%',
        h: 1.2,
        align: 'left'
      });
    }

    // Save the presentation
    await pptx.writeFile(`${currentDomain.name}_vocabulary.pptx`);
  };

  const generateMarkdown = () => {
    return currentDomain.words.map(word => `
# ${word.word}
- 音标：${word.phonetic}
- 词性：${word.partOfSpeech}
- 释义：${word.definition}
- 例句：${word.example}
- 翻译：${word.translation}
    `.trim()).join('\n\n');
  };

  const downloadFile = (filename, content, type = 'text/markdown') => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="data-controls">
        <div className="data-controls-buttons">
          <input
            type="file"
            accept=".md"
            ref={fileInputRef}
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
          <button 
            className="data-button import"
            onClick={() => fileInputRef.current.click()}
          >
            导入 Markdown
          </button>
          <button 
            className="data-button export-md"
            onClick={exportMarkdown}
            disabled={!currentDomain.words.length}
          >
            导出 Markdown
          </button>
          <button 
            className="data-button export-ppt"
            onClick={exportPPT}
            disabled={!currentDomain.words.length}
          >
            导出 PPT
          </button>
        </div>
      </div>
      {showImportDialog && (
        <ImportDialog
          domains={domains}
          onConfirm={handleImportConfirm}
          onCancel={handleImportCancel}
        />
      )}
    </>
  );
};

export default DataControls; 