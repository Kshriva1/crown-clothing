import React from 'react';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component.jsx';
import {signInWithGoogle} from '../../firebase/firebase.utils';

class SignIn extends React.Component{
	constructor(props) {
		super(props);
		this.state={
			email:'',
			password:''
		}
	}

	handleSubmit = event => {
		event.preventDefault();
		this.setState({email:"",password:""})
	}

	handleChange = (e) => {
		const {value,name} = e.target;
		this.setState({[name] : value})
	}

	render() {
		return (
               <div className='sign-in'>
               <h2>I already have an account</h2>
               <span>Sign in with your email and password</span>  
               <form onSubmit={this.handleSubmit}>
                 <FormInput name='email' handleChange={this.handleChange} type='email' label='email' value={this.state.email} required />
                 
                 <FormInput name='password' type='password' handleChange={this.handleChange} label='password' value={this.state.password} required />
                 
                 <CustomButton type='submit'>
                   Sign In
                 </CustomButton>
                 <CustomButton onClick={signInWithGoogle}>{' '}
                  Sign In with Google{' '}
                 </CustomButton>  
               </form>
               </div>
			)
	}
}

export default SignIn