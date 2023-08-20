import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App.tsx'
import './index.css'
import CustomTable from './components/Table.tsx'
import CustomDualBoxList from './components/CustomDualBoxList.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
    <CustomDualBoxList listOneOptions={["item1" , "item2" , "item3" , "item4" , "item1" , "item2" , "item3" , "item4" , "item1" , "item2" , "item3" , "item4"  ]} />
    </ChakraProvider>
  </React.StrictMode>,
)
