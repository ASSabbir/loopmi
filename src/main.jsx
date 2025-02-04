import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import {
  
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const queryClient = new QueryClient()
import Routes from './Components/Root/Routes.jsx';
import AuthProvider from './Components/Root/AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <RouterProvider router={Routes} />
    </AuthProvider>
    </QueryClientProvider>
    
  </StrictMode>,
)
