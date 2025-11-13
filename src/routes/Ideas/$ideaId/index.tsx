import { createFileRoute, Link} from '@tanstack/react-router'
import { useNavigate } from '@tanstack/react-router';
import { queryOptions, useSuspenseQuery, useMutation} from '@tanstack/react-query';
import { fetchIdea, deleteIdea } from '@/api/ideas';
import { useAuth } from '@/context/AuthContext';
// import type { idea } from '@/types';
// import api from '@/lib/axios';

const ideaQueryOptions = (ideaId: string) => queryOptions({
  queryKey: ['idea', ideaId],
  queryFn: () => fetchIdea(ideaId),
})

export const Route = createFileRoute('/Ideas/$ideaId/')({
  component: IdeasDetailsPage,
  //syntax of declaring loader
  loader: async ({params, context:{queryClient}}) => {
      return queryClient.ensureQueryData(ideaQueryOptions(params.ideaId));
  }
})
 
function IdeasDetailsPage() {
  const { ideaId } = Route.useParams();
  const {data: idea} = useSuspenseQuery(ideaQueryOptions(ideaId)) //getting data from loader

const navigate = useNavigate();
const {user} = useAuth();
const {mutateAsync:deleteMutate, isPending } = useMutation({
  mutationFn: () => deleteIdea(ideaId),
  onSuccess: () => {
    navigate({to: '/Ideas'})
  }
})

const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this Idea');
    if(confirmDelete){
      await deleteMutate();
    }
}
  return (
    <>
      <div className='p-4'>
          <Link 
          to={'/Ideas'}
          className='block underline text-blue-400 mb-4'>
           ← Back To Ideas
          </Link>
          <h2 className='text-2xl font-bold'>{idea.title}</h2>
          <p className='mt-2'>{idea.description}</p>

          {user && user.id === idea.user && (
            <>
              {/* Edit Link */}
          <Link 
          to={'/Ideas/$ideaId/edit'} 
          params={{ideaId}}
          className='inline-block py-3 px-4 bg-yellow-500 hover:bg-yellow-700 text-white font-bold mt-4 mr-2
          rounded transition'
          >Edit</Link>
          {/* Delete Btn */}
          <button 
          disabled={isPending} 
          onClick={handleDelete}
          className='py-3 px-3 bg-red-500 hover:bg-red-700 text-white font-bold mt-4
          rounded transition'>
            {isPending ? 'Deleting...' : 'Delete'}
          </button>
            </>
          )}
          
      </div>
    </>
  )
}
