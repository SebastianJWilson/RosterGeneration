import { useState, useEffect } from 'react';
import FileUpload from './Components/FileUpload'
import HeaderSelector from './Components/HeaderSelector';
import Papa from "papaparse"
import { TextArea, Text, Heading } from '@radix-ui/themes';

import { PersonIcon, ClockIcon } from '@radix-ui/react-icons';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  const [tableRows, setTableRows] = useState([]);
  const [values, setValues] = useState([]);

  const [nameHeader, setNameHeader] = useState(0)
  const [ageHeader, setAgeHeader] = useState(1)

  const [areaData, setTextArea] = useState(String)

  const updateTextArea = () => {
    var namesArr = []
    console.log(ageHeader, nameHeader)
    // Format each row in the csv
    for (let i = 0; i < values.length; i++) {
      var fullName = values[i][nameHeader]
      var age = values[i][ageHeader]
      const [lastName, firstName] = fullName.split(', ')
      namesArr.push(firstName+' '+lastName+' '+String(Math.floor(Number(age)))+' years\n')
    }
    // Sort the array of formatted strings
    namesArr.sort()
    // Append all strings together
    setTextArea(namesArr.join('').trim())
  }

  const readCSV = () => {
    if (selectedFile == null) {
      setTableRows([])
      setValues([])
      setTextArea("")
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

        updateTextArea()
      },
    })
  }

  useEffect(readCSV, [selectedFile])
  useEffect(updateTextArea, [nameHeader, ageHeader, tableRows])

  
  return (
    <>
      <Heading size={"8"} style={{padding:'20px 0 20px 0'}}>Roster Generation</Heading>
      <FileUpload selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
      <br style={{ marginTop: '25px' }} />
      {tableRows != null && tableRows.length > 0 && (<>
        <Text>Select the header for name & age</Text>
        <br style={{marginBottom:"5px"}}/>
        <HeaderSelector icon={<PersonIcon />} tableRows={tableRows} setHeader={setNameHeader} defaultIndex={0} />
        {' '}
        <HeaderSelector icon={<ClockIcon />} tableRows={tableRows} setHeader={setAgeHeader} defaultIndex={1}/>
        <br style={{ marginTop: '25px' }} />
        <div className="DataTextAreaWrapper">
          <TextArea id='DataTextArea' value={areaData} placeholder='Formatted String...' readOnly />
        </div>
      </>)}
      <footer>Created by Sebastian Wilson</footer>
    </>
  )
}

export default App
