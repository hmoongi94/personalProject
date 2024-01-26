import { ChildrenProp } from "@/app/types/ChildrenProp";
import { Footer } from "@/components/mainpage/layout/footer/Footer";
import { Header } from "@/components/mainpage/layout/header/Header";

export default function CustomerLayout({ children }: ChildrenProp) {
  // const sendRequest = async (url: string, token: string) => {
  //   try {
  //     const response = await fetch(url, {
  //       method: 'GET',
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     const data = await response.json();
  //     // Process the response data here
  //   } catch (error) {
  //     // Handle any errors here
  //   }
  // };
  return (
    <>
      <Footer />
      {children}
      <Header />
    </>
  );
}
