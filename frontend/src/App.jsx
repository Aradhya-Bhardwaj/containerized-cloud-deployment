import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('Loading...')

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => setMessage('Error fetching from backend: ' + err.message))
  }, [])

  return (
    <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'sans-serif' }}>
      <h1>🎉 MERN CI/CD Deployment Project</h1>
      <div style={{
        marginTop: '30px',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        display: 'inline-block'
      }}>
        <h2>Backend Status:</h2>
        <p style={{ fontSize: '1.2em', color: message.includes('Error') ? 'red' : 'green' }}>
          <strong>{message}</strong>
        </p>
      </div>
      <p style={{ marginTop: '50px', color: '#666' }}>
        If you see a success message above, your CI/CD pipeline and Docker network are configured correctly!
      </p>
    </div>
  )
}

export default App
