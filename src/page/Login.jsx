import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import './Login.css'

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate()

  const onSubmit = (data) => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) //delay
    console.log(storedUsers)
    const user = storedUsers.find(
      (user) => user.email === data.email && user.password === data.password
    )
    console.log('Found User:', user)
    if (user) {
      alert('로그인 성공')
      localStorage.setItem('loggedInUserId', user.email)
      navigate('/main')
    } else {
      alert('이메일 또는 비밀번호가 일치하지 않습니다.')
    }
  }

  return (
    <div>
      <header>
        <h1>로그인</h1>
      </header>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder="이메일"
            {...register('email', {
              required: '이메일을 입력하세요.',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: '이메일 형식으로 입력해주세요.',
              },
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
          <input
            type="password"
            placeholder="비밀번호"
            {...register('password', {
              required: '비밀번호를 입력하세요.',
              minLength: {
                value: 4,
                message: '비밀번호는 4자리여야 합니다.',
              },
              maxLength: {
                value: 4,
                message: '비밀번호는 4자리여야 합니다.',
              },
              pattern: {
                value: /^[0-9]*$/,
                message: '숫자 1~9까지 4자리 숫자를 입력하세요',
              },
            })}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}

          <button type="submit" className="buttonLogin">
            로그인
          </button>
          <button
            type="button"
            className="buttonSignup"
            onClick={() => navigate('/signup')}
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  )
}
