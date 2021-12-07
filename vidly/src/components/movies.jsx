import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService'
import { getGenres } from '../services/fakeGenreService'
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate'
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import _ from 'lodash'
import { Link } from 'react-router-dom';
class MovieList extends Component {
    state = {
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
        sortColumn: { path: 'title', order: 'asc' },
        selectedGenre: 'All Genres',
    }

    componentDidMount() {
        const genres = [{ _id: "", name: 'All Genres' }, ...getGenres()];
        this.setState({ movies: getMovies(), genres })
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

    handlePageChanged = pageNumber => {
        this.setState({ currentPage: pageNumber });
    }

    handleGenreSelect = genre => {
        this.setState({ selectedGenre: genre, currentPage: 1 });
    }

    handleSort = sortColumn => {
        this.setState({ sortColumn });
    }

    handleOnSave = () => {
        console.log('working')
    }

    getPagedData = () => {

        const {
            pageSize,
            currentPage,
            sortColumn,
            selectedGenre,
            movies: allMovies
        } = this.state;


        const filtered = selectedGenre && selectedGenre._id
            ? allMovies.filter(m => m.genre._id === selectedGenre._id)
            : allMovies;

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

        const movies = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: movies }
    }

    render() {
        const { length: count } = this.state.movies;

        const {
            pageSize,
            currentPage,
            selectedGenre,
            genres,
            sortColumn } = this.state;

        if (count === 0) {
            return <p> There are no movies in the database.</p>;
        }

        const { totalCount, data: movies } = this.getPagedData();

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-4">
                        <ListGroup
                            items={genres}
                            onItemSelect={this.handleGenreSelect}
                            selectedItem={selectedGenre}
                        ></ListGroup>
                    </div>
                    <div className="col-8">
                        <Link
                            to='/movies/new'
                            state={{ testvalue: "hello" }}>
                            <button className="btn btn-primary mb-2" >
                                New Movie
                            </button>
                        </Link>

                        <p> Showing {totalCount} movies in the database.</p>
                        <MoviesTable
                            sortColumn={sortColumn}
                            onDelete={this.handleDelete}
                            onLike={this.handleLiked}
                            onSort={this.handleSort}
                            movies={movies}>
                        </MoviesTable>
                        <Pagination
                            itemsCount={totalCount}
                            pageSize={pageSize}
                            onPageChanged={this.handlePageChanged}
                            currentPage={currentPage}>
                        </Pagination>
                    </div>
                </div>


            </React.Fragment >
        );
    }
}

export default MovieList;