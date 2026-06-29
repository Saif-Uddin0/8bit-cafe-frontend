import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// This layout wraps all pages under the (main) route group.
// It adds the shared Navbar and Footer around the page content.
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
