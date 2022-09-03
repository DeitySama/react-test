const PreviewMovie = (props)=>{
    
    const {preview} = props;
    const {clearPreview} = props;

    return(
        <div className="fixed h-screen top-0 overflow-y-scroll w-full bg-white z-10 dark:bg-zinc-900">
            <div className="absolute rounded top-5 left-5"><button className="bg-black dark:bg-zinc-900 rounded-xl text-white p-3 cursor-pointer" onClick={(e)=>clearPreview()}><i className="uil uil-angle-left"></i></button></div>
           <div className="h-full mx-auto">
                <div className="md:h-1/3">
                    <img className="w-full h-full object-cover" src={'https://image.tmdb.org/t/p/original'+preview.backdrop_path} alt={preview.title || preview.name}/>
                </div>
                
                <div className="flex p-5 -mt-20 md:w-2/3 md:h-2/3  mx-auto md:rounded-xl backdrop-blur-md md:border border-slate-200 dark:border-zinc-800">
                     <iframe id="player" type="text/html" className="rounded-xl mx-auto h-full" width="100%" title="Main Trailer"  src={`https://www.youtube.com/embed/${(preview.trailers.length>=1 && preview.trailers[0].key)?preview.trailers[0].key:''}`}></iframe>
                </div>
                <div className="w-full p-5 md:px-0 md:pt-0 md:w-2/3 mx-auto md:mt-10 pb-20">
                    <div className="flex flex-col mt- md:flex-row justify-between">
                       <div> 
                            <p className="text-slate-500 text-xs mb-2">{preview.first_air_date}</p>
                            <h1 className="font-bold text-xl md:text-2xl dark:text-white">{preview.title||preview.name}</h1>
                        </div>
                        <div className="flex mt-2 md:block">
                            <span className={"text-xs block float-left bg-slate-100 p-2 mr-2 rounded font-bold " +((parseFloat(preview.vote_average)>=7)?'bg-emerald-400 text-white':(parseFloat(preview.vote_average)>=6 && parseFloat(preview.vote_average)<7)?'bg-yellow-400 text-white':'')}><i className="uil uil-star"></i> {preview.vote_average.toFixed(1)}</span>
                            <span className="text-xs block md:float-right  bg-slate-100 p-2 rounded font-bold"><i className="uil uil-feedback"></i> {preview.vote_count}</span>
                        </div>                     
                    </div>
                    
                    <div className="text-xs uppercase flex space-x-2 my-5">
                        <p className="bg-slate-300 py-1 px-2 rounded">{preview.media_type}</p>
                        <p className="bg-slate-800 text-white py-1 px-2 rounded">{preview.original_language}</p>
                        <p className="bg-black text-white py-1 px-2 rounded">{(preview.adult)?'+18':'TV-MA'}</p>
                    </div>
                    <div className="w-1/2 mx-auto ">
                        <hr className="dark:opacity-5"/>
                    </div>
                    <div className="py-10 dark:text-white"><p>{preview.overview}</p></div>
                    <div className="w-1/2 mx-auto">
                        <hr className="dark:opacity-5"/>
                    </div>
                    <div className="mt-5">
                        <p className="mb-5 text-slate-500 font-medium">Other Trailers</p>
                        <div className="grid gap-10 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 md:gap-10">
                            {(preview.trailers && preview.trailers.length>=1)?preview.trailers.map((trailer,index)=> <div className="border dark:border-zinc-800 rounded-xl">                 
                            <iframe id="player" type="text/html" title={trailer.key} className="rounded-xl mx-auto" width="100%" key={index} height="250" src={`https://www.youtube.com/embed/${trailer.key}`}
                               loading="lazy" ></iframe>
                                </div>):<div className="dark:text-white"><p>No Trailers Available</p></div>}
                        </div>
                    </div>
                </div>

           </div>
        </div>
    )
}

export default PreviewMovie;
