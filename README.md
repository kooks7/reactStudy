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
   * **컴포넌트는 HTML을 `return` 하는 함수다!!**
* 리액트는 하나의 컴포넌트만 `return` 한다.

---

## 1. 컴포넌트

#### 컴포넌트 기본 사용법

1. 새로운 컴포넌트 만들기

   src/Potato.js

   ```javascript
   import React from 'react';
   
   export const Potato = () => {
     return <h3>I love potato</h3>;
   };
   
   export default Potato;
   
   ```

2. App.js 에 Potato 넣기
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

   리액트는 하나의 컴포넌트만 `return` 함으로 여러개의 컴포넌트를 합치자.

#### 동적 컴포넌트 생성

1. 컴포넌트에 `value` 주고 동적으로 생성하기
   App.js

   ```javascript
   import React from 'react';
   
   const Food = props => {
     console.log(props);
     return <h1>I like potato</h1>;
   };
   
   const App = () => {
     return (
       <div>
         <h1>Hello!</h1>
         <Food name="kimchi" something={[1, 2, 3, 4]} />
       </div>
     );
   };
   
   export default App;
   
   ```

   * 컴포넌트에 `value`를 줄 수 있습니다. 위 코드에서 `Potato ` 컴포넌트에 value를 주고 `property`로 fav라는 값을 줬습니다. 이렇게 동적으로 컴포넌트를 생성한다면 손쉽게 다양한 HTML을 랜더링 할 수 있습니다.
   * 브라우저에서 console 을 보면  `props`에 `kimchi`와 `[1,2,3,4,]` 가 객체로 전달 된 것을 볼 수 있습니다.

   

   * ES6 문법을 활용해 `{ }` 키 값을 넣어주면 그 식별자를 이용해서 프로퍼티를 가져올 수 있습니다.

   ```javascript
   import React from 'react';
   
   const Food = ({ fav }) => {
     return <h1>I like {fav}</h1>;
   };
   
   const App = () => {
     return (
       <div>
         <h1>Hello!</h1>
         <Food name="kimchi" />
       </div>
     );
   };
   
   export default App;
   
   ```

   

2. API 에서 음식 정보 가져왔다고 가정하고 App.js 작성하기

   * 이런식으로 코드를 작성하지는 않습니다.

     ```javascript
     import React from 'react';
     
     const Food = ({ fav }) => {
       return <h1>I like {fav}</h1>;
     };
     
     const App = () => {
       return (
         <div>
           <h1>Hello!</h1>
           // 이런식으로 하면 API에서 동적으로 데이터를 가져올 수 없음
           <Food name="kimchi" />
           <Food name="ramen" />
           <Food name="kimbap" />
           <Food name="noodle" />
         </div>
       );
     };
     
     export default App;
     
     ```

   * 동적으로 데이터를 가져오는 방법

     ```javascript
     import React from 'react';
     
     const Food = ({ fav }) => {
       return <h1>I like {fav}</h1>;
     };
     
     const foodILike = [
       {
         name: 'KIMCHI',
         image: 'img source 넣기'
       },
       {
         name: 'Gimbap',
         image: 'img source 넣기'
       }
     ];
     
     const App = () => {
       return (
         <div>
           {foodILike.map(e => {
             return <Food fav={e.name} image={e.image} />;
           })}
           <h1>Hello!</h1>
         </div>
       );
     };
     
     export default App;
     
     ```

   * 콜백 함수 만들어서 map에 넣어주기  ( 하지만 function을 만들지 않는게 더 깔끔)

     ```javascript
     import React from 'react';
     
     const Food = ({ fav }) => {
       return (
         <div>
           <h1>I like {fav}</h1>
           <p></p>
         </div>
       );
     };
     
     const foodILike = [
       {
         name: 'KIMCHI',
         image: 'img source 넣기'
       },
       {
         name: 'Gimbap',
         image: 'img source 넣기'
       }
     ];
     
     const renderFood = e => {
       return <Food fav={e.name} picture={e.image} />;
     };
     
     const App = () => {
       return (
         <div>
           {foodILike.map(e => {
            return <Food key={e.id} fav={e.name} image={e.image} />;
           })}
           <h1>Hello!</h1>
         </div>
       );
     };
     
     export default App;
     
     ```

3. 고유한 key 설정하기

   브라우저를 보면 `1 Warning: Each child in a list should have a unique "key" prop` 같은 에러를 볼 수 있다. React는 똑똑하지 않음으로 우리가 준 프로퍼티를 다 같은 프로퍼티라고 생각한다. 따라서 React가 식별할 수 있는 별도의 고유한 키를 전달 해주자.

   ```javascript
   ...
   const foodILike = [
     {
       id: 1,
       name: 'KIMCHI',
       image: 'img source 넣기'
     },
     {
       id: 2,
       name: 'Gimbap',
       image: 'img source 넣기'
     }
   ];
   
   const App = () => {
     return (
       <div>
         {foodILike.map(e => {
           return <Food key={e.id} fav={e.name} image={e.image} />;
         })}
         <h1>Hello!</h1>
       </div>
     );
   };
   
   export default App;
   
   ```

#### prototype 으로 props 체크하기

1. PropTypes 추가

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

------

## 2. State

#### class Component

* React 는 자동적으로 class component의 **render method**를 실행합니다. 따라서 React component에 render 메소드를 작성해주면 이 안에 있는 것들을 client 에게 보내줍니다. 
* **Class Component 는 state 를 가집니다.** 이것은 우리가 Class Component 를 사용하는 이유입니다.
* state는 object이고 component의 data를 넣을 공간이 있다.
* 즉 내가 바꿀 data는 state 안에 넣으면 된다.

#### 버튼 클릭하면 숫자 올라가는 코드 작성하기

* `state` 프로퍼티를 직접적으로 바꾸면 안된다.

  ```javascript
  import React from 'react';
  import PropTypes from 'prop-types';
  
  class App extends React.Component {
    state = {
      count: 0
    };
  
    add = () => {
      console.log('add');
      // this.state.count = 1;
        
    };
  
    minus = () => {
      console.log('Minus');
    };
  
  ...
  ```

  위 코드를 보면 `this.state.count` 를 통해 직접 값을 할당하려고 합니다. 이렇게 하시면 안됩니다. `setState()` 를 사용해서 값을 바꿔야 합니다. 왜냐하면 직접 값을 바꾸고자 하면 **React**는 **render** 함수를 재 실행하지 않게 됩니다. 자연스럽게 바뀐 값을 동적으로 보여줄 수 없을 것입니다.



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

* **성능 향상을 위해 이렇게 사용하자!**

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

### 가장 중요한 것은!

### setState 를 호출 할 때마다 React 는 Render 함수를 재 호출 한다!

------

## 3. 컴포넌트 Life Cycle

#### 1. Mounting

컴포넌트의 인스턴스가 생성되어 DOM 상에 삽입될 때에 순서대로 호출됩니다.

* `constructor()`
* `render()`
* `componentDidMount()` :
  외부에서 데이터를 불러와야 한다면, 네트워크 요청을 보내기 적절한 위치입니다. render 되기전에 데이터를 불러와야 하기 때문입니다.

#### 2. Updating

props 또는 state가 변경되면 갱신이 발생합니다. 아래 메서드들은 컴포넌트가 다시 **rendering** 때 순서대로 호출됩니다.

* `render()`
* `componentDidUpdate()`

#### 3. Unmounting

아래 메서드는 컴포넌트가 DOM 상에서 제거될 때에 호출됩니다.

* `componentWillUnmount()`





## 4. Movie App 만들기  



### Movie App Api 가져오기

#### `axios` 사용하기

1. ` $ npm i axios`

2. aixos.get() 으로 Api 가져오기

   ```javascript
     componentDidMount() {
       axios.get('https://yts-proxy.now.sh/list_movies.json');
     }
   ```

3. axios 는 데이터 가져오는데 시간이 걸리므로 asyn await 사용하기

   * async await 사용하기

     ```javascript
       getMovies = async () => {
         const movies = await axios.get('https://yts-proxy.now.sh/list_movies.json');
       };
       componentDidMount() {
         this.getMovies();
       }
     ```

   * `then()` 사용하기

     ```javascript
       getMovies = () => {
         return axios.get('https://yts-proxy.now.sh/list_movies.json');
       };
       componentDidMount() {
         this.getMovies()
           .then(data => {
             console.log(data);
           })
       }
     ```

     

   

4. src/Movie.js 에 PropType 정의 하기

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



### 카드 클릭했을 때 영화 정보 띄우기

> 모든 라우터에 안에 있는 라우터들을 props 를 가진다

```javascript
const App = () => {
  return (
    <HashRouter>
      <Navigation />
      <Route path="/" exact={true} component={Home} /> // react-router-dom 이 라우터 보내줌
      <Route path="/about" component={About} /> // react-router-dom 이 라우터 보내줌
    </HashRouter>
  );
};
```

