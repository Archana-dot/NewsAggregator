import React, { useEffect, useState } from 'react'

function NewsfeedComponent(props) {

    const [article, setArticle] = useState([])
    const [sportsData, setSportsData] = useState([])
    const [initialList, setInitialList] = useState([])
    const [initialSportsList, setInitialSportsList] = useState([])
    const [ errorMsg , setErrorMsg] = useState('')
   
    useEffect(() => {
        if(props.lang) {
        getNewsfeed()
        getSportsfeed()
        }
    }, [props.lang])

    useEffect(() => {
        fliterNewsfeed()
    }, [props.input])


    function getNewsfeed() {

        const apiKey = '0ac42dab43944e5a86efbcba3bcc75f8';

        fetch(`https://gnews.io/api/v4/top-headlines?&lang=${props.lang}&country=in&max=10&apikey=${apiKey}&in="content"&sortby=publishedAt`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(json => {
                setArticle(json.articles);
                setInitialList(json.articles)

            })
            .catch(error => console.error('There was a problem with the fetch operation:', error));

    }

    function getSportsfeed() {
        const apiKey = '0ac42dab43944e5a86efbcba3bcc75f8';
        fetch(`https://gnews.io/api/v4/top-headlines?category=sports&apikey=${apiKey}&lang=${props.lang}&country=in`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(json => {
                setSportsData(json.articles);
                setInitialSportsList(json.articles)


            })
            .catch(error => console.error('There was a problem with the fetch operation:', error));

    }

    function fliterNewsfeed() {
        let searchedList = article
        let searchedSportsList = sportsData
        if (article && article.length && props.input) {
            searchedList = article.filter(article => {
                const regex = new RegExp(`^${props.input}`, 'i');
                return (
                    (article.content && article.content.match(regex)) ||
                    (article.title && article.title.match(regex))
                );
            });
            
            setArticle(searchedList)
            if(searchedList&& searchedList.length == 0) {
                setErrorMsg("No results in Top News")
            }
            else {
                setErrorMsg("")
            }
        }
        else {
            setArticle(initialList)
        }
        if(sportsData && sportsData.length && props.input) {
            searchedSportsList = sportsData.filter(article => {
                const regex = new RegExp(`^${props.input}`, 'i');
                return (
                    (article.content && article.content.match(regex)) ||
                    (article.title && article.title.match(regex))
                );
            });
            setSportsData(searchedSportsList)

        }
        else {
            setSportsData(initialSportsList)
        }
        
        
    }

    function onclickNewsfeed(url){
        window.open(url,'_blank')
    }

    return (
        <div className='newsfeed-container'>
            <div className="article-block first">
                {
                article && article.length ?
                
                article.map((item, index) => {
                    return (
                        <div className='news-feed' onClick={()=>onclickNewsfeed(item.url)}>
                            <h1 className='title'>{item.title}</h1>
                            <div className='content'>{item.content}</div>
                            <div className='img-section'>
                                <img src={item.image} />
                            </div>
                            <div className='separator-line'></div>
                        </div>
                    )
                })
                
                :
                <div className={`error-row ${(article.length ===0  && sportsData.length === 0) ? "screen-center":""}`}>
                    {errorMsg?errorMsg:""}
                    </div>
                
                }
            </div>
            <div className="article-block second">

                {
                    sportsData.map((item, index) => {
                        return (
                            <div className='news-feed' onClick={()=>onclickNewsfeed(item.url)}>
                                <h1 className='title'>{item.title}</h1>
                                <div className="img-content-div">
                                    <div className='img-section'>
                                        <img src={item.image} />
                                    </div>
                                    <div className='content'>{item.content}</div>
                                </div>

                                <div className='separator-line'></div>
                            </div>
                        )
                    })
                }
            </div>




        </div>
    )
}

export default NewsfeedComponent
