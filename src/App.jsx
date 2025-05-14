import { useState, useEffect } from 'react';
import FileUpload from './Components/FileUpload'
import HeaderSelector from './Components/HeaderSelector';
import Papa from "papaparse"
import { TextArea } from '@radix-ui/themes';

import { PersonIcon, ClockIcon } from '@radix-ui/react-icons';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  const [tableRows, setTableRows] = useState([]);
  const [values, setValues] = useState([]);

  const [nameHeader, setNameHeader] = useState(Number)
  const [ageHeader, setAgeHeader] = useState(Number)

  const [areaData, setTextArea] = useState(String)

  const readCSV = () => {
    if (selectedFile == null) {
      setTableRows([])
      setValues([])
      return
    };
    Papa.parse(selectedFile, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        setTableRows(rowsArray[0]);
        setValues(valuesArray);
      },
    })
  }

  useEffect(readCSV, [selectedFile])

  useEffect(() => {
    var dataString = ''
    for (let i = 0; i < values.length; i++) {
      var fullName = values[i][nameHeader]
      var age = values[i][ageHeader]
      const [lastName, firstName] = fullName.split(', ')
      dataString += firstName+' '+lastName+' '+String(Math.floor(Number(age)))+' years\n'
    }
    dataString = dataString.trim()
    setTextArea(dataString)
  }, [nameHeader, ageHeader])

  return (
    <>
      <h1>Roster Generation</h1>
      <FileUpload selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
      <br style={{ marginTop: '25px' }} />
      {tableRows != null && tableRows.length > 0 && (<>
        <HeaderSelector icon={<PersonIcon />} tableRows={tableRows} setHeader={setNameHeader} />
        {' '}
        <HeaderSelector icon={<ClockIcon />} tableRows={tableRows} setHeader={setAgeHeader} />
        <br style={{ marginTop: '25px' }} />
        <div className="DataTextAreaWrapper">
          <TextArea id='DataTextArea' value={areaData} placeholder='Formatted String...' readOnly />
        </div>
      </>)}
    </>
  )
}

export default App
