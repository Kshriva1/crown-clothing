import React from 'react';
import CartItem from '../cart-items/cart-items.component.jsx';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {createStructuredSelector} from 'reselect';
import {toggleCartHidden} from '../../redux/cart/cart.actions';
import CustomButton from '../custom-button/custom-button.component';
import {selectCartItems} from '../../redux/cart/cart.selectors';

import './cart-dropdown.styles.scss';

const CartDropdown = ({cartItems,history,dispatch}) => {
  return(
  <div className='cart-dropdown'>
   <div className='cart-items'>
   { cartItems.length ? (
   	cartItems.map(cartItem =>(
     <CartItem key ={cartItem.id} item={cartItem}/>
   		))
   ) : 
     <span className="empty-message">{"Your cart is empty"}</span>
   }

   </div>
    <CustomButton onClick={() => {
      history.push('./checkout')
      dispatch(toggleCartHidden())
    }}>Go To Checkout</CustomButton>
  </div>

	)
  }

const mapStateToProps = createStructuredSelector ({
   cartItems: selectCartItems
})

export default withRouter(connect(mapStateToProps)(CartDropdown))