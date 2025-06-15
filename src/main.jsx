import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

function App() {
  return (
    <div className="text-3xl font-bold text-center text-blue-600 mt-10">
      Tailwind 빌드 정상 작동 중 ✅
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
