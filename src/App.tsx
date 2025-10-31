import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import PromptGenerator from './components/PromptGenerator';
import MyPromptsPage from './pages/MyPromptsPage';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/generator" element={<PromptGenerator />} />
        <Route path="/my-prompts" element={<MyPromptsPage />} />
      </Routes>
    </div>
  );
}

export default App;
