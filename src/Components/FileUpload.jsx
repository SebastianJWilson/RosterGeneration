import { useState, useRef } from "react";
import { Button } from "@radix-ui/themes";
import { FileIcon, TrashIcon } from "@radix-ui/react-icons";

const FileUpload = ({selectedFile, setSelectedFile}) => {
    const fileInputRef = useRef();

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const deleteFile = () => {
        setSelectedFile(null);
    }

    return (
        <>
            <Button onClick={()=>fileInputRef.current.click()}>
                <FileIcon/>
                {selectedFile != null ? selectedFile.name : 'Browse CSV'}
            </Button>{' '}
            {selectedFile && (
                <Button color="red" onClick={deleteFile}>
                    <TrashIcon style={{ transform: 'scale(1.25)' }}/>
                </Button>
            )}
            <input onChange={handleFileChange} multiple={false} ref={fileInputRef} accept=".csv" type='file'hidden/>
        </>
    )
}

export default FileUpload;