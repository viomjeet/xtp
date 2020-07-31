import React from 'react';
import Axios from 'axios';
import EpsCard from './components/card';
import { Container } from 'react-bootstrap';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      episodes: [],
      fullEpisode: [],
      search: '',
      loading: false,
      message: {
        error: "",
        success: '',
      },
      pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
      getPage: ''
    }
  }
  componentDidMount() {
    this.fetchApi();
  }

  selectPage = (event) => {
    this.setState({ getPage: event.target.value })
    console.log(event.target.value);
    Axios("https://rickandmortyapi.com/api/character/?page=" + event.target.value)
      .then(jsondata => {
        this.setState({ episodes: jsondata.data.results });
        this.setState({ fullEpisode: jsondata.data.results });
      })

  }
  searchItems = (e) => {
    const { episodes } = this.state;
    let result = e.target.value.toLocaleLowerCase();
    this.setState({ search: e.target.value })
    if (result !== '') {
      this.setState({ episodes: episodes.filter(items => items.name.toLocaleLowerCase().indexOf(result) !== -1) })
    } else {
      this.setState({ episodes: this.state.fullEpisode })
    }
  }

  fetchApi = async () => {
    this.state.loading = true;
    await Axios("https://rickandmortyapi.com/api/character/?page=" + 1)
      .then(jsondata => {
        this.state.loading = false;
        this.setState({ episodes: jsondata.data.results });
        this.setState({ fullEpisode: jsondata.data.results });
      })
      .catch(error => console.log(error.message))
  }

  render() {
    const { episodes } = this.state;
    const { loading } = this.state;
    const { pages } = this.state;
    const { getPage } = this.state;
    return (
      <React.Fragment>
        <div className="headerTitle">
          <Container>
            <h4>
              Selected Page <span>{getPage === '' ? "1" : getPage}</span>
            </h4>
          </Container>
        </div>

        <Container>
          <div className="mobRow">
            <div className="form-group">
              <div className="input-group">
                <select className="form-control" name="page" value={getPage} onChange={this.selectPage.bind(this)}>
                  <option value="">Select Page</option>
                  {pages.map(items => {
                    return <option key={items} value={items}>Page {items}</option>
                  })}
                </select>
                <div className="searchInput form-control">
                  <input typ="text"
                    className="searchControl"
                    name="search"
                    value={this.state.search}
                    onChange={this.searchItems.bind(this)}
                    placeholder="Search..."
                  />
                </div>
              </div>
            </div>
            {loading ? <span class="text-white">"Wait..."</span> : <EpsCard episodes={episodes} />}
          </div>
        </Container>

        <footer>
          <div className="container">
            <div className="ecart-footer">
              <a className="footer_link" rel="noopener noreferrer" href="https://www.viomjeet.net/" target="_blank">viomjeet</a>
              <span>Made with <i className="text-danger fad fa-heart"></i> in india</span>
            </div>
          </div>
        </footer>

      </React.Fragment>
    )
  }
}


export default App;
