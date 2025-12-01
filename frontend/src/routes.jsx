import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./components/LandingPage/LandingPage.jsx";
import { SnippetViewPage } from "./components/SnippetViewPage/SnippetViewPage.jsx";

export const PageRoutes = () =>{
    return(
        <>
            <Routes>
                {/* Home page with grid view of snippets */}
                <Route path="/" element={<LandingPage/>}/>
                {/* Snippet-specific view page for editing and comparison */}
                <Route path="/snippet" element={<SnippetViewPage/>}/>
            </Routes>
        </>
    );
}