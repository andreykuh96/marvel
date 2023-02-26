import './charInfo.scss';
import { Component } from 'react';
import MarvelServices from '../../services/MarvelServices';
import Spinner from '../UI/Spinner';
import ErrorMessage from '../UI/errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import PropTypes from 'prop-types';

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false,
    }

    marvelService = new MarvelServices();

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
        });
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        });
    }

    onCharLoading = () => {
        this.setState({
            loading: true,
        })
    }

    updateChar = () => {
        const {charId} = this.props;

        if (!charId) {
            return;
        }

        this.onCharLoading();
        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    render() {
        const {char, loading, error} = this.state;
        const skeleton = char || loading || error ? null : <Skeleton/>;
        const spinner = loading ? <Spinner/> : null;
        const errorMessage = error ? <ErrorMessage/> : null;
        const content = !(loading || error || !char) ? <View char={char} /> : null;

        return (
            <div className="char__info">
                {skeleton}
                {spinner}
                {errorMessage}
                {content}
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;

    let imgStyle = {objectFit: 'cover'}
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {objectFit: 'fill'}
    }

    return (
        <>
            <div className="char__basics">
                <img style={imgStyle} src={thumbnail} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a rel="noopener noreferrer" target='_blank' href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a rel="noopener noreferrer" target='_blank' href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There is no comics with this character'}
                {
                    comics.map((comic, index) => {
                        return (
                            <li key={index} className="char__comics-item">
                                <a rel="noopener noreferrer" target='_blank' href={comic.resourceURI}>{comic.name}</a>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;