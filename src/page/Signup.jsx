import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import './Signup.css'

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate()

  const onSubmit = (data) => {
    localStorage.setItem('user', JSON.stringify(data))
    alert('회원가입 성공')
    navigate('/')
  }

  return (
    <div>
      <header>
        <h1>Signup</h1>
      </header>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder="test@test.com"
            {...register('email', {
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: '이메일 형식으로 입력하세요.',
              },
            })}
          />
          {errors.email && (
            <p className="error">{errors.email.message?.toString()}</p>
          )}
          <input
            type="password"
            placeholder="패스워드를 입력하세요."
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
            <p className="error">{errors.password.message?.toString()}</p>
          )}
          <button type="submit" className="buttonSignup">
            Signup
          </button>
          <button
            type="button"
            className="buttonLogin"
            onClick={() => navigate('/')}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
