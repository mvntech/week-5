import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Posts from './components/Posts';
import PostDetails from './components/PostDetails';
import ModifyPost from './components/ModifyPost';
import CreatePost from './components/CreatePost';

const App = () => {
  return (
    // defining router + routes + route + link
    <BrowserRouter>
      <header className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold">GraphQL Blog App</Link>
          <nav className="flex items-center gap-4">
            <Link to="/" className="text-sm text-gray-700 hover:text-gray-900">Blogs</Link>
            <Link to="/create" className="text-sm text-indigo-600 hover:text-indigo-700">Create</Link>
          </nav>
        </div>
      </header>

      <main>
        <Routes>
          <Route path='/' element={<Posts />} />
          <Route path='/create' element={<CreatePost />} />
          <Route path='/post/:id' element={<PostDetails />} />
          <Route path='/modify/:id' element={<ModifyPost />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
