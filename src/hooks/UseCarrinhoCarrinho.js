import { useContext, useEffect, useMemo } from "react"
import { CarrinhoContext } from "../context/CarrinhoContext"
import { ADD_PRODUTO, REMOVE_PRODUTO, UPDATE_PRODUTO } from "../reducers/carrinhoRedcucer";

const addProdutoAction = (novoProduto) => ({
    type: ADD_PRODUTO,
    payload: novoProduto,
})

const removeProdutoAction = (produtoId) => ({
    type: REMOVE_PRODUTO,
    payload: produtoId,
})

const updateQuantidadeAction = (produtoId, quantidade) => ({
    type: UPDATE_PRODUTO,
    payload: { produtoId, quantidade },
})

export const useCarrinhoContext = () => {
    
    const { carrinho, dispatch, quantidade, valorTotal } = useContext(CarrinhoContext);

    function adicionarProduto(novoProduto) {
        dispatch(addProdutoAction(novoProduto));
    }

    function removerProduto(produtoId) {
        const produto = carrinho.find((item) => item.id === produtoId);
        if(produto && produto.quantidade > 1) {
            dispatch(updateQuantidadeAction(produtoId, produto.quantidade - 1));
        }else {
            dispatch(removeProdutoAction(produtoId));
        }
    }

    function removerProdutoCarrinho(id) {
        dispatch(removeProdutoAction(id));
    }


    

    return {
        carrinho,
        adicionarProduto,
        removerProduto,
        removerProdutoCarrinho,
        valorTotal,
        quantidade
    };
};