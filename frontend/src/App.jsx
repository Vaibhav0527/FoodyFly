import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Nav from './components/Nav'
import { useDispatch } from 'react-redux'
import useGetCity from './hooks/useGetCity'
import UserDashboard from './components/UserDashboard'
import OwnerDashboard from './components/OwnerDashboard'
import useGetCurrentUser from './hooks/useGetCurrentUser'
import useGetMyShopData from './hooks/useGetMyShopData'
import CreateEditShop from './pages/CreateEditShop'
import AddItem from './pages/AddItem'
import EditItem from './pages/EditItem'

export const serverUrl="http://localhost:5000"
function App() {
  const dispatch=useDispatch()
  useGetCity()
  useGetCurrentUser()  
useGetMyShopData()
   
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OwnerDashboard />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/create-edit-shop" element={<CreateEditShop />} />
     <Route path="/add-item" element={<AddItem />} />
      <Route path="/edit-item/:itemId" element={<EditItem />} />
      </Routes>
    </Router>
  )
}

export default App
