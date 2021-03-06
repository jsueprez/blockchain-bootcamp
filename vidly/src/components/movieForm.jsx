import Joi from 'joi-browser'
import Form from './common/form'
import { getGenres } from '../services/fakeGenreService'
import { getMovie, saveMovie } from '../services/fakeMovieService'

class MovieForm extends Form {

    state = {
        data:
        {
            title: '',
            genreId: '',
            numberInStock: '',
            dailyRentalRate: '',
        },
        genres: [],
        errors: {}
    }

    schema = {
        title: Joi.string().required().label("Title"),
        genreId: Joi.string().required().label("Genre"),
        numberInStock: Joi.number().required().integer().min(0).max(100).label("Number in Stock"),
        dailyRentalRate: Joi.number().required().min(0).max(10).label("Rate"),
    }

    componentDidMount() {
        const genres = [...getGenres()];
        this.setState({ genres })

        const movieId = this.props.match.params.id;
        if (movieId === "new") return;

        const movie = getMovie(movieId);
        this.setState({ data: this.mapToViewModel(movie) })
    }

    doSubmit = () => {
        //call to the backend services        
        saveMovie(this.state.data);
        console.log('Submitted')
    }

    mapToViewModel(movie) {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        }
    }

    render() {
        return (
            <div>
                <h1>Movie Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("title", "Title")}
                    {this.renderDropdown("genreId", "Genre", this.state.genres)}
                    {this.renderInput("numberInStock", "Number in Stock")}
                    {this.renderInput("dailyRentalRate", "Rate")}
                    {this.renderButton("Save")}
                </form>
            </div >
        );
    }
}

export default MovieForm;