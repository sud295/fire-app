import './App.css';
import Map from './Map'

const fetchDataAndSaveToFile = async (apiKey) => {
  try {
    const apiUrl = `https://firms.modaps.eosdis.nasa.gov/api/area/csv/${apiKey}/VIIRS_SNPP_NRT/world/1/2023-10-07`;
    const response = await axios.get(apiUrl);

    const blob = new Blob([response.data], { type: 'text/csv' });
    saveAs(blob, 'data.csv');

    console.log('Data saved successfully.');
  } catch (error) {
    console.error('Error fetching or saving data:', error);
  }
};

const App = () => {
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    fetch('/keys.yml')
      .then((response) => response.text())
      .then((yamlText) => {
        const config = yaml.load(yamlText);
        setApiKey(config.apiKey);
      });
  }, []);

  useEffect(() => {
    if (apiKey) {
      const fetchDataInterval = setInterval(() => {
        fetchDataAndSaveToFile(apiKey);
      }, 10 * 60 * 1000); // 10 minutes in milliseconds

      // Cleanup the interval when the component unmounts
      return () => clearInterval(fetchDataInterval);
    }
  }, [apiKey]);

  return (
    <div className="App">
      <header className="App-header">
        <Map/>
      </header>
    </div>
  );
};

export default App;
