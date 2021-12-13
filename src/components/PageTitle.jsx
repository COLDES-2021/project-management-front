import { Link } from "react-router-dom"

const PageTitle = ({ Titulo, Ruta }) => {
    return (
        <div className='flex justify-evenly'>
            <div className=' my-4 p-2 w-4/6'>
                <span className='p-2 w-full text-2xl'>{Titulo}</span>
            </div>
            <div className=' w-2/6 flex items-center'>
                <div className='w-full flex justify-end items-center'>
                    {/* disponible */}
                    <Link to={Ruta}>
                        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PageTitle
