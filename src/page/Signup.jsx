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
    const storedUsers = JSON.parse(localStorage.getItem('users')) || []
    const userExists = storedUsers.some((user) => user.email === data.email)

    if (userExists) {
      alert('이미 등록된 이메일입니다.')
    } else {
      storedUsers.push(data)
      localStorage.setItem('users', JSON.stringify(storedUsers))
      alert('회원가입 성공')
      navigate('/')
    }
  }

  return (
    <div>
      <header>
        <h1>회원가입</h1>
      </header>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder="이메일을 입력하세요"
            {...register('email', {
              required: '이메일을 입력하세요.',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: '이메일 형식으로 입력하세요.',
              },
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
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
          <button type="submit" className="buttonSignup">
            회원가입
          </button>
          <button
            type="button"
            className="buttonLogin"
            onClick={() => navigate('/')}
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  )
}
