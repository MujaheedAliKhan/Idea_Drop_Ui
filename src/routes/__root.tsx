//HeadContent: The HeadContent component is used to render meta tags, links, and scripts for the current route. It should be rendered in the <head> of your document.
import { HeadContent, Outlet, createRootRouteWithContext, Link} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import type { QueryClient } from '@tanstack/react-query'
import Header from '@/components/Header'
type RouteContext = {
  queryClient: QueryClient,  // it tells the shape of the data
} 

export const Route = createRootRouteWithContext<RouteContext>()({ // syntax of using the RouteContext
  // Syntax of Implementing head
  head: () => ({
    meta:[
      {
        name: 'description',
        content: 'Share, and explore and build on the best startup ideas and side hustles'
      },
      {
        title: 'IdeaDrop - Your Idea Hub'
      }
    ]
  }),
  component: RootLayout,
  notFoundComponent: notFoundPage,
})

function RootLayout () {
    return (
      <div className='min-h-screen bg-gray-100 flex flex-col '>
    {/* use HeadContent Here */}
    {/* The HeadContent component is used to render meta tags, links, and scripts for the current route. It should be rendered in the <head> of your document. */}
      <HeadContent/>  
      <Header/>
        <main className='flex justify-center p-6'>
          <div className='w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8'> 
              <Outlet />
          </div>
        </main>
      <TanStackRouterDevtools/>
    </div>
    )
}

//creating function of Not Found Page with Tanstack Query

function notFoundPage() {
  return (
    <div className='flex flex-col justify-center items-center text-center py-20'>
        <h1 className='text-6xl text-gray-800 font-bold mb-4'>404</h1>
        <p className='text-lg text-gray-500 font-semibold mb-6'>Oops! The page your looking for does not exists</p>
        <Link to='/'
        className='py-2 px-4 bg-blue-600 text-white font-semibold rounded-sm shadow hover:bg-blue-800'
        >
          Go Back Home
        </Link>
    </div>
  )
}