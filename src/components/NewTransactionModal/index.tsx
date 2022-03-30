import {Container, RadioBox, TransactionTypeContainer} from './style'

import { FormEvent, useState } from 'react'
import Modal from 'react-modal'
import { api } from '../../services/api'
import { useTransactions } from '../../hooks/useTransactions'

import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'


interface newTransactionProps{
    isOpen:boolean;
    onRequestClose: ()=> void;
}

export function NewTransactionModal({isOpen,onRequestClose}:newTransactionProps){
    const { createTransaction } = useTransactions()

    const [title, setTitle] =useState('')
    const [amount, setAmount] =useState(0)
    const [category, setCategory] =useState('')
    const [type,setType]= useState('none');

    async function handleCreateNewTransaction(event:FormEvent){
        event.preventDefault();
        if(title==='' || amount === 0 || category==='' || type === '')
        {throw new Error('invalid fields')}
        else{
       await createTransaction({
            title,
            amount,
            category,
            type
        })
        onRequestClose();
        setTitle('');
        setAmount(0);
        setCategory('');
        setType('none');
        }
    }


    // ========================================================================= Return
    return(
    <Modal 
    isOpen={isOpen} 
    onRequestClose={onRequestClose}
    overlayClassName= 'react-modal-overlay'
    className='react-modal-content'
  >
    <button type='button'
     onClick={onRequestClose}
     className='react-modal-close'
    >
        <img src= {closeImg} alt="fechar modal" />
    </button>

    <Container onSubmit={handleCreateNewTransaction}>
    <h2>Cadastrar Transação</h2>
    <input placeholder='Titulo' 
    value={title} 
    onChange={event=>setTitle(event.target.value)}
    type='string'
    />
    
    <input placeholder='Valor'   
    value={amount} 
    onChange={event=>setAmount(Number(event.target.value))} 
    type='number'
    />
    
    <TransactionTypeContainer>
        <RadioBox 
        type='button'
        onClick={() =>{setType('deposit')}}
        isActive={type=== 'deposit'}
        activeColor='green'
        >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
        </RadioBox>
        <RadioBox 
        type='button'
        onClick={() =>{setType('withdraw')}}
        isActive={type=== 'withdraw'}
        activeColor='red'
        >
            <img src={outcomeImg} alt="Despesas" />
            <span>Despesa</span>
        </RadioBox>
    </TransactionTypeContainer>


    <input placeholder='Categoria' 
    value={category} 
    onChange={event=>setCategory(event.target.value)} 
    type='string'
    />

    <button type='submit'>Submit</button>
    </Container>
  </Modal>
    )
}