import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';
import { Component } from "react";
import ErrorBoundary from "../UI/errorBoundary/ErrorBoundary";

class App extends Component {
    state = {
        charSelected: null,
    }

    onCharSelected = (id) => {
        this.setState({
            charSelected: id,
        })
    }

    render() {
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <ErrorBoundary>
                        <RandomChar/>
                    </ErrorBoundary>
                    <div className="char__content">
                        <ErrorBoundary>
                            <CharList onCharSelected={this.onCharSelected} />
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <CharInfo charId={this.state.charSelected} />
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

export default App;