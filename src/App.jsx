import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom'
import Login from './page/Login'
import Signup from './page/Signup'
import Main from './page/Main'
import './App.css'

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  )
}

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}


