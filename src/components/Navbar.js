const Navbar = ()=>{
    return(
        <div className="flex justify-between px-5 md:px-10 pt-5">
            <div className="font-bold dark:text-white">
                <a href="/">testingReact.</a>
            </div>
            <div className="dark:text-white">
                <a href="https://github.com/DeitySama" className="hover:text-slate-400"><i className="uil uil-github-alt"></i> DeitySama</a>
            </div>
        </div>
    )
}

export default Navbar;