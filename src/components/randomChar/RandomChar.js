import MarvelService from '../../services/MarvelService';

import { Component } from 'react';
import RandomCharItem from '../randomCharItem/RandomCharItem';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import mjolnir from '../../resources/img/mjolnir.png';

import './randomChar.scss';

class RandomChar extends Component {
    state = {
        char: {},
        loading: true,
        error: false,
    }
    
    marvelService = new MarvelService();
    
    componentDidMount() {
        // this.timerId = setInterval(this.updateChar, 15000);
        this.updateChar()
        // console.log('mount')
    }

    // componentWillUnmount() {
    //     clearInterval(this.timerId);
    // }

    onCharLoaded = (char) => {
        this.setState({ char, loading: false });
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.onCharLoading();
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false,
        })
    }

    render() {
        // console.log('render')
        const { char, loading, error } = this.state;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? <RandomCharItem char={char} /> : null;
        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br />
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button onClick={this.updateChar} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div>
            </div>
        )
    }
}

export default RandomChar;