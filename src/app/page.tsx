import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Dynamic imports for performance
const HeroSection = dynamic(() => import("@/components/sections/HeroSection"), { ssr: false });
const AuthoritySection = dynamic(() => import("@/components/sections/AuthoritySection"));
const EcosystemSection = dynamic(() => import("@/components/sections/EcosystemSection"));
const CapabilitiesSection = dynamic(() => import("@/components/sections/CapabilitiesSection"));
const DashboardSection = dynamic(() => import("@/components/sections/DashboardSection"));
const MobileSection = dynamic(() => import("@/components/sections/MobileSection"));
const AutomationSection = dynamic(() => import("@/components/sections/AutomationSection"));
const TechSection = dynamic(() => import("@/components/sections/TechSection"));
const LabSection = dynamic(() => import("@/components/sections/LabSection"));
const MatrixSection = dynamic(() => import("@/components/sections/MatrixSection"));
const CTASection = dynamic(() => import("@/components/sections/CTASection"));

export default function Home() {
    return (
        <main className="relative min-h-screen bg-black overflow-x-hidden">
            <Navbar />

            {/* Section Anchors */}
            <div id="hero"><HeroSection /></div>
            <div id="authority"><AuthoritySection /></div>
            <div id="ecosystem"><EcosystemSection /></div>
            <div id="capabilities"><CapabilitiesSection /></div>
            <div id="dashboard"><DashboardSection /></div>
            <div id="mobile"><MobileSection /></div>
            <div id="automation"><AutomationSection /></div>
            <div id="tech"><TechSection /></div>
            <div id="lab"><LabSection /></div>
            <div id="matrix"><MatrixSection /></div>
            <div id="contact"><CTASection /></div>

            <Footer />
        </main>
    );
}
