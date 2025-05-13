import { useState, useRef } from "react";
import { Button } from "@radix-ui/themes";
import { FileIcon } from "@radix-ui/react-icons";

const FileUpload = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef();

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    return (
        <>
            <Button onClick={()=>fileInputRef.current.click()}>
                <FileIcon/>
                {selectedFile != null ? selectedFile.name : 'Browse CSV'}
            </Button>
            <input onChange={handleFileChange} multiple={false} ref={fileInputRef} accept=".csv" type='file'hidden/>
        </>
    )
}

export default FileUpload;