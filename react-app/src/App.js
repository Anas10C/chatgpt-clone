
import CloseableTabs from './components/CloseableTabs';
import CreateTopic from './components/CreateTopic';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<CreateTopic/>} />
          <Route exact path="/chat" element={<CloseableTabs/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
