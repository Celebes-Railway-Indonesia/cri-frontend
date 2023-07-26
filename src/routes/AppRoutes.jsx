import { Route, Routes } from "react-router-dom";
import SpreadSheet from "../components/SpreadSheet";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<SpreadSheet />} />
        </Routes>
    )
}

export default AppRoutes