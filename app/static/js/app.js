/* Add your Application JavaScript */
const NewsList = {
  name: 'NewsList',
  template: `
      <div class="news">
        <div class="search-form form-inline d-flex justify-content-center">
          <div class="form-group mx-sm-3 mb-2">
            <label class="sr-only" for="search">Search</label>
            <input type="search" name="search" v-model="searchTerm" id="search" class="form-control mb-2 mr-sm-2" placeholder="Entersearch term here" />
            <p>You are searching for {{ searchTerm }}</p>
            <button class="btn btn-primary mb-2" @click="searchNews">Search</button>
          </div>
        </div>
        <h2 class="heading">News</h2>
        <ul class="news__list row">
          <li v-for="article in articles" class="news__item card col-lg-3 col-md-4 col-sm-5 col-9 preview-card">
            <hr>
            <div class="card-body preview-card-body">
              <h4 class="card-title preview-card-title">{{article.title}}</h4>
              <img class="card-img-top" :src=article.urlToImage alt="Card image cap"> 
              <div class="card-footer preview-card-footer">
                <p>{{article.description}}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
  `,
  created(){
    let self = this;
    fetch('https://newsapi.org/v2/top-headlines?country=us',
    {
      headers: {
        'Authorization': 'Bearer '
      }
    })
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      console.log(data);
      self.articles = data.articles;
    });
  },
  data(){
    return {
      articles:[],
      searchTerm: ''
    }
  },
  methods: {
    searchNews(){
      let self = this;
      fetch('https://newsapi.org/v2/everything?q='+self.searchTerm+'&language=en',{
        headers: {
          'Authorization': 'Bearer '
        }
      })
      .then(function(response){
        return response.json();
      })
      .then(function(data){
        console.log(data);
        self.articles = data.articles;
      });
    }
  }
};


const Home = {
  name: 'Home',
  template: `
      <div class="home">
        <img src="/static/images/logo.png" alt="VueJS Logo">
        <h1>{{ welcome }}</h1>
      </div>
  `,
  data() {
    return {
      welcome: 'Hello World! Welcome to VueJS'
    }
  }
};


/**************Router Definition**************/
const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/news', component: NewsList }
  ]
});

/*************App Definition********************/
const app = Vue.createApp({
  components:{
    'home': Home,
    'news-list': NewsList
  },
  data() {
    return {
      welcome: 'Hello World! Welcome to VueJS'
    }
  }
});

/******************Components Definition***************/
app.component('app-header', {
  name: 'AppHeader',
  template: `
      <header>
          <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
            <a class="navbar-brand" href="#">VueJS App</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <router-link to="/" class="nav-link" href="#">Home <span class="sr-only">(current)</span></router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/news" class="nav-link" href="#">News</router-link>
                </li>
              </ul>
            </div>
          </nav>
      </header>    
  `,
  data: function() {
    return {};
  }
});

app.component('app-footer', {
  name: 'AppFooter',
  template: `
      <footer>
          <div class="container">
              <p>Copyright &copy {{ year }} Flask Inc.</p>
          </div>
      </footer>
  `,
  data: function() {
      return {
          year: (new Date).getFullYear()
      }
  }
});

app.use(router);
app.mount('#app');
