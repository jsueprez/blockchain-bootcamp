import Joi from 'joi-browser'
import Form from './common/form'
import { getGenres } from '../services/fakeGenreService'

class MovieForm extends Form {

    state = {
        data:
        {
            title: '',
            genre: '',
            stock: '',
            rate: '',
        },
        genres: [],
        errors: {}
    }

    schema = {
        title: Joi.string().required().label("Title"),
        genre: Joi.string().required().label("Genre"),
        stock: Joi.number().required().integer().min(0).max(100).label("Number in Stock"),
        rate: Joi.number().required().integer().min(0).max(10).label("Rate"),
    }

    componentDidMount() {
        const genres = [{ _id: "", name: '' }, ...getGenres()];
        this.setState({ genres })
    }

    doSubmit = () => {
        //call to the backend services
        console.log('Submitted')
    }

    render() {
        const names = this.state.genres.map(genre => genre.name);
        return (
            <div>
                <h1>Movie Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("title", "Title")}
                    {this.renderDropdown("genre", "Genre", names)}
                    {this.renderInput("stock", "Number in Stock")}
                    {this.renderInput("rate", "Rate")}
                    {this.renderButton("Save")}
                </form>
            </div >
        );
    }
}

export default MovieForm;