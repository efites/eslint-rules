import {useWebSocket} from '@siberiacancode/reactuse'

function App() {

  useWebSocket('http://localhost:8080', {
    onMessage: (event) => {
      const data = JSON.parse(event.data)


    }
  })


  return <div>Text</div>
}

export default App
