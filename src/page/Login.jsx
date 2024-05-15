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
    const storedUser = JSON.parse(localStorage.getItem('user'))

    if (storedUser) {
      const { email, password } = storedUser

      if (email === data.email && password === data.password) {
        alert('로그인 성공')
        navigate('/main')
      } else {
        alert('이메일 또는 비밀번호가 일치하지 않습니다.')
      }
    } else {
      alert('등록된 사용자가 없습니다.')
    }
  }
  return (
    <div>
      <header>
        <h1>Login</h1>
      </header>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder="Email"
            {...register('email', {
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: '이메일 형식으로 입력해주세요.',
              },
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
          <input
            type="password"
            placeholder="Password"
            {...register('password', {
              required: true,
              minLength: 4,
              maxLength: 4,
              pattern: {
                value: /^[0-9]*$/,
                message: '숫자 1~9까지 4자리 숫자를 입력하세요',
              },
            })}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}

          <button type="submit">Login</button>
          <button type="button" onClick={navigate('/Signup')}>
            Signup
          </button>
        </form>
      </div>
    </div>
  )
}
