
import { useEffect } from "react"
import { AppHeader } from "../cmps/AppHeader"
import { Footer } from "../cmps/Footer"
import { boardService } from "../services/Board.service"
export function HomePage() {


    useEffect(() => {
        boardService.makeFirstBoard()
    }, [])




    return (
        <div className="home-page">
            <AppHeader />
            <div className="hero-layout">
                <div className="hero">
                    <h1>A platform for company
                        tasks managment</h1>
                </div>
                <div>


                    <button className="hero-btn">Get Started</button>
                </div>
                <p>Free use, no limit Start your own Friday!</p>
            </div>
            <Footer />

        </div>
    )
}