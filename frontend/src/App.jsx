import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './Landing';
import Chat from './Chat';
import CreateCharacter from './CreateCharacter';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/create" element={<CreateCharacter />} />
        <Route path="/chat/:characterId" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
