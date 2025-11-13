import type { idea } from "@/types";
import { Link } from "@tanstack/react-router";
import clsx from 'clsx';

const IdeaCard = ({idea, button = true}: {idea: idea; button?:boolean}) => {

  const linkClasses = clsx({
  'text-blue-600 hover:underline mt-3': !button,
  'inline-block w-full font-bold text-center mt-4 text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition': button
})
    return ( 
        <div
          className='border border-gray-300 p-4 rounded shadow bg-white
          flex flex-col justify-between'>
            <div>
                <h2 className='text-lg font-semibold'>{idea.title}</h2>
                <p className='text-gray-700 mt-2'>{idea.summary}</p>
                <Link 
                to='/Ideas/$ideaId'
                params= {{ideaId: idea._id.toString()}}
                className={linkClasses}
                >
                  {button ? 'View Idea': 'Read More →'}
                </Link>
            </div>
          </div>
     );
}
 
export default IdeaCard;