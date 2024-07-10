import './App.css';
import Upload from './components/Upload';
import Home from './components/Home'
import Header from './components/Header'
import CustomVideos from './components/CustomVideos'
import Data from './components/Data';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <>
  
    <Router>
    <Header />
    
      <Routes>
      <Route path="/" element ={<Home />} />
        <Route path="/home" element ={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/customvideos" element={<CustomVideos />} />
        <Route path="/data" element ={<Data />} />

        </Routes>
        </Router>
    </>
  );
}

export default App;
