import React, { Component } from 'react'
import Search from '../search/Search.js'
import Movies from '../movies/Movies'

class App extends Component {

    state = {
         movies_list : [

            {
                "id":1,
                "name":"Fight Club",
                "rating":7.8,
                "overview":"Thirty years after defeating the Galactic Empire, Han Solo and his allies face a new threat from the evil Kylo Ren and his army of Stormtroopers.",
                "imageUrl":"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg"
        
            },
        
            {
                "id":2,
                "name":"Grizzly Man",
                "rating":6.9,
                "overview": "Werner Herzog's documentary film about the \"Grizzly Man\" Timothy Treadwell and what the thirteen summers in a National Park in Alaska were like in one man's attempt to protect the grizzly bears. The film is full of unique images and a look into the spirit of a man who sacrificed himself for nature.",
        
                "imageUrl":"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/zuZWpcuye25rpsiZ4XzsAvmLDHG.jpg"
        
            },
        
            {
                "id":3,
                "name":"Reservoir Dogs",
                "rating":8.8,
                "overview": "A botched robbery indicates a police informant, and the pressure mounts in the aftermath at a warehouse. Crime begets violence as the survivors -- veteran Mr. White, newcomer Mr. Orange, psychopathic parolee Mr. Blonde, bickering weasel Mr. Pink and Nice Guy Eddie -- unravel.",
                "imageUrl":"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/AjTtJNumZyUDz33VtMlF1K8JPsE.jpg"
        
            },
        
        
        
        
        
        ] 
    }



    render() {
        return(
           <div className="container">
               <div className="row">
                    <div className="col-md-12">
                        <Search />
                       
                    </div>
               </div>

               <Movies />
           </div>
        )
    }

}


export default App;