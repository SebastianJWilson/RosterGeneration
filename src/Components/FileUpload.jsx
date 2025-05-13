import { useState } from "react";
import { Button } from "@radix-ui/themes";

const FileUpload = () => {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            {selectedFile && (
                <p>Selected file: {selectedFile.name}</p>
            )}
        </div>
    )
}

export default FileUpload;