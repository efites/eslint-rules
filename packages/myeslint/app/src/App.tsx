import {Route, Routes} from 'react-router-dom'
import {Main} from './pages/Main'
import {NotFound} from './pages/NotFound'
import styles from './App.module.scss';



function App() {


  return <div className={styles.app}>
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  </div>
}

export default App
