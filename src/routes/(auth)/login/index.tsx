import { createFileRoute, Link, useNavigate} from '@tanstack/react-router'
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '@/api/auth';
import { useAuth } from '@/context/AuthContext';
export const Route = createFileRoute('/(auth)/login/')({
  component: LoginPage,
})

function LoginPage() {
  const navigate = useNavigate();
  const {setAccessToken, setUser} = useAuth(); // destructing the states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const {mutateAsync, isPending} = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      setUser(data.user);
      navigate({to: '/Ideas'})
    },
    onError: (err: any) => {
      setError(err.message);
    }
  });

  const handleSubmit = async (e:React.FormEvent) => {
      e.preventDefault();
      setError('');
      await mutateAsync({email, password});
  }
  return(
    <div className='max-w-md mx-auto'>
      <h1 className='text-3xl font-bold mb-2'>Login</h1>
      {error && (
        <div className='text-red-700 bg-red-100 py-2 px-4 rounded mb-4'>
          {error}
      </div>
      )}
      <form onSubmit={handleSubmit} className='space-y-4'>
        
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
          disabled={isPending}>
              {isPending ? 'LoggingIn...' : 'Login' }
          </button>
          
          <p className='text-center text-sm mt-3 '>Dont't have an account?{' '} 
            <Link to='/register'
            className='text-blue-600 hover:underline font-medium'
            >Register</Link>
          </p>
      </form>
    </div>
  )
}