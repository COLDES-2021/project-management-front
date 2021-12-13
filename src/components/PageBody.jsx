const PageBody = ({ Contenido }) => {
    return (
        <div className='w-full h-full flex flex-col overflow-hidden'>
            <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
                    <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg p-4'>
                        <main>
                            {Contenido}
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageBody
