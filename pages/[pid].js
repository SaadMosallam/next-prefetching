import React from 'react';
import fs from 'fs/promises';
import path from 'path'
import Link from 'next/link';


function ProductDetails(props) {
    const { loadedProduct } = props;

    return (
        <>
            <h1>{loadedProduct.title}</h1>
            <p>{loadedProduct.description}</p>
            <Link href="/">Home</Link>
        </>
    )
}

export const getStaticPaths = async () => {
    // const filePath = path.join(process.cwd(), 'data', 'dummy-data.json');
    // const fileData = await fs.readFile(filePath);
    // const data = JSON.parse(fileData);

    // const pathsData = data.products.map(product => ({
    //     params: {
    //         pid: product.id
    //     }
    // }))

    return {
        paths: [
            { params: { pid: 'p1' } }
        ],
        fallback: true
    }
};

export const getStaticProps = async (context) => {
    const { params } = context;
    const productId = params.pid;
    console.log('pid getStaticProps')

    const filePath = path.join(process.cwd(), 'data', 'dummy-data.json');
    const fileData = await fs.readFile(filePath);
    const data = JSON.parse(fileData);

    const product = data.products.find(product => product.id === productId);


    return {
        props: {
            loadedProduct: product
        },
        revalidate: 2
    }
}

export default ProductDetails