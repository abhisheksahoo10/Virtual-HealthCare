import React from 'react'
import '../styles/Style.css'
function About() {
    
    return (
        <React.Fragment>
            <section className='p-10  h-screen text-white bg-[#0d2512] w-full lg:px-20'>
                <h1 className='my-5 font-semibold text-3xl'>About Us</h1>
                <hr />
                <div className='sm:grid grid-cols-2 my-6 '>
                    <div>
                        <p>Project :</p>
                        <h5 className='text-4xl font-bold'>V+ HealthCare</h5>
                        <p className='text-2xl my-4'>USBM - MCA [2022-24]</p>
                        <p className=''>Project Group - 9</p>
                    </div>
                    <div>
                        <p className='text-sm mb-3'>Design and Devloped by</p>
                        <a className='block text-2xl font-medium ' href='https://abhisheksahoo10-portfolio.netlify.app/' target="_blank" rel="noopener noreferrer">Abhishek Sahoo [Lead]</a>
                        <a className='block text-xl font-medium' href='https://www.instagram.com/wow._.how'>Lipa Swain</a>
                        <a className='block text-xl font-medium' href='https://www.instagram.com/aastha_priyambada'>Aastha priyambada Sahoo</a>
                        <a className='block text-xl font-medium' href='https://www.instagram.com/uk_asita'>Asita Das</a>
                        <a className='block text-xl font-medium' href='https://www.instagram.com/_sweet_googly_'>Anindita Das</a>
                        <a className='block text-xl font-medium' href='https://www.instagram.com/s.u.b.h.a.s.i.s.h.31'>N Subhasish</a>
                        <p className='block text-xl font-medium' >Deeptisikha Mohanty</p>
                    </div>
                </div>
                
            </section>


        </React.Fragment>
    )
}

export default About