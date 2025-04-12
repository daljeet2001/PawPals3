import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import DogwalkerContext from './context/DogwalkerContext.jsx'
import UserContext from './context/User.Context.jsx'
import SocketProvider from './context/SocketContext.jsx'
import RequestContext from './context/Requests.Context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SocketProvider>
      <RequestContext>
    <DogwalkerContext>
      <UserContext>
      <App />
      </UserContext>
    </DogwalkerContext>
    </RequestContext>
    </SocketProvider>
  </StrictMode>
)
