import React, { Component } from 'react'

class ErrorBoundry extends Component {
    constructor(){
        super();
        this.state = {
            hasError: false
        }
    }

    componentDidCatch = (err, info) => {
        this.setState({hasError : true});
    }

    render(){
        return(
            this.state.hasError ? (<div className='f1 ma3 red'>{`Oops! something went wrong, you can report the issue to: vtmpenyana@gmail.com`}</div>) : <div>{this.props.children}</div>
        )
    }
}


export default ErrorBoundry;