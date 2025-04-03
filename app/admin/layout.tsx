import Sidebar from "../components/Sidebar/page";


export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    // kesalahan sebelumnya ada double div yang ngecover halaaman
    <div className="flex h-screen">
    <Sidebar />
    <div className="flex-1 overflow-auto">
      {children}
    </div>
  </div>
  );
};