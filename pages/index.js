import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import {addDoc,getDoc,collection, doc, getDocs,query,onSnapshot,orderBy,setDoc} from 'firebase/firestore';
import { getDatabase, ref, onValue} from "firebase/database";
import {dbService, database} from './firebase';
import { useState,useEffect } from 'react';
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const database=getDatabase()
  const [products,setProducts]=useState([])
  const [isComplete,setIsComplete]=useState(false)
  const [news,setNews]=useState({})
  const [isLoading,setIsLoading]=useState(false)

  const [subjectA,setSubjectA]=useState([])
  const [subjectB,setSubjectB]=useState([])
  const [subjectC,setSubjectC]=useState([])
  const [subjectD,setSubjectD]=useState([])
  const [subjectE,setSubjectE]=useState([])

  const [newsA,setNewsA]=useState({})
  const [newsB,setNewsB]=useState({})
  const [newsC,setNewsC]=useState({})
  const [newsD,setNewsD]=useState({})
  const [newsE,setNewsE]=useState({})

  const getProducts=async ()=>{  
    const q=query(collection(dbService,"subjects"))
    const querySnapshot=await getDocs(q)
      querySnapshot.forEach((doc)=>{
        const newOne=doc.data()['data']
        if (isComplete===false){
          setSubjectA(newOne[0]['name'])
          setSubjectB(newOne[1]['name'])
          setSubjectC(newOne[2]['name'])
          setSubjectD(newOne[3]['name'])
          setSubjectE(newOne[4]['name'])
        }

      })
    setIsComplete(true)
  }

    const getNews=async ()=>{  
      const db = getDatabase();
      const starCountRef = await ref(database);
      if (isLoading==false){
        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
          setNews(data);
        });
        
      } else{
        console.log("이미 로딩 완료")
      }
      setIsLoading(true);
  }

  useEffect(()=>{
    getProducts();
    getNews();
    
  },[])

  console.log('news:',news['삼성전자'])




  
  var datetime="2023-04-14 21:00"

  return (
    <>
    <h1 className='header'>실시간 네이버 뉴스</h1>
    <h3 className='datetime'>크롤링시간 : {
      (news[subjectA[0]])?(news['timeNow']):("Loading...")
    }</h3>
    <div className='container'> 
      <div className="ui cards">
        <div className="card">
          <div className="content">
            <div className="header">그룹A</div>
            <div className="meta">종목</div>
            {subjectA.map((elem,index)=>{
              return(
                <div className="description" key={index}>{elem}</div>
              )
            })}
          </div>
        </div>
        
        <div className="card">
          <div className="content">
            <div className="header">그룹B</div>
            <div className="meta">종목</div>
            {subjectB.map((elem,index)=>{
              return(
                <div className="description" key={index}>{elem}</div>
              )
            })}
          </div>
        </div>
        <div className="card">
          <div className="content">
            <div className="header">그룹C</div>
            <div className="meta">종목</div>
            {subjectC.map((elem,index)=>{
              return(
                <div className="description" key={index}>{elem}</div>
              )
            })}

          </div>
        </div>
        <div className="card">
          <div className="content">
            <div className="header">그룹D</div>
            <div className="meta">종목</div>
            {subjectD.map((elem,index)=>{
              return(
                <div className="description"key={index}>{elem}</div>
              )
            })}
          </div>
        </div>
        <div className="card">
          <div className="content">
            <div className="header">그룹E</div>
            <div className="meta">종목</div>
            {subjectE.map((elem,index)=>{
              return(
                <div className="description" key={index}>{elem}</div>
              )
            })}
          </div>
        </div>
        
      </div>            
    </div>
    <div className='container'> 
      <div className="ui cards">
        <div className="card">
          <div className="content">
            <div className="description">
              <ul>              
                {
                  (news[subjectA[0]])?
                  (
                    subjectA.map((elem)=>
                      <>
                      {news[elem].map((ele,index)=>{
                      return(
                        <li key={index}>
                          <h6><a href={ele['url']} target="_blank">{ele['title']}</a></h6>
                          <span>{ele['date']}</span>
                        </li>
                      )}
                      )}
                      </>
                    )
                  ):(
                    <div class="ui segment">
                      <div class="ui active inverted dimmer">
                        <div class="ui text loader">Loading</div>
                      </div>
                      <p></p>
                    </div>
                  )
                }
              </ul>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="content">
            <div className="description">
              <ul>
              {
                  (news[subjectB[0]])?
                  (
                    subjectB.map((elem)=>
                      <>
                      {news[elem].map((ele,index)=>{
                      return(
                        <li key={index}>
                          <h6><a href={ele['url']} target="_blank">{ele['title']}</a></h6>
                          <span>{ele['date']}</span>
                        </li>
                      )}
                      )}
                      </>
                    )
                  ):(
                    <div class="ui segment">
                      <div class="ui active inverted dimmer">
                        <div class="ui text loader">Loading</div>
                      </div>
                      <p></p>
                    </div>
                  )
                }
              </ul>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="content">
            <div className="description">
              <ul>
              {
                  (news[subjectC[0]])?
                  (
                    subjectC.map((elem)=>
                      <>
                      {news[elem].map((ele,index)=>{
                      return(
                        <li key={index}>
                          <h6><a href={ele['url']} target="_blank">{ele['title']}</a></h6>
                          <span>{ele['date']}</span>
                        </li>
                      )}
                      )}
                      </>
                    )
                  ):(
                    <div class="ui segment">
                      <div class="ui active inverted dimmer">
                        <div class="ui text loader">Loading</div>
                      </div>
                      <p></p>
                    </div>
                  )
                }
              </ul>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="content">
            <div className="description">
              <ul>
              {
                  (news[subjectD[0]])?
                  (
                    subjectD.map((elem)=>
                      <>
                      {news[elem].map((ele,index)=>{
                      return(
                        <li key={index}>
                          <h6><a href={ele['url']} target="_blank">{ele['title']}</a></h6>
                          <span>{ele['date']}</span>
                        </li>
                      )}
                      )}
                      </>
                    )
                  ):(
                    <div class="ui segment">
                      <div class="ui active inverted dimmer">
                        <div class="ui text loader">Loading</div>
                      </div>
                      <p></p>
                    </div>
                  )
                }
              </ul>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="content">
            <div className="description">
              <ul>
              {
                  (news[subjectE[0]])?
                  (
                    subjectE.map((elem)=>
                      <>
                      {news[elem].map((ele,index)=>{
                      return(
                        <li key={index}>
                          <h6><a href={ele['url']} target="_blank">{ele['title']}</a></h6>
                          <span>{ele['date']}</span>
                        </li>
                      )}
                      )}
                      </>
                    )
                  ):(
                    <div class="ui segment">
                      <div class="ui active inverted dimmer">
                        <div class="ui text loader">Loading</div>
                      </div>
                      <p></p>
                    </div>
                  )
                }
              </ul>
            </div>
          </div>
        </div>
        
      </div>            
    </div>
    </>
  )
}



