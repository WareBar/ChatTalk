// import './App.css'

// function App() {


//   return (
//     <>
//     <p className='text-2'>Hello world</p>
//     </>
//   )
// }

// export default App
import { RouterProvider } from "react-router-dom";
import {router} from "./routes/index"
import { AuthProvider } from "./context/AuthContext";

function App(){
  return (
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  )
}


export default App