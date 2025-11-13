import { createFileRoute, Link} from '@tanstack/react-router'
import {useMutation, queryOptions, useSuspenseQuery} from '@tanstack/react-query'
import { fetchIdea, updateIdea} from '@/api/ideas'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

const ideaQueryOptions =  (id: string) =>  queryOptions({
    queryKey: ['idea', id],
    queryFn: () => fetchIdea(id)
})
    

export const Route = createFileRoute('/Ideas/$ideaId/edit')({
  component: IdeaEditPage,
  loader: async ({params, context: {queryClient}}) =>  {
    return queryClient.ensureQueryData(ideaQueryOptions(params.ideaId));
  }
})

function IdeaEditPage() {
  const {ideaId} = Route.useParams(); // this is the way of using params in Tanstack Query
  const navigate = useNavigate();
  const {data: idea} = useSuspenseQuery(ideaQueryOptions(ideaId));

  const [title, setTitle] = useState(idea.title);
  const [summary, setSummary] = useState(idea.summary);
  const [description, setDescription] = useState(idea.description);
  const [tagsInput, setTagsInput] = useState(idea.tags.join());

  const {mutateAsync, isPending} = useMutation({
    mutationFn: () => updateIdea(ideaId, {
      title,
      summary,
      description,
      tags: tagsInput.split(', ').map((tag) => tag.trim()).filter(Boolean)
    }),
    onSuccess: () => {
      navigate({ to: `/Ideas/$ideaId`, params: {ideaId}})
    }
  })

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    await mutateAsync();
  }

  return (
    <div className='space-y-4'>
      <div className='flex justify-between items-center'>
          <h1 className='text-3xl font-bold text-center'>Edit Idea</h1>
          <Link to={'/Ideas'} className='text-blue-500 hover:underline text-md'> ← Back To Ideas</Link>
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
        value={tagsInput}
        onChange={(e) => setTagsInput(e.target.value)} 
        className='w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 py-3 px-4 rounded-lg'
        placeholder='Optional Tags, are comma seperated'/>

        <button 
        type='submit'
        disabled={isPending} 
        className='inline-block w-full font-bold text-center mt-4 text-white bg-blue-600 px-4 py-3 rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed'>
          {isPending ? 'Updating...' : 'Update Idea'}
          </button>
      </form>
    </div>
  )
}
