import React, { Component } from 'react'
import './Stocks.css'
import axios from 'axios';

class Stocks extends Component {

   state = {
      data: [],
      show: false,

      name: '',
      symbol: '',
      id: '',

      share: '',
      buyprice: '',
      date: ''
   }

   componentDidMount() {

      axios.get(`https://ga-fpt.firebaseio.com/allStocks.json`)
         .then(res => {
            const stocks = res.data;
            this.setState({
               data: stocks
            });
         })
   }

   componentWillUpdate() {

      axios.get(`https://ga-fpt.firebaseio.com/allStocks.json`)
         .then(res => {
            const stocks = res.data;
            this.setState({
               data: stocks
            });
         });
   }

   showModal = (e) => {
      this.setState({

         name: e.target.name,
         symbol: e.target.innerHTML,
         id: e.target.id,

         show: true
      });

      console.log('show modal called:  ' + e.target.id);
   }

   hideModal = () => {
      this.setState({
         show: false
      });
   }

   handleChange = (e) => {
      this.setState({

         [e.target.name]: e.target.value
      });
      // console.log(this.state.date);
   }

   postData = (e) => {

      e.preventDefault();

      var id = e.target.id;
      console.log('button is id' + id);

      axios.post('https://ga-fpt.firebaseio.com/active.json', {
         symbol: this.state.symbol,
         name: this.state.name,
         share: this.state.share,
         buyprice: this.state.buyprice,
         date: this.state.date

      })
         .then(function (response) {
            document.querySelector('form[name="formdata"]').reset();

         })
         .catch(function (error) {
            console.log(error);
         });

      this.setState({
         show: false
      });

      axios.delete(`https://ga-fpt.firebaseio.com/allStocks/${id}.json`);
   }

   render() {

      return (
         <>
            <div id="addstocks">
               <h2>Add Stocks to my Stocks</h2>

               {
                  (this.state.data == null) ? (<h3>ALL STOCKS ADDED</h3>) : (
                  Object.keys(this.state.data).map((key) => {
                     return <div key={key}>
                        <button id={key} onClick={this.showModal} name={this.state.data[key].name}>{this.state.data[key].symbol}</button>
                        <span>{this.state.data[key].name}</span>
                     </div>
                  })
                  )
               }

            </div>

            {/* Fragment 2 */}
            {/* The Modal */}
            <div id="myModal" className="modal" style={{
               display:

                  this.state.show ? 'block' : 'none'

            }}>

               {/* Modal content */}
               <div className="modal-content">
                  <span className="close" onClick={this.hideModal}>&times;</span>
                  <h3>Add {this.state.name} to my Stocks</h3>
                  {/* <form id="formdata"> */}
                  <form id={this.state.id} name="formdata" onSubmit={this.postData}>
                     <div className="modal-input">
                        <div>
                           <p>Compnay Name:</p>
                           <span>{this.state.name}</span>
                        </div>
                        <div>
                           <p>No. of Shares: </p>
                           <input type="text" placeholder="No. of Shares" name="share" onChange={(e) => { this.handleChange(e) }} required/>
                        </div>
                        <div>
                           <p>Buy Price:</p>
                           <input type="text" placeholder="Buying Price" name="buyprice" onChange={(e) => { this.handleChange(e) }} required/>
                        </div>
                        <div>
                           <p>Buy Date:</p>
                           <input type="date" name="date" onChange={(e) => { this.handleChange(e) }} required/>
                        </div>
                     </div>
                     {/* <input type="submit" value="ADD"/> */}
                  <div className="modal-button">
                     <div>
                        {/* <button id={this.state.id} onClick={this.postData}>ADD</button> */}
                        <button type="submit">ADD</button>
                     </div>
                  </div>
                  </form>
               </div>
            </div>
         </>
      )
   }
}

export default Stocks;
