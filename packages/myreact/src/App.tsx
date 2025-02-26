import {useState} from 'react'


function App() {
  const [count, setCount] = useState(0)
  const [count2, setCount2] = useState(0)

  function a(x) {
    if (true) {
      return x
    } else if (false) {
      return x + 1
    } else if (false) {
      return x + 1
    } else {
      return 4 // 3rd path
    }
  }

  return (
    <>

      <div className="card">

      </div>
    </>
  )
}

export default App
