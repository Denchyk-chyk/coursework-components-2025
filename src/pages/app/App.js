import './Styles.css';
import '../..'
import NarrowGallery from '../../components/gallery/NarrowGallery';
import Footer from '../../components/footer/Footer';
import CustomCarousel from '../../components/carousel/CustomCarousel';
import PurchaseBookCard from '../../components/gallery/PurchaseBookCard';
import Menu from '../../components/menu/Menu';
import { useContext, useMemo } from 'react';
import { BooksContext } from '../../logic/Contexts';
import { Button } from 'react-bootstrap';

function App() {
  const news = [
    {
        images: [
          'https://i.pinimg.com/736x/54/d0/02/54d0020d863a6c7da9a1aa9e5891b8b9.jpg',
          'https://i.pinimg.com/736x/f0/49/a7/f049a78fbf21d54eb0d6b1604d8ba0d4.jpg',
        ],
        title: 'First news',
        desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit leo eu aenean sed diam urna tempor.'
    },
    {
        images: [
          'https://i.pinimg.com/736x/a6/4a/08/a64a081635d4347a18985fa61a4d5977.jpg',
          'https://i.pinimg.com/736x/86/cd/ff/86cdff4b4b41cf5355a0e0434a8a1aa2.jpg',
        ],
        title: 'Second news',
        desc: 'Mus donec rhoncus eros lobortis nulla molestie mattis. Purus est efficitur laoreet mauris pharetra vestibulum fusce. Sodales consequat magna ante condimentum neque at luctus.'
    },
    {
        images: [
          'https://i.pinimg.com/736x/1b/0a/75/1b0a7556cb315ad77ff5cd4c819d4bb6.jpg',
          'https://i.pinimg.com/736x/cb/55/77/cb55776a8b0e7d8168c8c80bfa47f84f.jpg',
        ],
        title: 'Third news',
        desc: 'Ligula congue sollicitudin erat viverra ac tincidunt nam. Lectus commodo augue arcu dignissim velit aliquam imperdiet. '
    }
  ];

  const { books } = useContext(BooksContext);

  const randomPart = (arr, size) => {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.ceil(arr.length * size));
  };

  const groups = useMemo(() => [
        randomPart(books, 0.3),
        randomPart(books, 0.2),
        randomPart(books, 0.5)
    ], [books]);

  return (
    <div>
      <Menu/>
      <section>
        <CustomCarousel slides={news}/>
      </section>
      <section>
      <NarrowGallery books={groups[0]} cardComponent={(book) => <PurchaseBookCard book={book}/>} header='Відібране'/>
      </section>
      <section>
        <NarrowGallery books={groups[1]} cardComponent={(book) => <PurchaseBookCard book={book}/>} header='Популярне'/>
      </section>
      <section>
        <NarrowGallery books={groups[2]} cardComponent={(book) => <PurchaseBookCard book={book}/>} header='Нове'/>
        <div className='d-flex justify-content-center'>
          <Button variant='light mt-5 thin-section'>Більше</Button>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

export default App;
