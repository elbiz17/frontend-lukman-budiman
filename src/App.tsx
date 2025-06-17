import { BrowserRouter } from 'react-router';
import AppRoutes from './routes';

function App() {
  

  return (
    <div className=''>
      <BrowserRouter>
        <AppRoutes/>
      </BrowserRouter>
    </div>
  )
}

export default App
