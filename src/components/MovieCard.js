const MovieCard = (props)=>{
    const {movie,setPreviewCallBack} = props;

    return(
            <div className=" ease-in-out transition-transform delay-130 hover:-translate-y-5 cursor-pointer " onClick={(e)=>setPreviewCallBack(movie)}>
                <div className="relative">
                    <span className={"text-xs block absolute top-3 right-3 backdrop-blur-md border text-white p-2 rounded " +((parseFloat(movie.vote_average)>=7)?'border-emerald-400 text-white':(parseFloat(movie.vote_average)>=6 && parseFloat(movie.vote_average)<7)?'border-yellow-400 text-white':'')}>{movie.vote_average.toFixed(1)}</span>
                    <img loading="lazy" className={"w-full h-150 md:h-100 md:w-full md:object-cover object-cover rounded border-b-4 "+((parseFloat(movie.vote_average)>=7)?'border-emerald-400 text-white':(parseFloat(movie.vote_average)>=6 && parseFloat(movie.vote_average)<7)?'border-yellow-400 text-white':'')} src={'https://image.tmdb.org/t/p/w500'+movie.poster_path} alt={movie.title}/>
                </div>
                <div className="mt-5 flex flex-row justify-between">
                    <h1 className="text-m font-medium whitespace-nowrap  w-2/3 text-ellipsis overflow-hidden dark:text-white">{movie.name || movie.title}</h1>
                    <p><small className="uppercase text-xs text-slate-400">{movie.media_type}</small></p>
                </div>
            </div>
    )
}

export default MovieCard