const Container = ({ children }) => {
  return (
    <div className='max-w-screen-2xl mx-auto xl:px-14 md:px-10 sm:px-2 px-4 bg-white dark:bg-gray-900'>
      {children}
    </div>
  )
}

export default Container
