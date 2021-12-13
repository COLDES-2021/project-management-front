const PageTitle = ({ Titulo }) => {
    return (
        <div className='flex justify-evenly'>
            <div className=' my-4 p-2 w-4/6'>
                <span className='p-2 w-full text-2xl'>{Titulo}</span>
            </div>
            <div className=' w-2/6 flex items-center'>
                <div className='w-full flex justify-end items-center'>
                    {/* disponible */}
                </div>
            </div>
        </div>
    )
}

export default PageTitle
