import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App.tsx'
import './index.css'
import DatePickerTest from './components/DatePicker.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
    <DatePickerTest />
    </ChakraProvider>
  </React.StrictMode>,
)
