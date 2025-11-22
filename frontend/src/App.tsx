import {Routes, Route} from 'react-router-dom';
import './App.css'
import TodoViewPage from "./pages/TodoViewPage.tsx";

function App() {

  return (
    <>
        <Routes>
            <Route path={"/"} element={<TodoViewPage/>}></Route>
        </Routes>
    </>
  )
}

export default App
