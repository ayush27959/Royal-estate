import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";

const Home = lazy(() => import("./pages/Home"));
const SignIn = lazy(() => import("./pages/Signin"));
const SignUp = lazy(() => import("./pages/SignUp"));
const About = lazy(() => import("./pages/About"));
const Profile = lazy(() => import("./pages/Profile"));
const CreateListing = lazy(() => import("./pages/CreateListing"));
const UpdateListing = lazy(() => import("./pages/UpdateListing"));
const Listing = lazy(() => import("./pages/Listing"));
const Search = lazy(() => import("./pages/Search"));
const LegalPage = lazy(() => import("./pages/T&C"));
const SellerProfile = lazy(() => import("./pages/SellerProfile"));
const Compare = lazy(() => import("./pages/Compare"));
const Buildings = lazy(() => import("./pages/Buildings"));
const BuildingDetail = lazy(() => import("./pages/BuildingDetail"));
const CreateBuilding = lazy(() => import("./pages/CreateBuilding"));

const LoadingFallback = () => (
  <div className="flex min-h-screen items-center justify-center bg-black">
    <div className="rounded-3xl border border-white/10 bg-zinc-950 px-10 py-9 text-center shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
      <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-2 border-yellow-500/20 border-t-yellow-500" />
      <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
        Loading...
      </p>
    </div>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/listing/:listingId" element={<Listing />} />
          <Route path="/search" element={<Search />} />
          <Route path="/buildings" element={<Buildings />} />
          <Route path="/building/:buildingId" element={<BuildingDetail />} />
          <Route path="/terms" element={<LegalPage />} />
          <Route path="/privacy" element={<LegalPage />} />
          <Route path="/seller/:sellerId" element={<SellerProfile />} />
          <Route path="/compare" element={<Compare />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-listing" element={<CreateListing />} />
            <Route path="/update-listing/:listingId" element={<UpdateListing />} />
            <Route path="/create-building" element={<CreateBuilding />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
