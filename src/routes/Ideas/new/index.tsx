import { createFileRoute} from '@tanstack/react-router'
import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import {useMutation} from '@tanstack/react-query'
import { createIdea } from '@/api/ideas'

export const Route = createFileRoute('/Ideas/new/')({
  component: IdeasNewPage,
})

function IdeasNewPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const { mutateAsync, isPending} = useMutation({
    mutationFn: createIdea,
    onSuccess: () => {
      navigate({to: '/Ideas'})
    }
  })

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();

    if(!title.trim() || !summary.trim() || !description.trim()){
      alert('Please fill in the fields');
      return;
    }

    try {
      await mutateAsync({
        title,
        summary,
        description,
        tags: tags.split(',').map((tag) =>tag.trim()).filter((tag)=> tag !== '')
      })
    } catch (error) {
      console.log(error);
      alert('Something went Wrong');
    }
  }
  
  return (
    <div className='space-y-4'>
      <div className='flex justify-between items-center'>
                <h1 className='text-3xl font-bold text-center'>Create New Idea</h1>
            </div>
      <form onSubmit={handleSubmit} className='space-y-2'>
        <label 
        htmlFor="title"
        className='block text-gray-700 font-bold'
        >Title:</label>
        <input 
        type="text"
        id='title'
        value={title}
        onChange={(e) => setTitle(e.target.value)} 
        className='w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 py-3 px-4 rounded-lg'
        placeholder='Enter title Here'/>

        <label 
        htmlFor="summary"
        className='block text-gray-700 font-bold'
        >Summary:</label>
        <input 
        type="text"
        id='summary'
        value={summary}
        onChange={(e) => setSummary(e.target.value)} 
        className='w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 py-3 px-4 rounded-lg'
        placeholder='Enter summary Here'/>

        <label 
        htmlFor="description"
        className='block text-gray-700 font-bold'
        >Description:</label>
        <textarea 
        id='description'
        value={description}
        onChange={(e) => setDescription(e.target.value)} 
        className='w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 py-3 px-4 rounded-lg h-32'
        placeholder='Write out the description of our idea'/>

        <label 
        htmlFor="tags"
        className='block text-gray-700 font-bold'
        >Tags:</label>
        <input 
        type="text"
        id='tags'
        value={tags}
        onChange={(e) => setTags(e.target.value)} 
        className='w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 py-3 px-4 rounded-lg'
        placeholder='Optional Tags, are comma seperated'/>

        <button 
        type='submit' 
        disabled={isPending}
        className='inline-block w-full font-bold text-center mt-4 text-white bg-blue-600 px-4 py-3 rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed'>
          {isPending ? 'Creating...' : 'Create Idea'}
          </button>
      </form>
    </div>
    )
}
