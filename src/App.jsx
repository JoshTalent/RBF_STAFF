import { Routes, Route } from "react-router-dom";

// import main pages
import Home from "./pages/Home";

// placeholder pages (replace with real ones later)
import Posts from "./pages/posts"
import AddPost from "./pages/addPost"
import Matches from "./pages/Matches"
import AddMatch from "./pages/addMatch"
import BoxersPortfolio from "./pages/boxersPortfolio"
import Events from "./pages/events"
import News from "./pages/news"
import AddNews from "./pages/addNews";
import AddEvent from "./pages/addEvent";
import AddBoxer from "./pages/addBoxer";
import Login from "./pages/login";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <>
      <Routes>
        {/* Public route */}
        <Route path="/" element={<Login />} />
        {/* Admin routes */}
        <Route path="/admin/home" element={<Home />} />
        <Route path="/admin/posts" element={<Posts />} />
        <Route path="/admin/add-post" element={<AddPost />} />
        <Route path="/admin/matches" element={<Matches />} />
        <Route path="/admin/add-match" element={<AddMatch />} />
        <Route path="/admin/boxers" element={<BoxersPortfolio />} />
        <Route path="/admin/add-boxer" element={<AddBoxer />} />
        <Route path="/admin/events" element={<Events />} />
        <Route path="/admin/add-event" element={<AddEvent />} />
        <Route path="/admin/news" element={<News />} />
        <Route path="/admin/add-news" element={<AddNews />} />
        <Route path="/admin/profile" element={<Profile />} />

      </Routes>
    </>
  );
};

export default App;
