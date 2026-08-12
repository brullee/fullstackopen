import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App'
import '../index.css'

const queryClient = new QueryClient()
import { NotificationContextProvider } from './context/NotificationContext'
import { BlogsContextProvider } from './context/BlogsContext'
import { LoggedInUserContextProvider } from './context/LoggedInUserContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <LoggedInUserContextProvider>
        <NotificationContextProvider>
          <BlogsContextProvider>
            <App />
          </BlogsContextProvider>
        </NotificationContextProvider>
      </LoggedInUserContextProvider>
    </QueryClientProvider>
  </Router>,
)
