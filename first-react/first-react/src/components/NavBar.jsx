import Badge from 'react-bootstrap/esm/Badge';

// stateless functional component

const NavBar = ({ totalCounters }) => {
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    NavBar
                    <Badge pill bg="secondary">
                        {totalCounters}
                    </Badge>
                </a>
            </div>
        </nav >
    );
}

export default NavBar;