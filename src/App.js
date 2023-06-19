import './App.css';
import CityFinder from './components/CityFinder';
import DistanceSearch from './components/DistanceSearch';

function App() {
  return (
    <div className="container">
      <div className="nav">
        ZipCity
      </div>
      <CityFinder />
      <DistanceSearch />
    </div>
  );
}

export default App;
