import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Main.css'

export default function Main() {
  const navigate = useNavigate()
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    try {
      const loggedInUserId = localStorage.getItem('loggedInUserId')
      console.log('loggedInUserId:', loggedInUserId)
      if (loggedInUserId) {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || []
        console.log('storedUsers:', storedUsers)
        const user = storedUsers.find(
          (user) => user.id.toString() === loggedInUserId
        )
        console.log('loggedInUser:', user)
        if (user) {
          setLoggedInUser(user)
        } else {
          setError('사용자를 찾을 수 없습니다.')
        }
      } else {
        setError('로그인된 사용자가 없습니다.')
      }
    } catch (err) {
      console.error('Error loading data:', err)
      setError('데이터 로딩 중 오류가 발생했습니다.')
    }
    setLoading(false)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('loggedInUserId')
    navigate('/')
  }

  if (loading) {
    return <div>로딩 중...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div>
      <header>
        {loggedInUser ? (
          <div>
            <span>{loggedInUser.email}님 환영합니다!</span>
            <button onClick={handleLogout}>로그아웃</button>
          </div>
        ) : (
          <button onClick={() => navigate('/')}>로그인</button>
        )}
      </header>
      <h1>메인 페이지</h1>
    </div>
  )
}
