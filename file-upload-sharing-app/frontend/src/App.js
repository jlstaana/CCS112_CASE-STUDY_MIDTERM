import React from 'react';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <h1>File Upload and Sharing App</h1>
      <FileUpload />
      <FileList />
    </div>
  );
}

export default App;