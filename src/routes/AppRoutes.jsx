import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import SheetData from "../components/SheetData";
import SheetChart from "../components/SheetChart";
import Graph from "../components/Graph";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<SheetData />} />
        {/* <Route path="/" element={<Graph />} /> */}
        <Route path="/chart" element={<SheetChart />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
