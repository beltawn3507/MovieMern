import React from 'react'

const GenreForm = ({ value, setValue, handleSubmit, buttonText = "Submit", handleDelete }) => {
  return (
    <div className='p-3 md:p-4 w-full'>
      <form onSubmit={handleSubmit} className='space-y-3 md:space-y-4'>
        <input 
          type="text"  
          className='py-2 md:py-3 px-4 border rounded-lg w-full max-w-md text-sm md:text-base'
          value={value} 
          placeholder="Enter genre name" 
          onChange={(e) => setValue(e.target.value)}
        />
        
        <div className='flex flex-col md:flex-row gap-2 md:gap-3 md:justify-between'>
          <button 
            type="submit"
            className='bg-teal-500 text-white py-2 px-4 md:px-6 rounded-lg 
                      hover:bg-teal-600 transition-colors duration-200 
                      text-sm md:text-base focus:outline-none focus:ring-2 
                      focus:ring-teal-500 focus:ring-opacity-50'
          >
            {buttonText}
          </button>

          {handleDelete && (
            <button
            type="button"
              onClick={handleDelete}
              className="bg-red-500 text-white py-2 px-4 md:px-6 rounded-lg 
                        hover:bg-red-600 transition-colors duration-200 
                        text-sm md:text-base focus:outline-none focus:ring-2 
                        focus:ring-red-500 focus:ring-opacity-50"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default GenreForm