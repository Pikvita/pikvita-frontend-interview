import React from 'react'
import { Link } from 'react-router-dom'

export default function Aside() {
  return (
    <aside className="w-64 bg-gray-100 p-4">
      <nav>
        <ul className="space-y-2">
          <li>
            <Link to="/" className="block hover:bg-gray-200 p-2 rounded">
              Home
            </Link>
          </li>
          <li>
            <Link to="/quiz" className="block hover:bg-gray-200 p-2 rounded">
              Quiz
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
