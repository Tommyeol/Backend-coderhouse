import './loader.css'

export default function Loader(){
   return (
      <div className=' bg-white/90 fixed inset-0 z-20 grid place-content-center'>
         <div className="spinner"></div>
      </div>
   )
}