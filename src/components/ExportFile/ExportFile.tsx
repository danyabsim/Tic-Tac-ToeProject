import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {exportHistoryToFile} from "../../redux/historySlice";

export function ExportFile() {
    const dispatch = useDispatch();

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            // Your logic here, for example, show a confirmation message
            const confirmationMessage = 'Are you sure you want to leave?';
            event.returnValue = confirmationMessage; // Standard for most browsers
            dispatch(exportHistoryToFile());
            return confirmationMessage; // For some older browsers
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        // Cleanup the event listener when the component is unmounted
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [dispatch]);
}