import {Routes, Route} from 'react-router-dom';
import './App.css'
import TodoViewPage from "./pages/TodoViewPage.tsx";
import TodoDetailsPage from "./pages/TodoDetailsPage.tsx";

function App() {

  return (
    <>
        <Routes>
            <Route path={"/"} element={<TodoViewPage/>}/>
            <Route path={"/todo/:id"} element={<TodoDetailsPage/>}/>
        </Routes>
    </>
  )
}

export default App
