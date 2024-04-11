import { gql, useQuery } from "@apollo/client";
import { useState } from "react";


const GET_ALL_PRODUCTS = gql`
    query GetAllProducts($first: Int, $after: String) {
        products(first: $first, after: $after){
            pageInfo {
                hasNextPage
                endCursor
            }
            edges{
                node{
                    availableForSale
                    id
                    title
                    options{
                        id
                        name
                        values
                    }
                    images(first: 1) {
                        edges{
                            node{
                                url
                            }
                        }
                    }
                    variants(first:50) {
                        edges{
                            node{
                                availableForSale
                                id
                                image {
                                    url
                                    id
                                }
                                title
                                compareAtPrice{
                                    amount
                                }
                                price{
                                    amount
                                }
                                selectedOptions{
                                    name
                                    value
                                }
                            }
                        }
                    }
                }  
            }
        }
    }
`;


function useGetProducts() {

    const [cursor, setCursor] = useState('');
    const [hasNextPage, setHasNextPage] = useState('');
    const [productsData, SetProductsData] = useState([]);
    

    const {loading, error, data} = useQuery(GET_ALL_PRODUCTS, {
        variables: {
            first: 10,
        },
        onCompleted: (data) => {
            setCursor(data?.products?.pageInfo?.endCursor);
            setHasNextPage(data?.products?.pageInfo?.hasNextPage);
            SetProductsData(data?.products?.edges);
        }
    })
    console.log(data, 'Data')

    return  {loading, error, data};

}

export default useGetProducts;