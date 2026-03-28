import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Nav from './components/Nav'
import { useDispatch } from 'react-redux'
import useGetCity from './hooks/useGetCity'
import UserDashboard from './components/UserDashboard'

function App() {
  const dispatch=useDispatch()
  useGetCity()
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserDashboard />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

      </Routes>
    </Router>
  )
}

export default App
