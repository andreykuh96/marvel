import AppHeader from "../appHeader/AppHeader";
import { ComicsPage, MainPage, Page404, SingleComicPage } from "../pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {

    return (
        <BrowserRouter>
            <div className="app">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path='/marvel' element={<MainPage />} />
                        <Route path='/marvel/comics' element={<ComicsPage />} />
                        <Route path='/marvel/comics/:comicId' element={<SingleComicPage />} />
                        <Route path="*" element={<Page404 />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    )
}

export default App;