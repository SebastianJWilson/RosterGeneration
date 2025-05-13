import { useState, useEffect } from 'react';
import FileUpload from './Components/FileUpload'
import HeaderSelector from './Components/HeaderSelector';
import Papa from "papaparse"
import { Table } from '@radix-ui/themes';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  const [parsedData, setParsedData] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [values, setValues] = useState([]);

  const readCSV = () => {
    if (selectedFile == null) return;
    Papa.parse(selectedFile, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        // Parsed Data Response in array format
        setParsedData(results.data);

        // Filtered Column Names
        setTableRows(rowsArray[0]);

        // Filtered Values
        setValues(valuesArray);
      },
    })
  }

  useEffect(readCSV, [selectedFile])

  return (
    <>
      <h1>Roster Generation</h1>
      <FileUpload selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
      <br style={{marginTop:'25px'}}/>
      <HeaderSelector/>
    </>
  )
}

export default App
