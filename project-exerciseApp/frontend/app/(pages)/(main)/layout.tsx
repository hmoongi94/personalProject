import { ChildrenProp } from "@/app/interface/ChildrenProp";
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
