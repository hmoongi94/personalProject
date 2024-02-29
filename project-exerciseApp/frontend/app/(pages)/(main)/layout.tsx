import { ChildrenProp } from "@/app/lib/interface";
import Footer from "@/app/ui/layout/footer/Footer";
import Header from "@/app/ui/layout/header/Header";

export default function CustomerLayout({ children }: ChildrenProp) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
