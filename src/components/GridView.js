import styled from "styled-components"
import Product from './Product'
function GridView({ products }) {
    return (
        <Wrapper>
            {
                products.map((product) => {
                    const { _id, name, images, price } = product
                    return <Product key={_id} id={_id} name={name} image={images[0]} price={price} />
                })
            }
        </Wrapper>
    )
}
const Wrapper = styled.div`
    display:grid;
    grid-template-columns:1fr 1fr 1fr;
    gap:20px 20px;
    @media (max-width:992px){
        grid-template-columns:1fr;
    }
    @media (min-width:992px) and (max-width:1176px){
        grid-template-columns:1fr 1fr;
    }
`
export default GridView