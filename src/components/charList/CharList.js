import './charList.scss';
import { Component } from 'react';
import MarvelServices from '../../services/MarvelServices';
import ErrorMessage from '../UI/errorMessage/ErrorMessage';
import Spinner from '../UI/Spinner';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
    }

    marvelService = new MarvelServices();

    componentDidMount() {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharListLoaded)
            .catch(this.onError);
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        });
    }

    onLoading = () => {
        this.setState({
            loading: true,
        })
    }

    onCharListLoaded = (charList) => {
        this.onLoading();
        this.setState({
            charList,
            loading: false,
        })
    }

    renderItem = (charList) => {
        const card = charList.map(card => {
            let imgStyle = {objectFit: 'cover'}
            if (card.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {objectFit: 'fill'}
            }
            
            return (
                <li 
                    className="char__item"
                    key={card.id}
                    onClick={() => this.props.onCharSelected(card.id)}
                >
                    <img style={imgStyle} src={card.thumbnail} alt="abyss"/>
                    <div className="char__name">{card.name}</div>
                </li>
            )
        })

        return (
            <ul className="char__grid">
                {card}
            </ul>
        );
    }

    render() {
        const {charList, loading, error} = this.state;

        const card = this.renderItem(charList);
        
        const errorMessage = error ? <ErrorMessage/> : null,
              spinner = loading ? <Spinner/> : null,
              content = !(loading || error) ? card : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;