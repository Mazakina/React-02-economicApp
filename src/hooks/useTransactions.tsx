import { Response } from "miragejs";
import react, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";


interface Transaction{
    id: number,
    title:string,
    amount:number,
    category: string,
    createdAt: string,
    type: string
};

type transactionInput = Omit<Transaction,'id' | 'createdAt'>

interface transactionContextProps{
    children: ReactNode;
}

interface TransactionsContextData{
    transactions:Transaction[],
    createTransaction:(transaction:transactionInput)=> Promise<void>
}

const TransactionContext= createContext<TransactionsContextData>(
    {} as TransactionsContextData 
    )



export function TransactionProvider({children}: transactionContextProps){
    const [transactions, setTransactions]= useState<Transaction[]>([])
 

  useEffect(()=>{
      api.get('transactions')
        .then(response=>  setTransactions(response.data.transactions))
  },[]);

  async function createTransaction(transactionInput:transactionInput){
    const response = await api.post('/transactions', transactionInput)
    const { transaction }= response.data

    setTransactions([...transactions, {...transaction, createdAt: new Date()}])
  }

//   =============================================== RETURN

  return (
    <TransactionContext.Provider value={{transactions , createTransaction}}>
        {children}
    </TransactionContext.Provider>
  )
}

export function useTransactions(){
  const context = useContext(TransactionContext)
  return context
}