import Navbar from "../components/Navbar/page";
import Footer from "../components/Footer/page";


export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    // kesalahan sebelumnya ada double div yang ngecover halaaman
    <div className="flex flex-col min-h-screen bg-white">
      
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      
    </div>
  );
}

// import Navbar from "../components/Navbar/page";
// import Footer from "../components/Footer/page";

// export default function CustomerLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <Navbar />
//       <main className="flex-grow">{children}</main>
//       <Footer />
//     </div>
//   );
// }
