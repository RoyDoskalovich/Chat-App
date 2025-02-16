import HomeScreen from './HomeScreen/HomeScreen';
import Chat from './Chat/Chat';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/loggedin" element={<Chat/>}></Route>
                    <Route path="/" element={<HomeScreen/>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
