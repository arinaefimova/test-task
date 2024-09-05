import  { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

type Props = {

}

const Layout:FC<Props> = () => {
  return (
    <>  
      <Header/>
        <main>
            <Outlet/>
        </main>
        <Footer/>
    </>
  )
}

export default Layout