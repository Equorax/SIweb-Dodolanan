export type Testi ={
  id: number;
  name: string;
 
  text:string;
  avatarUrl:string
}



export const testimonials: Testi[] = [
    {
      id: 1,
      name: "Yerren Besra",
      text: "Koleksi mainan lengkap anak saya yang kedua senang lihat-lihat mainan",
      avatarUrl: "/assets/Berren.png",
    },
    {
      id: 2,
      name: "Avan Ebel",
      text: "Koleksi lego lengkap dari berbagai macam jenis, saya senang bisa berbelanja disini",
      avatarUrl: "/assets/Evan.png",
    },
    {
      id: 3,
      name: "Jobin Rauhari",
      text: "Ada berbagai macam mainan yang menarik dari lego hingga boneka",
      avatarUrl: "/assets/Robin.png",
    },
    {
      id: 4,
      name: "Raiz Fizq",
      text: "Mainannya cocok untuk hadiah anak saya",
      avatarUrl: "/assets/Faiz.png",
    }
  ];