
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { PublicLayout } from "./components/layout/PublicLayout";
import { Dashboard } from "./pages/Dashboard";
import { Members } from "./pages/Members";
import { Events } from "./pages/Events";
import { Finances } from "./pages/Finances";
import { Settings } from "./pages/Settings";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Services } from "./pages/Services";
import { Contact } from "./pages/Contact";
import NotFound from "./pages/NotFound";
import FormulaireAdhesion from "./pages/FormulaireAdhesion";
import ConnexionMembre from "./pages/ConnexionMembre";
import ProfilMembre from "./pages/ProfilMembre";
import AjoutMembre from "./pages/Ajout_membre"; 
import AjoutEvent from "./pages/Ajout_event";
import Streaming from "@/pages/Streaming";
import VideoDetail from "@/pages/VideoDetail";




const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          } />
          <Route path="/about" element={
            <PublicLayout>
              <About />
            </PublicLayout>
          } />
          <Route path="/services" element={
            <PublicLayout>
              <Services />
            </PublicLayout>
          } />
          <Route path="/contact" element={
            <PublicLayout>
              <Contact />
            </PublicLayout>
          } />

          <Route path="/adhesion" element={
            <PublicLayout>
              <FormulaireAdhesion />
            </PublicLayout>
          } />


          <Route path="/connexion" element={
            <PublicLayout>
              <ConnexionMembre />
            </PublicLayout>
          } />

          <Route path="/streaming" element={<PublicLayout><Streaming /></PublicLayout>} />

          <Route path="/video/:id" element={<VideoDetail />} />
          
          <Route path="/profil" element={
            <PublicLayout>
              <ProfilMembre />
            </PublicLayout>
          } />


          
          {/* Routes d'administration */}
          <Route path="/admin" element={
            <Layout>
              <Dashboard />
            </Layout>
          } />
          <Route path="/admin/members" element={
            <Layout>
              <Members />
            </Layout>
          } />
          <Route path="/admin/events" element={
            <Layout>
              <Events />
            </Layout>
          } />
          <Route path="/admin/finances" element={
            <Layout>
              <Finances />
            </Layout>
          } />
          <Route path="/admin/Ajout_membre" element={
            <Layout>
              <AjoutMembre />
            </Layout>
          } />
          <Route path="/admin/Ajout_event" element={
            <Layout>
              <AjoutEvent />
            </Layout>
          } />
          <Route path="/admin/settings" element={
            <Layout>
              <Settings />
            </Layout>
          } />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
