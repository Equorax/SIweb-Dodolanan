// data/toys.ts

export type Toy = {
  id: string;
  name: string;
  price: number;
  imgSrc: string;
  desc: string
};

// Toy[] adalah type annotation untuk untuk typescript intinya 
// object toys adalah sebuah array yang beriskan elements/items, setiap elements/items  memiliki tipe data yang sesuai dengan type Toy
// (elements/items di dalam toys merupakan object yang propertinya perlu patuh pada type Toy)
//  type annotation yang sudah ditentukan oleh Toy

export const toys: Toy[] = [
  {
    id: 'toy-001',
    name: 'Lego-1',
    price: 150000,
    imgSrc: '/assets/produk-mainan/Lego-1.png',
    desc: 'Mainan anak-anak Lego Mobil'
  },
  {
    id: 'toy-002',
    name: 'Lego-2',
    price: 90000,
    imgSrc: '/assets/produk-mainan/Lego-2.png',
    desc: 'Mainan anak-anak Lego Falcon'
  },
  {
    id: 'toy-003',
    name: 'Lego-3',
    price: 75000,
    imgSrc: '/assets/produk-mainan/Lego-3.png',
    desc:'Ada penjahat di lego city tolong hantam dia'
  },
  {
    id: 'toy-004',
    name: 'Lego-4',
    price: 50000,
    imgSrc: '/assets/produk-mainan/Lego-4.png',
    desc:'Ada Kebakaran di lego city panggil damkar'
  },
  {
    id: 'toy-005',
    name: 'Lego-5',
    price: 120000,
    imgSrc: '/assets/produk-mainan/Lego-5.png',
    desc:'welcome to jurassic park *vfx*'
  },
];
