export interface IDragAndDropProps {
    url: string | null;
    handleFileChange: (acceptedFiles: File[]) => void;
}