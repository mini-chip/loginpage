import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Main.css'

export default function Main() {
  const navigate = useNavigate()

  const [loggedInUser, setLoggedInUser] = useState(null)

  useEffect(() => {
    const loggedInUserData = localStorage.getItem('loggedInUserId')

    if (loggedInUserData) {
      setLoggedInUser(loggedInUserData)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('loggedInUserId')
    navigate('/')
  }

  return (
    <div>
      <header>
        {loggedInUser ? (
          <div>
            <span>{loggedInUser}님 환영합니다!</span>
            <button className={'buttonLogout'} onClick={handleLogout}>
              로그아웃
            </button>
          </div>
        ) : (
          <button className={'buttonLogin'} onClick={() => navigate('/')}>
            로그인
          </button>
        )}
      </header>
      <h1>메인 페이지</h1>
    </div>
  )
}
