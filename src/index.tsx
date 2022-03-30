import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import { createServer, Model } from 'miragejs';
import { timeStamp } from 'console';


createServer({
  models:{
    transaction: Model,
  },

  seeds(server){
    server.db.loadData({
      transactions :[
        {
        id: 1,
        title:'Freela Website',
        type:'deposit',
        category:'develop',
        amount:6000,
        createdAt: new Date('2021-12-02 09:00:30')
      },{
          id: 2,
          title:'Aluguel',
          type:'withdraw',
          category:'Casa',
          amount:1100,
          createdAt: new Date('2021-12-15 09:00:30')
        },]
    })
  }
  ,

  routes(){
    this.namespace="api";
    
    this.get('/transactions',()=>{
      return this.schema.all('transaction')
    });

    this.post('/transactions',(schema,request)=>{
      const data =JSON.parse(request.requestBody)

      return schema.create('transaction',data)
    });


    

  }
})
ReactDOM.render(
<App/>,
  document.getElementById('root')
);

