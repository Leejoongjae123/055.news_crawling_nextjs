import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import {addDoc,getDoc,collection, doc, getDocs,query,onSnapshot,orderBy,setDoc} from 'firebase/firestore';
import {ref,set,child,get} from 'firebase/database'
import {dbService, database} from './firebase';
import { getDatabase } from 'firebase/database';
import { useState,useEffect } from 'react';

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
          // setProducts(newOne)
          // setSubjectA((prev)=>[...prev].concat(newOne[0]))
          setSubjectA(newOne[0]['name'])
          setSubjectB(newOne[1]['name'])
          setSubjectC(newOne[2]['name'])
          setSubjectD(newOne[3]['name'])
          setSubjectE(newOne[4]['name'])
        }
        // if (isComplete===false){
        //   setProducts((prev)=>[...prev].concat(newOne))
        // }
      })
    setIsComplete(true)
  }

  const getNews=async ()=>{  
    const dbRef = ref(database)
    get(child(dbRef,'/')).then(snapshot=>{
      if (snapshot.exists()&&isLoading==false){
        // console.log(snapshot.val())
        setNews(snapshot.val())
        setIsLoading(true)
      }else{
        console.log("No data Available")
      }
    }).catch(error=>{
      console.log(error)
    }

    )

    
  }

  useEffect(()=>{
    getProducts();
    getNews();
    console.log('news:',news)
  })





  
  var datetime="2023-04-14 21:00"

  return (
    <>
    <h1 className='header'>실시간 네이버 뉴스</h1>
    <h3 className='datetime'>크롤링시간 : {datetime}</h3>
    <div className='container'> 
      <div className="ui cards">
        <div className="card">
          <div className="content">
            <div className="header">그룹A</div>
            <div className="meta">종목</div>
            {subjectA.map((elem)=>{
              return(
                <div className="description">{elem}</div>
              )
            })}
          </div>
        </div>
        
        <div className="card">
          <div className="content">
            <div className="header">그룹B</div>
            <div className="meta">종목</div>
            {subjectB.map((elem)=>{
              return(
                <div className="description">{elem}</div>
              )
            })}
          </div>
        </div>
        <div className="card">
          <div className="content">
            <div className="header">그룹C</div>
            <div className="meta">종목</div>
            {subjectC.map((elem)=>{
              return(
                <div className="description">{elem}</div>
              )
            })}

          </div>
        </div>
        <div className="card">
          <div className="content">
            <div className="header">그룹D</div>
            <div className="meta">종목</div>
            {subjectD.map((elem)=>{
              return(
                <div className="description">{elem}</div>
              )
            })}
          </div>
        </div>
        <div className="card">
          <div className="content">
            <div className="header">그룹E</div>
            <div className="meta">종목</div>
            {subjectE.map((elem)=>{
              return(
                <div className="description">{elem}</div>
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
                
                
                  <li>
                    
                  </li>
                  <li>
                    Hello
                  </li>
                  <li>
                    Hello
                  </li>
                  <li>
                    Hello
                  </li>
                  <li>
                    Hello
                  </li>
                </ul>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="content">
            <div className="description">
              <ul>
                  <li>
                    Hello
                  </li>
                  <li>
                    Hello
                  </li>
                  <li>
                    Hello
                  </li>
                  <li>
                    Hello
                  </li>
                  <li>
                    Hello
                  </li>
                </ul>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="content">
            <div className="description">
              <ul>
                  <li>
                    Hello
                  </li>
                  <li>
                    Hello
                  </li>
                  <li>
                    Hello
                  </li>
                  <li>
                    Hello
                  </li>
                  <li>
                    Hello
                  </li>
                </ul>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="content">
            <div className="description">
              <ul>
                  <li>
                    Hello
                  </li>
                  <li>
                    Hello
                  </li>
                  <li>
                    Hello
                  </li>
                  <li>
                    Hello
                  </li>
                  <li>
                    Hello
                  </li>
                </ul>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="content">
            <div className="description">
              <ul>
                <li>
                  Hello
                </li>
                <li>
                  Hello
                </li>
                <li>
                  Hello
                </li>
                <li>
                  Hello
                </li>
                <li>
                  Hello
                </li>
              </ul>
            </div>
          </div>
        </div>
        
      </div>            
    </div>
    </>
  )
}



