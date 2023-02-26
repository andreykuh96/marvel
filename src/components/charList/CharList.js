import './charList.scss';
import { Component } from 'react';
import MarvelServices from '../../services/MarvelServices';
import ErrorMessage from '../UI/errorMessage/ErrorMessage';
import Spinner from '../UI/Spinner';
import PropTypes from 'prop-types';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
        loadingChars: false,
        offset: 250,
        charEnded: false,
    }

    marvelService = new MarvelServices();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onRequestLoading();
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError);
    }

    onRequestLoading = () => {
        this.setState({
            loadingChars: true,
        })
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

    onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) ended = true;
        
        this.onLoading();
        this.setState(({offset, charList}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            loadingChars: false,
            offset: offset + 9,
            charEnded: ended,
        }))
    }

    itemsRef = [];

    setRef = el => {
        this.itemsRef.push(el);
    }

    focusOnItem = (id) => {
        this.itemsRef.forEach(item => item.classList.remove('char__item_selected'));
        this.itemsRef[id].classList.add('char__item_selected');
        this.itemsRef[id].focus();
    }

    renderItem = (charList) => {
        const card = charList.map((card, i) => {
            let imgStyle = {objectFit: 'cover'}
            if (card.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {objectFit: 'fill'}
            }
            
            return (
                <li 
                    className="char__item"
                    key={card.id}
                    ref={this.setRef}
                    onClick={() => {
                        this.props.onCharSelected(card.id);
                        this.focusOnItem(i)
                    }}
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
        const {charList, loading, error, loadingChars, offset, charEnded} = this.state;

        const card = this.renderItem(charList);
        
        const errorMessage = error ? <ErrorMessage/> : null,
              spinner = loading ? <Spinner/> : null,
              content = !(loading || error) ? card : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button 
                    className="button button__main button__long"
                    disabled={loadingChars}
                    style={{display: charEnded ? 'none' : 'block'}}
                    onClick={() => this.onRequest(offset)}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;