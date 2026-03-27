import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/welcome";
import Dashboard from "./pages/admin/dashboard";


function App() {
  return (
  
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            
        </Routes>
      </BrowserRouter>
  );
}

export default App;