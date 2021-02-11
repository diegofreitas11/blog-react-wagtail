import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import api from './service/api';
import ReactLoading from 'react-loading';


const PostPage = (props) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function loadPost(){
      await new Promise(resolve => setTimeout(resolve, 2000))
      let result = await api.get(
        `/api/v2/pages/${props.id}/`
      )
      setPost(result.data)
    }

    if(!post)
      loadPost();
  })

  return(
    <div id = 'main'>
      {(post &&
        <div id = 'post'>
          <img
            src = {`http://localhost:8000${post.post_image.url}`}
            width = '100%'
            height = '550px'
          />
          <h1>{post.title}</h1>

          <div 
            id = 'text'
            dangerouslySetInnerHTML={{
              __html: post.body
            }} 
          />
        </div>
      )||
        <div 
          id = 'loading-container'
        >
          <ReactLoading type = {'spokes'} color = {'#000'} height={200} width={100}/>
        </div>
      }
    </div>
  )
}


class Main extends React.Component{
    constructor(props){
      super(props);
      this.state = {};
    }

    componentDidMount(){
      this.loadData();
    }

    loadData = async () => {
      try{
        await new Promise(resolve => setTimeout(resolve, 2000));
        let result = await api.get(
          '/api/v2/pages/?type=posts.PostPage&fields=post_image&order=-id&limit=5'
        );

        let firstItem = result.data.items[0];
        result.data.items.shift();

        this.setState({
          firstItem,
          list: result.data.items,
          postsLoaded: 5
        });
      }catch(e){
        console.log(e)
      }
    }

    loadMore = async () => {

      this.setState({
        loadingMore: true
      })

      try{
        await new Promise(resolve => setTimeout(resolve, 2000));
        let result = await api.get(
          `/api/v2/pages/?type=posts.PostPage&fields=post_image&order=-id`+
          `&offset=${this.state.postsLoaded}&limit=5`
        );

        this.setState({
          list: this.state.list.concat(result.data.items),
          postsLoaded: this.state.postsLoaded + result.data.items.length,
          loadingMore: false
        })

      }catch(e){
        console.log(e)
      }
    }

    handlePostClick = (id) => {
      this.setState({
        openPostPage: id
      })
    }
    
    handleNavClick = () => {
      this.setState({
        openPostPage: null,
        list: null
      });

      this.loadData();
    }

    organizePostRows = (list) => {
      var content = []

      for(let i = 0; i < list.length ; i+=2){

        let row = {leftItem: list[i]};
        if(list[i+1]) row.rightItem = list[i+1];
        content.push(row);

      }
      return content;
    }

    render(){
      var { firstItem, list, openPostPage, loadingMore } = this.state;

      console.log(openPostPage)

      if(list)
        var postList = this.organizePostRows(list);
        

      return(
        <div id = 'wrapper'>

          <div id = 'top-bar'> 
            <h1 onClick = {this.handleNavClick}>RADIOHIPERATIVO</h1>
          </div>

          
          {list && !openPostPage &&
            <div id = 'main'> 
              <div 
                id = 'head-image-container'
                onClick = {() => this.handlePostClick(firstItem.id)}
              >
                <img 
                  src = {`http://localhost:8000${firstItem.post_image.url}`}
                  width = '100%'
                  height =  '550px'
                  className = 'image'
                />

                <div id = 'head-image-mask'/>

                <p>
                  {firstItem.title}
                </p>

              </div>

              <div id='post-list'> 
                {postList.map((item, index) => (
                  <div 
                    className = 'post-row'
                    key = {index}
                  >
                    <div 
                      className = 'image-container-left'
                      onClick = {() => this.handlePostClick(item.leftItem.id)}
                    >
                      <img
                        src = {`http://localhost:8000${item.leftItem.post_image.url}`}
                        width = '100%'
                        height = '275px' 
                        className = 'image'
                      />
                      <p>{item.leftItem.title}</p>
                    </div>
                    {item.rightItem &&
                      <div 
                        className = 'image-container-right'
                        onClick = {() => this.handlePostClick(item.rightItem.id)}
                      >
                        <img
                          src = {`http://localhost:8000${item.rightItem.post_image.url}`} 
                          width = '100%'
                          height = '275px'
                          className = 'image'
                        />
                        <p>{item.rightItem.title}</p>
                      </div>
                    }
                  </div>
                ))}
              </div>

              <div 
                id = 'load-more-button'
                onClick = {this.loadMore}
              > 

                {(!loadingMore && 'Carregar Mais') ||
                  <div id = 'loading-more-container'>
                    <ReactLoading 
                      type = {'bubbles'} 
                      color = {'#000'} 
                      height={10} 
                      width={30}
                    />
                  </div>
                }
                
              </div>

            </div>   
           }

           {!list && !openPostPage &&
            <div id = 'main'>
              <div 
                id = 'loading-container'
              >
                <ReactLoading 
                  type = {'spokes'} 
                  color = {'#000'} 
                  height={200} 
                  width={100}
                />
              </div>
            </div>
            }

           {openPostPage && <PostPage id={openPostPage}/>}
        </div>
      )
    }
}

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);


