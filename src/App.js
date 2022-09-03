import React, {useEffect, useState} from 'react';
import axios from 'axios';
import MovieCard from './components/MovieCard';
import PreviewMovie from './components/PreviewMovie';
import Navbar from './components/Navbar';
import Swal from 'sweetalert2';



const api_key = process.env.REACT_APP_API_KEY;

function App() {
      const [movies,setMovie] = useState([]);
      const [preview,setPreview] = useState([]);
      const [pages,setPages] = useState([]);
      const [currPage,setCurrPage] = useState(1);



      const setPreviewCallBack= async(item)=>{
       await axios.get(`https://api.themoviedb.org/3/movie/${item.id}/videos?api_key=`+api_key).then((res)=>{
            if(res.data.results.length>0){
              item.trailers = res.data.results;
            }
            else{
              item.trailers = [];
            }
            setPreview(item);
       })
       .catch(err=>{
        const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            
            Toast.fire({
              icon: 'error',
              title: 'Details not available ATM.'
            })
       })
      }

      const pageNumbers = (total, max, current) => {
            const half = Math.round(max / 2);
            let to = max;
      
            if (current + half >= total) {
              to = total;
            } else if (current > half) {
              to = current + half;
            }
      
            let from = to - max;
      
            return Array.from({ length: max }, (_, i) => i + 1 + from);
      };

      const gotoPage = (passed_page) =>{
        setCurrPage(passed_page);
      }

      const clearPreview = ()=>{
        setPreview({});
      }

      useEffect(()=>{
        
          const getMovies = async () =>{
           const res = await  axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${api_key}&page=${currPage||1}`);
                setMovie(res.data.results);
                setPages(pageNumbers(res.data.total_pages,10,currPage));
            }
          getMovies();
      },[currPage,setMovie,setPages]);

  return (
    <div className={"App relative  dark:bg-zinc-900 " +((preview && Object.keys(preview).length>=1)?'h-screen overflow-hidden':'')}>
      <div><Navbar/></div>
      <div className='md:px-10 mt-10 px-5 flex  md:justify-end'>
        {(pages && pages.length>1)?pages.map((page_item,index)=><button onClick={(e)=>gotoPage(page_item)} key={index} className={'border py-2 px-2.5 text-xs rounded mr-2  '+((page_item===currPage)?'dark:text-white dark:slate-100 dark:border-white text-black border-black':'dark:text-slate-400 dark:border-zinc-800 text-slate-400')}>{page_item}</button>):''}
      </div>
          {
            (preview && Object.keys(preview).length>=1)?<PreviewMovie preview={preview} clearPreview={clearPreview}/>:''
          }
          <div className={'grid grid-cols-1 gap-y-20 sm:grid-cols-2 md:grid-cols-5 md:gap-10 p-10 '}>
              {
                (movies.length>=1)?movies.map((item,index)=>
                    <MovieCard movie={item} setPreviewCallBack={setPreviewCallBack} key={index} />
                  )
                  :<div className='text-slate-400'><p>No Movies Here</p></div>
              }
          </div>
      <div className='md:px-10 my-10 px-5 flex  md:justify-end'>
        {(pages && pages.length>1)?pages.map((page_item,index)=><button onClick={(e)=>gotoPage(page_item)} key={index} className={'border py-2 px-2.5 text-xs rounded mr-2  '+((page_item===currPage)?'dark:text-white dark:slate-100 dark:border-white text-black border-black':'dark:text-slate-400 dark:border-zinc-800 text-slate-400')}>{page_item}</button>):''}
      </div>
    </div>
  );
}

export default App;
