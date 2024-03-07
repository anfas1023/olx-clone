import React from 'react'


const SideNav = () => {
  return (
    <>
<div className=' bg-slate-50  mt-3'>
<div className=' w-[80%] h-10 ml-10 mr-10'>
        <div className='ml-auto mr-auto flex justify-evenly items-center'>
        <select className="text-center bg-slate-50 focus:outline-none border-none " id="cars" name="cars">
          <option value="All Catagories">All Catagories</option>
          <option value="Toyata">Toyata</option>
          <option value="Toyata">Toyata</option>
          <option value="mercedes">mercedes</option>
          <option value="audi">audi</option>
        </select>
        <p>Car</p>
        <p>Motorcycles</p>
        <p>MobilePhones</p>
        <p>For Sales : House & Apartment</p>
        <p>Scooter</p>
        <p>Commercial & other vechiles</p>
        <p>For Rent : House & Apartment</p>
        </div>


    </div>
</div>

    </>
  )
}

export default SideNav
