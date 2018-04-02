import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        this.eventSource = new EventSource('http://localhost:8080/all');
        this.eventSource.addEventListener('root', (data) => {
            let json = JSON.parse(data.data)
            this.state.posts.push(json.name)
            this.setState ( {
                posts : this.state.posts
            })
        });
    }

    // https://blog.hellojs.org/fetching-api-data-with-react-js-460fe8bbf8f2
    // fetchFirst(url) {
    //     var that = this;
    //     if (url) {
    //         fetch('http://localhost:8080/all').then(function (response) {
    //             return response.json();
    //         }).then(function (result) {
    //             console.log(result);
    //             that.setState({ posts: result });
    //             console.log(that.state.posts);
    //         });
    //     }
    // }
    // componentWillMount() {
    //     this.fetchFirst("reactjs");
    //
    // }
    render() {

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">React AJAX Example</h1>
                </header>
                <p className="App-intro">
                    <ul>
                        {this.state.posts.map(post =>
                            <li key={post.id}>{post.title}</li>
                        )}
                    </ul>
                </p>
            </div>
        );
    }
}

export default App;
