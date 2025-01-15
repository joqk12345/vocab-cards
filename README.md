# Vocab Cards

A modern web application for managing and learning vocabulary across different domains. Built with React, this application provides an intuitive interface for organizing, reviewing, and exporting vocabulary cards.

![Vocab Cards Demo](demo.gif)

## Features

- **Domain Management**
  - Create and manage multiple vocabulary domains
  - Select multiple domains simultaneously
  - View domain statistics and word counts
  - Organize vocabulary by categories

- **Vocabulary Cards**
  - Display words with phonetics, parts of speech, and definitions
  - Show example sentences with translations
  - Include additional notes and explanations
  - Navigate through cards with previous/next buttons
  - Domain tags for easy identification

- **Data Management**
  - Import vocabulary from Markdown files
  - Export vocabulary to Markdown format
  - Generate PowerPoint presentations for learning
  - Select target domain during import
  - Batch import and export capabilities

- **User Interface**
  - Modern and clean design
  - Responsive layout for different screen sizes
  - Smooth animations and transitions
  - Domain tags and visual indicators
  - Intuitive navigation

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/vocab-cards.git
cd vocab-cards
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Usage

### Importing Vocabulary

1. Prepare a Markdown file with the following format:
```markdown
# Word
- 音标：[phonetic]
- 词性：[part of speech]
- 释义：[definition]
- 例句：[example]
- 翻译：[translation]
- 备注：[notes]
- 解释：[explanation]
```

2. Click the "导入 Markdown" button
3. Select your Markdown file
4. Choose the target domain
5. Confirm import

### Managing Domains

- Create new domains using the "添加领域" button
- Select multiple domains using checkboxes
- View word counts and statistics for each domain
- Use the "全选" button to select all domains

### Reviewing Vocabulary

- Navigate through cards using arrow buttons
- View complete word information including:
  - Phonetics and part of speech
  - Definition and examples
  - Additional notes and explanations
- Filter words by domain
- Track progress through the word list

### Exporting Data

- Export to Markdown: Preserves all word information in text format
- Export to PowerPoint: Creates presentation slides for learning
  - Title slide with domain information
  - Individual slides for each word
  - Example sentences and translations
  - Professional formatting

## Technologies Used

- React 18.2.0
- pptxgenjs 3.12.0 (for PowerPoint export)
- Modern CSS with Flexbox
- Responsive Design

## Development

- `npm start` - Start development server
- `npm test` - Run tests
- `npm run build` - Build for production
- `npm run eject` - Eject from Create React App

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this project for your own learning purposes.
