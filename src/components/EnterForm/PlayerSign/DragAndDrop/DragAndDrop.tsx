import React from "react";
import {useDropzone} from "react-dropzone";
import {IDragAndDropProps} from "./IDragAndDropProps";

function DragAndDrop(props: IDragAndDropProps) {
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: {
            'image/png': ['.png'],
            'image/jpg': ['.jpg'],
            'image/jpeg': ['.jpeg'],
            'text/html': ['.html', '.htm'],
            'image/svg': ['.svg']
        },
        onDrop: (acceptedFiles: File[]) => {
            props.handleFileChange(acceptedFiles);
        },
    });

    return (
        <>
            <div {...getRootProps()} className="bg-green-500 inline-block mt-4 mb-4 text-black p-1">
                <input {...getInputProps()} />
                {isDragActive ? ("Drop the image here...") : ("Drag 'n' drop the file here, or click here to select the image!")}
            </div>
            {props.url &&
                <>
                    <label className="block mb-2">Your Selected Image:</label>
                    <img className="block mx-auto h-24 w-24 object-cover mb-2" src={props.url} alt=""/>
                </>
            }
        </>
    );
}

export default DragAndDrop;