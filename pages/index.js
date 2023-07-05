import fs from 'fs/promises';
import Link from 'next/link';
import path from 'path';

function Home(props) {
  const { products } = props;
  return (
    <ul>
      {products.map(product => <Link key={product.id} href={`/${product.id}`}>
        <li >{product.title}</li>
      </Link>)}
    </ul>
  )
}

export const getStaticProps = async () => {
  console.log('Index getStaticProps')
  const filePath = path.join(process.cwd(), 'data', 'dummy-data.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: {
      products: data.products
    }
  }
}

export default Home;