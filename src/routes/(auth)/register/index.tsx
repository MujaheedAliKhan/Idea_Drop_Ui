import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext'; // to set the user and accessToken
import { registerUser } from '@/api/auth';

export const Route = createFileRoute('/(auth)/register/')({
  component: RegisterPage,
})

function RegisterPage() {
  const navigate = useNavigate();
  const {setAccessToken, setUser} = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const {mutateAsync, isPending} = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      setUser(data.user);
      navigate({to: '/Ideas'})
    },
    onError: (err: any) => {
      setError(err.message)
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await mutateAsync({name, email, password});
    } catch (err: any) {
        console.log(err.message);
    }
  }
  return(
    <div className='max-w-md mx-auto'>
      <h1 className='text-3xl font-bold mb-2'>Register</h1>
      {
        error && (
          <div className='px-4 py-2 bg-red-100 text-red-700 mb-4 rounded'>
              {error}
          </div>
        )
      }
      <form onSubmit={handleSubmit} className='space-y-4'>
          <input 
          type="text" 
          className='w-full p-2 border border-gray-400 rounded-lg'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)} />

           <input 
          type="text" 
          className='w-full p-2 border border-gray-400 rounded-lg'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)} />

           <input 
          type="text" 
          className='w-full p-2 border border-gray-400 rounded-lg'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)} />

          <button className='transition p-2 rounded-lg font-semibold w-full text-white border bg-blue-500 hover:bg-blue-800 disabled:opacity-50'
          disabled= {isPending}>
              {isPending ? 'Registering...' : 'Register'}
          </button>
          
          <p className='text-center text-sm mt-3 '>Already have an account?{' '}
            <Link to='/login'
            className='text-blue-600 hover:underline font-medium'
            >Login</Link>
          </p>
      </form>
    </div>
  )
}
