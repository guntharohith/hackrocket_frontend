import React from 'react'
import styled from 'styled-components'
import { useProductContext } from '../../context/ProductContext'
import Loading from '../Loading'
import Product from '../Product'
function Recommendations() {
    const { products, loading } = useProductContext()

    if (loading) {
        return <Loading />
    }
    const first = Math.floor(Math.random() * 6 + 1)
    const second = Math.floor(Math.random() * 6 + 7)
    const third = Math.floor(Math.random() * 6 + 13)
    return (
        <Wrapper className='section-center'>
            <div className='title'>
                <h1>Recommendations</h1>
                <p>Recommendations based on your previous purchases.</p>
            </div>
            {
                products.length > 0 &&
                <div className='products'>
                    <Product id={products[first]._id} name={products[first].name} image={products[first].images[0]} price={products[first].price} />
                    <Product id={products[second]._id} name={products[second].name} image={products[second].images[0]} price={products[second].price} />
                    <Product id={products[third]._id} name={products[third].name} image={products[third].images[0]} price={products[third].price} />
                </div>
            }

        </Wrapper>
    )
}

export default Recommendations

const Wrapper = styled.div`
    .title{
        text-align:center;
        margin-bottom:2rem;
    }
    .products{
        display:grid;
        grid-template-columns:repeat(1,1fr);
        gap:2rem;
    }

    @media screen and (min-width:992px){
        .products{
            grid-template-columns:repeat(3,1fr);
        }
    }

    @media screen and (min-width:776px) and (max-width:992px){
        .products{
            grid-template-columns:repeat(2,1fr);
        }
    }

`