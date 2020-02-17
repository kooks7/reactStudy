### 세팅

1. `$ npx create-react-app test `

2. src에 App.js 와 index.js 빼고 모두 삭제
   `App.js`

   ```javascript
   import React from 'react';
   
   function App() {
     return <div>Hello!!!</div>;
   }
   
   export default App;
   
   ```

   `index.js`

   ```javascript
   import React from 'react';
   import ReactDOM from 'react-dom';
   import App from './App';
   
   ReactDOM.render(<App />, document.getElementById('root'));
   
   ```

   * 브라우저에 보면 Hello!!! 라고 나타나 있다.
   * 하지만 우리는 public/index.html 에 글을 쓰지 않았다.
   * index.js의 ReactDOM.render을 통해 root에 App.js에 정의된 코드를 index.html에 넣어준다.
   * App.js 를 컴포넌트라고 한다. 항상 컴포넌트를 꾸민다. 
   * 컴포넌트는 HTML을 return 한다.

3. 새로운 컴포넌트 만들기

   src/Potato.js

   ```javascript
   import React from 'react';
   
   export const Potato = () => {
     return <h3>I love potato</h3>;
   };
   
   export default Potato;
   
   ```

4. App.js 에 Potato 넣기
   App.js

   ```javascript
   import React from 'react';
   import Potato from './Potato';
   
   function App() {
     return (
       <div>
         <h1>Hello!!!</h1>
         <Potato />
       </div>
     );
   }
   
   export default App;
   
   ```

5. 컴포넌트 만들어서 동적으로 생성하기
   App.js

   ```javascript
   import React from 'react';
   
   const Potato = ({ fav }) => {
     return <h1>I like {fav}</h1>;
   };
   
   function App() {
     return (
       <div>
         <h1>Hello!!!</h1>
         <Potato fav="kimchi" />
         <Potato fav="스파게티" />
         <Potato fav="치즈" />
         <Potato fav="스테이크" />
       </div>
     );
   }
   
   export default App;
   
   ```

   * 컴퍼넌트에 인자를 줄 수 있다. 그 인자를 사용해서 HTML로 보내줄 코드를 작성할 수 있습니다.

6. API 에서 음식 정보 가져왔다고 가정하고 App.js 작성하기

   ```javascript
   import React from 'react';
   
   const Food = ({ name, picture }) => {
     return (
       <div>
         <h1>I like {name}</h1>
         <img src={picture} />
       </div>
     );
   };
   
   const foodILike = [
     {
       name: 'KIMCHI',
       image:'img source 넣기'
     },
     {
       name: 'Gimbap',
       image:'img source 넣기'
     }
   ];
   
   function App() {
     return (
       <div>
         {foodILike.map(dish => {
           return <Food name={dish.name} picture={dish.image} />;
         })}
       </div>
     );
   }
   
   export default App;
   
   ```

7. 프로퍼티에 Rating 항목 추가
   App.js

   ```javascript
   const App = () => {
     return (
       <div>
         {foodILike.map(dish => {
           return (
             <Food
               key={dish.id}
               name={dish.name}
               picture={dish.image}
               rating={dish.rating}
             />
           );
         })}
       </div>
     );
   };
   ```

8. PropTypes 추가

   * 프로퍼티가 미리 지정해놓은 타입에 올바르게 사용되었는지 체크해주는 역할을 한다.

   * `$ npm i prop-types`

   * import 하기

     ```javascript
     import PropTypes from 'prop-types';
     ```

   * Food 프로퍼티 확인하기

     ```javascript
     Food.propTypes = {
       name: PropTypes.string.isRequired,
       picture: PropTypes.string.isRequired,
       rating: PropTypes.number.isRequired
     };
     ```

## 2. Class 컴포넌트

* React 는 자동적으로 나의 calss component의 render method를 실행한다.

* Class Component 는 state 를 가진다.

* state는 object이고 component의 data를 넣을 공간이 있다.

* 즉 내가 바꿀 data는 state 안에 넣으면 된다.

* ```javascript
  import React from 'react';
  import PropTypes from 'prop-types';
  
  class App extends React.Component {
    state = {
      count: 0
    };
  ///////////////////////////////////////////////////
    add = () => {
      this.state.count++;
      console.log('add');
    };
    minus = () => {
      this.state.count--;
      console.log('minus');
    };
  ///////////////////////////////////////////////////
    render() {
      return (
        <div>
          <h1>The number is : {this.state.count}</h1>
          <button onClick={this.add}>Add</button>
          <button onClick={this.minus}>Minus</button>
        </div>
      );
    }
  }
  
  export default App;
  
  ```

* 위에서 처럼 직접적으로 state 값을 바꿀수 없다. 따라서 새로운 상태로 변경 될 때마다 render 함수를 새로 실행할 수 있게 setState를 사용해야 한다.

  ```javascript
    add = () => {
      this.setState({ count: this.state.count + 1 });
      console.log('add');
    };
    minus = () => {
      this.setState({ count: this.state.count - 1 });
      console.log('minus');
    };
  ```

  성능 상 더 좋은 코드

  ```javascript
    add = () => {
      this.setState(current => ({ count: current.count + 1 })); // state를 호출하지 않았다.
      console.log('add');
    };
    minus = () => {
      this.setState(current => ({ count: current.count - 1 }));
      console.log('minus');
    };
  ```

## 3. Movie App 만들기  



#### 가장 많이 사용하는 component (Component Life Cycle)

1. Mounting

   맨 처음 실행

   * `constructor()`
   * `render()`
   * `componentDIdMount()`

2. Updating
   사용자에 의해 실행

   * `render()`
   * `componentDIdUpdate()`

3. Unmounting

   컴포넌트가 끝날 때

   * `componentWillUmount()`

### Movie App Api 가져오기

1. ` $ npm i axios`

2. aixos.get() 으로 Api 가져오기

   ```javascript
     componentDidMount() {
       axios.get('https://yts-proxy.now.sh/list_movies.json');
     }
   ```

3. axios 는 데이터 가져오는데 시간이 걸리므로 asyn await 사용하기

   ```javascript
     getMovies = async () => {
       const movies = await axios.get('https://yts-proxy.now.sh/list_movies.json');
     };
     componentDidMount() {
       this.getMovies();
     }
   ```

4. src/Movie.js 에 PropTyle 정의 하기

   ```javascript
   import React from 'react';
   import PropTypes from 'prop-types';
   
   const Movie = ({ id, year, title, summary, poster }) => {
     return <h4>{title}</h4>;
   };
   
   Movie.propType = {
     id: PropTypes.number.isRequired,
     title: PropTypes.string.isRequired,
     summary: PropTypes.string.isRequired,
     poster: PropTypes.string.isRequired,
     year: PropTypes.number.isRequired
   };
   
   export default Movie;
   
   ```

5. App.js 에 import 하기

   ```javascript
   import React from 'react';
   import axios from 'axios';
   import Movie from './Movie';
   
   class App extends React.Component {
     state = {
       isLoading: true,
       movies: []
     };
   
     // 영화 API 가져오기
     getMovies = async () => {
       const {
         data: {
           data: { movies }
         }
       } = await axios.get(
         'https://yts-proxy.now.sh/list_movies.json?sort_by=rating'
       );
       this.setState({ movies, isLoading: false });
     };
   
     componentDidMount() {
       this.getMovies();
     }
   
     render() {
       const { isLoading, movies } = this.state;
       return (
         <div>
           {isLoading
             ? 'Loading...'
             : movies.map(movie => {
                 return (
                   <Movie
                     key={movie.id}
                     id={movie.id}
                     year={movie.year}
                     title={movie.title}
                     summary={movie.summary}
                     poster={movie.medium_cover_image}
                   />
                 );
               })}
         </div>
       );
     }
   }
   
   export default App;
   
   ```

### Styling

1. App.js 수정

   ```javascript
   import React from 'react';
   import axios from 'axios';
   import Movie from './Movie';
   import './App.css';
   
   class App extends React.Component {
     state = {
       isLoading: true,
       movies: []
     };
   
     // 영화 API 가져오기
     getMovies = async () => {
       const {
         data: {
           data: { movies }
         }
       } = await axios.get(
         'https://yts-proxy.now.sh/list_movies.json?sort_by=rating'
       );
       this.setState({ movies, isLoading: false });
     };
   
     componentDidMount() {
       this.getMovies();
     }
   
     render() {
       const { isLoading, movies } = this.state;
       return (
         <section class="container">
           {isLoading ? (
             <div class="loader">
               <span class="loader_text">Loading...</span>
             </div>
           ) : (
             movies.map(movie => {
               return (
                 <div class="movies">
                   <Movie
                     key={movie.id}
                     id={movie.id}
                     year={movie.year}
                     title={movie.title}
                     summary={movie.summary}
                     poster={movie.medium_cover_image}
                   />
                 </div>
               );
             })
           )}
         </section>
       );
     }
   }
   
   export default App;
   
   ```

2. Movie.js 수정

   ```javascript
   import React from 'react';
   import PropTypes from 'prop-types';
   import './Movie.css';
   
   const Movie = ({ id, year, title, summary, poster }) => {
     return (
       <div class="movie">
         <img src={poster} alt={title} title={title}></img>
         <div class="move_data">
           <h3 class="movie_title">{title}</h3>
           <h5 class="movie_year">{year}</h5>
           <p class="movie_summary">{summary}</p>
         </div>
       </div>
     );
   };
   
   Movie.propType = {
     id: PropTypes.number.isRequired,
     title: PropTypes.string.isRequired,
     summary: PropTypes.string.isRequired,
     poster: PropTypes.string.isRequired,
     year: PropTypes.number.isRequired
   };
   
   export default Movie;
   
   ```



### 프로퍼티에 배열 추가하기

1. Movies에 genre 추가

   ```javascript
   const Movie = ({ id, year, title, summary, poster, genres }) => {
     return (
       <div class="movie">
         <img src={poster} alt={title} title={title}></img>
         <div className="move_data">
           <h3 className="movie_title">{title}</h3>
           <h5 className="movie_year">{year}</h5>
           <ul>
             {genres.map((genre, index) => (
               <li key={index} className="genres_genre">
                 {genre}
               </li>
             ))}
           </ul>
           <p className="movie_summary">{summary}</p>
         </div>
       </div>
     );
   };
   
   Movie.propType = {
     id: PropTypes.number.isRequired,
     title: PropTypes.string.isRequired,
     summary: PropTypes.string.isRequired,
     poster: PropTypes.string.isRequired,
     year: PropTypes.number.isRequired,
     genres: PropTypes.arrayOf(PropTypes.string).isRequired
   };
   ```

2. App.js 에 장르 추가

   ```javascript
         import React from 'react';
   import axios from 'axios';
   import Movie from './Movie';
   import './App.css';
   
   class App extends React.Component {
     state = {
       isLoading: true,
       movies: []
     };
   
     // 영화 API 가져오기
     getMovies = async () => {
       const {
         data: {
           data: { movies }
         }
       } = await axios.get(
         'https://yts-proxy.now.sh/list_movies.json?sort_by=rating'
       );
       this.setState({ movies, isLoading: false });
     };
   
     componentDidMount() {
       this.getMovies();
     }
   
     render() {
       const { isLoading, movies } = this.state;
       return (
         <section className="container">
           {isLoading ? (
             <div className="loader">
               <span className="loader_text">Loading...</span>
             </div>
           ) : (
             <div className="movies">
               {movies.map(movie => (
                 <Movie
                   key={movie.id}
                   genres={movie.genres}
                   id={movie.id}
                   year={movie.year}
                   title={movie.title}
                   summary={movie.summary}
                   poster={movie.medium_cover_image}
                 />
               ))}
             </div>
           )}
         </section>
       );
     }
   }
   
   export default App;
   
   ```

   

### Style 추가

1. App.css

   ```css
   * {
     box-sizing: border-box;
   }
   
   body {
     margin: 0;
     padding: 0;
     background-color: #eff3f7;
     height: 100%;
   }
   
   html,
   body,
   #potato,
   .container {
     height: 100%;
     display: flex;
     justify-content: center;
   }
   
   .loader {
     width: 100%;
     height: 100%;
     display: flex;
     justify-content: center;
     align-items: center;
     font-weight: 300;
   }
   
   .movies {
     display: flex;
     justify-content: space-between;
     align-items: flex-start;
     flex-wrap: wrap;
     padding: 50px;
     padding-top: 70px;
     width: 80%;
   }
   
   ```

2. Movie.css

   ```javascript
   .movies .movie {
     width: 45%;
     background-color: white;
     margin-bottom: 70px;
     display: flex;
     align-items: flex-start;
     justify-content: space-between;
     font-weight: 300;
     padding: 20px;
     border-radius: 5px;
     color: #adaeb9;
     box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
       0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);
   }
   
   .movie img {
     position: relative;
     top: -50px;
     max-width: 150px;
     width: 100%;
     margin-right: 30px;
     box-shadow: 0 30px 60px -12px rgba(50, 50, 93, 0.25),
       0 18px 36px -18px rgba(0, 0, 0, 0.3), 0 -12px 36px -8px rgba(0, 0, 0, 0.025);
   }
   
   .movie .movie__title,
   .movie .movie__year {
     margin: 0;
     font-weight: 300;
   }
   
   .movie .movie__title {
     margin-bottom: 5px;
     font-size: 24px;
     color: #2c2c2c;
   }
   
   .movie .movie__genres {
     list-style: none;
     padding: 0;
     margin: 0;
     display: flex;
     margin: 5px 0px;
   }
   
   .movie__genres li,
   .movie .movie__year {
     margin-right: 10px;
     font-size: 14px;
   }
   
   ```

3. summary 자르기

   * slice 메소드를 이용해서 배열 잘라주기.

   * Movie.js

     ```javascript
     const Movie = ({ id, year, title, summary, poster, genres }) => {
       return (
         <div class="movie">
           <img src={poster} alt={title} title={title}></img>
           <div className="movie__data">
             <h3 className="movie__title">{title}</h3>
             <h5 className="movie__year">{year}</h5>
             <ul className="movie__genres">
               {genres.map((genre, index) => (
                 <li key={index} className="genres__genre">
                   {genre}
                 </li>
               ))}
             </ul>
             <p className="movie__summary">{summary.slice(0, 140)} ...</p>
           </div>
         </div>
       );
     };
     ```

     

## 4. Conclusion

### gh page 설치

1. ` $ npm i gh-pages`

2. `pakage.json` 에 homepage 넣기

   ```json
   "homepage": "https://kooks7.github.io/reactStudy
   ```

3. `$ npm run build`

4. `pakage.json` deploy, predeploy 추가 하기

   ```json
     "scripts": {
       "start": "react-scripts start",
       "build": "react-scripts build",
       "deploy": "gh-pages -d build",
       "predeploy": "npm run build"
     },
   ```

5. ` $ npm run deploy` 배포 하기

## 5. Routing

동적인 페이지를 만들기 위해 네비게이션을 만든다.

1. src/에 components 폴더와 routes 폴더 생성

2. 기존 App.js를 routes/Home.js 로 옮김

3. App.js 에 Url에 따라 page 렌더 해주기

   * 잘못된 예

     ```javascript
     import React from 'react';
     import { HashRouter, Route } from 'react-router-dom';
     import About from './routes/About';
     import Home from './routes/Home';
     
     const App = () => {
       return (
         <HashRouter>
           <Route path="/about" component={About} />
           <Route path="/Home" component={Home} />
         </HashRouter>
       );
     };
     
     export default App;
     
     ```

     이렇게 작성하면 동시에 두개가 render 된다.

   * 올바른 App.js

     ```javascript
     import React from 'react';
     import { HashRouter, Route } from 'react-router-dom';
     import About from './routes/About';
     import Home from './routes/Home';
     
     const App = () => {
       return (
           //<HashRouter> 대신 <BrowserRouter> 를 사용하게 되면 URL에 # 가 붙지 않지만 github에 올리기 	   // 불편
         <HashRouter>
           <Route path="/" exact={true} component={Home} />
           <Route path="/about" component={About} />
         </HashRouter>
       );
     };
     
     export default App;
     
     ```

4. components/Navigation.js 추가

   ```javascript
   import React from 'react';
   import { Link } from 'react-router-dom';
   
   export const Navigation = () => {
       // <a href="/">Home</Link> 를 사용하게 되면 페이지가 리로딩 된다. 매우 느림
     return (
       <div>
         <Link to="/">Home</Link>
         <Link to="/about">About</Link>
       </div>
     );
   };
   
   export default Navigation;
   
   ```

   