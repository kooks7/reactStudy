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

     

