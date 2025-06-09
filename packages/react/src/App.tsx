function App() {
  const a = 5
  const message = {id: 1}
  const query = `SELECT * FROM users WHERE id = ${message.id}`;
  console.log(query)

  return (
    <>
      <div className="card">
        Content...
      </div>
    </>
  )
}

export default App
