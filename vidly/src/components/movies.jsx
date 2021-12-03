import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'
import Like from './common/like';
import { Button } from 'react-bootstrap';
import { getMovies } from '../services/fakeMovieService'

class MovieList extends Component {
    state = {
        movies: [
        ]
    }

    constructor(props) {
        super(props);
        const movies = getMovies();
        this.state = { movies };
    }
    handleDelete = movieId => {
        const movies = this.state.movies.filter(m => m._id !== movieId);
        this.setState({ movies });
    };

    handleLiked = movie => {
        const movies = [...this.state.movies];
        const index = this.state.movies.indexOf(movie);
        movies[index] = { ...movie };
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    };


    render() {
        if (this.state.movies.length === 0) {
            return <p> There are no movies in the database.</p>;
        }
        return (
            <React.Fragment>
                <p> Showing {this.state.movies.length} movies in the database.</p>
                <Table responsive="sm">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Stock</th>
                            <th>Rate</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.movies.map(movie => (
                            <tr key={movie._id}>
                                <td>{movie.title}</td>
                                <td>{movie.genre.name}</td>
                                <td>{movie.numberInStock}</td>
                                <td>{movie.dailyRentalRate}</td>
                                <td>
                                    <Like
                                        liked={movie.liked}
                                        onClick={() => this.handleLiked(movie)}
                                    />
                                </td>
                                <td>
                                    <Button
                                        variant="danger"
                                        onClick={() => this.handleDelete(movie._id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </React.Fragment>
        );
    }
}

export default MovieList;