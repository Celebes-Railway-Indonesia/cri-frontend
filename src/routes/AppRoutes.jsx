import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import SheetData from "../views/SheetData";
import SheetChart from "../views/SheetChart";
import Graph from "../components/Graph";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<SheetData />} />
        <Route path="/chart" element={<SheetChart />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
