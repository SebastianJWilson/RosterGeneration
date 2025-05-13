import { useState } from 'react';
import FileUpload from './Components/FileUpload'

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <>
      <h1>Roster Generation</h1>
      <FileUpload selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
      <p>{selectedFile != null && 'Has File' || ''}</p>
    </>
  )
}

export default App
