import React, { Component } from "react";
import Search from "../search/Search.js";
import Movies from "../movies/Movies";
import axios from 'axios'
import AddMovies from '../movies/AddMovies'
import EditMovie from '../movies/EditMovie'
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";


require('dotenv').config()



class App extends Component {
  state = {
    movies_list: [],
    searchValue: "",
  };

//API -> https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API}&language=en-US&page=1

// API DELETE -> https://api.themoviedb.org/3/list/7095836/remove_item?media_id=23&api_key=6fe8370265c396656c58d7dd9ff3e712

//MY_FILM_LIST DELETE -> https://api.themoviedb.org/3/list/${process.env.REACT_APP_MY_LIST_ID}/remove_item?api_key=${process.env.REACT_APP_API}&session_id=${process.env.REACT_APP_SESSION_ID}&media_id=761053




//_________________________________________________________________componentDidMount()__________________________________________________
  async componentDidMount() {

       // const result = await axios(`  https://api.themoviedb.org/3/list/7095836?api_key=${process.env.REACT_APP_API}&language=en-US`)
        const result = await axios.get('http://localhost:3004/movies_list')
         console.log(result.data)

        this.setState({
            movies_list : result.data
        })

  }


//______________________________________________ deleteMovie()____________________________________________________________________________________________________________
  
deleteMovie = async  (movie) => {
    axios.delete(`http://localhost:3004/movies_list/${movie.id}`)
    //axios.post(`https://api.themoviedb.org/3/list/${process.env.REACT_APP_MY_LIST_ID}/remove_item?api_key=${process.env.REACT_APP_API}&session_id=${process.env.REACT_APP_SESSION_ID}&media_id=${movie.id}
   // `)
    const new_movies_list = this.state.movies_list.filter(
      (mv) => mv.id !== movie.id

    );
    this.setState((state) => ({
      //Var olan state'yi güncelliyoruz burda, Yani önceki durumun üzerinden işlem yapıyoruz.
      movies_list: new_movies_list,
    }));
  };


//____________________________________________ searchMovies()__________________________________ (Eventi Parent'ta YAKALADIK, Childe PROPS OLARAK YOlluyoruz)
  searchMovies = (e) => {
    this.setState({
      searchValue: e.target.value, // state de  için boş olan searchValue'yi, EVENTIN targetinden gelen value'sini state'deki boş olan searchValue'ye aktarıyoruz.
    });
  };

//____________________________________________ addMovie() _____________________________________
  addMovie = async (movie) => {

    await axios.post('http://localhost:3004/movies_list', movie)

    this.setState( state => ({
        movies_list :  state.movies_list.concat([movie])
    }))

  }

//_________________________________________________________________________ RENDER________________________
  render() {
    
    let filterMovies = this.state.movies_list.filter((movie) => {
      return (
        movie.name
          .toLowerCase()
          .indexOf(this.state.searchValue.toLowerCase()) !== -1 ||
        movie.overview
          .toLowerCase()
          .indexOf(this.state.searchValue.toLowerCase()) !== -1
      );

      }).sort((x,y) => {
        return x.id < y.id ? 1 : x.id > y.id ? -1 : 0
      })

        return (
          <Router>

          <Switch>           
            <Route path="/"  exact  >     
                    <div className="container">
                            <div className="row">
                              <div className="col-md-12">
                                <Search searchMovie={this.searchMovies} />
                              </div>
                            </div>
                        <Movies
                              movies_list={filterMovies}
                              plsDeleteMovie={this.deleteMovie} // PROPS HALİNE GETİRİYORUZ, PARENT'TAKİ FUNCTIONU.    
                        />
                    </div>       
                </Route>   

                <Route path="/add-movie"  render={({history}) => (

                      <AddMovies  
                        onAddNewMovie = {(movie) => { 
                          
                          this.addMovie(movie) 
                          history.push('/')

                        } }                       
                      />
                       )} > 
          
                </Route>   

                <Route path={`/edit-movie/:id`} component={EditMovie} />           
          </Switch>
          </Router>
        );
  }
}

export default App;
