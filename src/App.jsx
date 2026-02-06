import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/Home/homeScreen';
import LoginScreen from './screens/Login/loginScreen';
import RegisterScreen from './screens/Register/registerScreen';
import StoriesScreen from './screens/Stories/storiesScreen';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/stories" element={<StoriesScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
