import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import {addDoc,getDoc,collection, doc, getDocs,query,onSnapshot,orderBy,setDoc} from 'firebase/firestore';
import { getDatabase, ref, onValue} from "firebase/database";
import {dbService, database} from '../src/firebase';
import { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
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


  return (
    <>
    <div className="container-fluid my-3">
      <h1>실시간 네이버 뉴스</h1>
      <h2>크롤링시간 : {(news[subjectA[0]])?(news['timeNow']):("Loading...")}</h2>
    </div>

    <div className="row row-cols-1 row-cols-md-5 g-4 mx-2 mt-2">
      <div className="col">
        <div className="card">
          <div className="card-body d-block">
            <h5 className="card-title py-1">Section A</h5>
              {subjectA.map((elem,index)=>{
                return(
                  <p className="card-text" key={index}>{elem}</p>
                )
              })}
          </div>
          <div className="card-footer">       
          {
            (news[subjectA[0]])?
            (
              subjectA.map((elem)=>
                <>
                {news[elem].map((ele,index)=>{
                return(
                  <>
                  <li key={index}>
                    <h5>{elem}</h5>
                    <h6><a href={ele['url']} target="_blank" className='title'>{ele['title']}</a></h6>
                    <span>{ele['date']}</span>
                  </li>
                  <hr></hr>
                  </>
                )
                }
                )}
                                  
                </>
              )
            ):(
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            )
          }
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title py-1">Section B</h5>
            {subjectB.map((elem,index)=>{
                return(
                  <p className="card-text" key={index}>{elem}</p>
                )
              })}         
          </div>
          <div className="card-footer d-block">
          {
                  (news[subjectB[0]])?
                  (
                    subjectB.map((elem)=>
                      <>
                      {news[elem].map((ele,index)=>{
                      return(
                        <>
                        <li key={index}>
                          <h5>{elem}</h5>
                          <h6><a className='title' href={ele['url']} target="_blank">{ele['title']}</a></h6>
                          <span>{ele['date']}</span>
                        </li>
                        <hr></hr>
                        </>
                      )}
                      )}
                      </>
                    )
                  ):(
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  )
                }
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title py-1">Section C</h5>
            {subjectC.map((elem,index)=>{
                return(
                  <p className="card-text" key={index}>{elem}</p>
                )
              })}  
          </div>
          <div className="card-footer">
                      {
            (news[subjectC[0]])?
            (
              subjectC.map((elem)=>
                <>
                {news[elem].map((ele,index)=>{
                return(
                  <>
                  <li key={index}>
                    <h5>{elem}</h5>
                    <h6><a className='title' href={ele['url']} target="_blank">{ele['title']}</a></h6>
                    <span>{ele['date']}</span>
                  </li>
                  <hr></hr>
                  </>
                )}
                )}
                </>
              )
            ):(
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            )
          }
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title py-1">Section D</h5>
            {subjectD.map((elem,index)=>{
                return(
                  <p className="card-text" key={index}>{elem}</p>
                )
              })}  
          </div>
          <div className="card-footer">
          {
            (news[subjectD[0]])?
            (
              subjectD.map((elem)=>
                <>
                {news[elem].map((ele,index)=>{
                return(
                  <>
                  <li key={index}>
                    <h5>{elem}</h5>
                    <h6><a className='title' href={ele['url']} target="_blank">{ele['title']}</a></h6>
                    <span>{ele['date']}</span>
                  </li>
                  <hr></hr>
                  </>
                )}
                )}
                </>
              )
            ):(
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            )
          }
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title py-1">Section E</h5>
            {subjectE.map((elem,index)=>{
                return(
                  <p className="card-text" key={index}>{elem}</p>
                )
              })}  
          </div>
          <div className="card-footer">
          {
            (news[subjectE[0]])?
            (
              subjectE.map((elem)=>
                <>
                {news[elem].map((ele,index)=>{
                return(
                  <>
                  <li key={index}>
                    <h5>{elem}</h5>
                    <h6><a className='title' href={ele['url']} target="_blank">{ele['title']}</a></h6>
                    <span>{ele['date']}</span>
                  </li>
                  <hr></hr>
                  </>
                )}
                )}
                </>
              )
            ):(
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            )
          }
          </div>
        </div>
      </div>
      
                
    </div>    
    </>
    // <>
    // <h1 className='header'>실시간 네이버 뉴스</h1>
    // <h3 className='datetime'>크롤링시간 : {
    //   (news[subjectA[0]])?(news['timeNow']):("Loading...")
    // }</h3>
    // <div className='container'> 
    //   <div className="ui cards">
    //     <div className="card">
    //       <div className="content">
    //         <div className="header">그룹A</div>
    //         <div className="meta">종목</div>
    //         {subjectA.map((elem,index)=>{
    //           return(
    //             <div className="description" key={index}>{elem}</div>
    //           )
    //         })}
    //       </div>
    //     </div>
        
    //     <div className="card">
    //       <div className="content">
    //         <div className="header">그룹B</div>
    //         <div className="meta">종목</div>
    //         {subjectB.map((elem,index)=>{
    //           return(
    //             <div className="description" key={index}>{elem}</div>
    //           )
    //         })}
    //       </div>
    //     </div>
    //     <div className="card">
    //       <div className="content">
    //         <div className="header">그룹C</div>
    //         <div className="meta">종목</div>
    //         {subjectC.map((elem,index)=>{
    //           return(
    //             <div className="description" key={index}>{elem}</div>
    //           )
    //         })}

    //       </div>
    //     </div>
    //     <div className="card">
    //       <div className="content">
    //         <div className="header">그룹D</div>
    //         <div className="meta">종목</div>
    //         {subjectD.map((elem,index)=>{
    //           return(
    //             <div className="description"key={index}>{elem}</div>
    //           )
    //         })}
    //       </div>
    //     </div>
    //     <div className="card">
    //       <div className="content">
    //         <div className="header">그룹E</div>
    //         <div className="meta">종목</div>
    //         {subjectE.map((elem,index)=>{
    //           return(
    //             <div className="description" key={index}>{elem}</div>
    //           )
    //         })}
    //       </div>
    //     </div>
        
    //   </div>            
    // </div>
    // <div className='container'> 
    //   <div className="ui cards">
    //     <div className="card">
    //       <div className="content">
    //         <div className="description">
    //           <ul>              
    //             {
    //               (news[subjectA[0]])?
    //               (
    //                 subjectA.map((elem)=>
    //                   <>
    //                   {news[elem].map((ele,index)=>{
    //                   return(
    //                     <li key={index}>
    //                       <h5><a href={ele['url']} target="_blank">{ele['title']}</a></h5>
    //                       <span>{ele['date']}</span>
    //                     </li>
    //                   )}
    //                   )}
    //                   </>
    //                 )
    //               ):(
    //                 <div className="ui segment">
    //                   <div className="ui active inverted dimmer">
    //                     <div className="ui text loader">Loading</div>
    //                   </div>
    //                   <p></p>
    //                 </div>
    //               )
    //             }
    //           </ul>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="card">
    //       <div className="content">
    //         <div className="description">
    //           <ul>
    //           {
    //               (news[subjectB[0]])?
    //               (
    //                 subjectB.map((elem)=>
    //                   <>
    //                   {news[elem].map((ele,index)=>{
    //                   return(
    //                     <li key={index}>
    //                       <h5><a href={ele['url']} target="_blank">{ele['title']}</a></h5>
    //                       <span>{ele['date']}</span>
    //                     </li>
    //                   )}
    //                   )}
    //                   </>
    //                 )
    //               ):(
    //                 <div className="ui segment">
    //                   <div className="ui active inverted dimmer">
    //                     <div className="ui text loader">Loading</div>
    //                   </div>
    //                   <p></p>
    //                 </div>
    //               )
    //             }
    //           </ul>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="card">
    //       <div className="content">
    //         <div className="description">
    //           <ul>
    //           {
    //               (news[subjectC[0]])?
    //               (
    //                 subjectC.map((elem)=>
    //                   <>
    //                   {news[elem].map((ele,index)=>{
    //                   return(
    //                     <li key={index}>
    //                       <h5><a href={ele['url']} target="_blank">{ele['title']}</a></h5>
    //                       <span>{ele['date']}</span>
    //                     </li>
    //                   )}
    //                   )}
    //                   </>
    //                 )
    //               ):(
    //                 <div className="ui segment">
    //                   <div className="ui active inverted dimmer">
    //                     <div className="ui text loader">Loading</div>
    //                   </div>
    //                   <p></p>
    //                 </div>
    //               )
    //             }
    //           </ul>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="card">
    //       <div className="content">
    //         <div className="description">
    //           <ul>
    //           {
    //               (news[subjectD[0]])?
    //               (
    //                 subjectD.map((elem)=>
    //                   <>
    //                   {news[elem].map((ele,index)=>{
    //                   return(
    //                     <li key={index}>
    //                       <h5><a href={ele['url']} target="_blank">{ele['title']}</a></h5>
    //                       <span>{ele['date']}</span>
    //                     </li>
    //                   )}
    //                   )}
    //                   </>
    //                 )
    //               ):(
    //                 <div className="ui segment">
    //                   <div className="ui active inverted dimmer">
    //                     <div className="ui text loader">Loading</div>
    //                   </div>
    //                   <p></p>
    //                 </div>
    //               )
    //             }
    //           </ul>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="card">
    //       <div className="content">
    //         <div className="description">
    //           <ul>
    //           {
    //               (news[subjectE[0]])?
    //               (
    //                 subjectE.map((elem)=>
    //                   <>
    //                   {news[elem].map((ele,index)=>{
    //                   return(
    //                     <li key={index}>
    //                       <h5><a href={ele['url']} target="_blank">{ele['title']}</a></h5>
    //                       <span>{ele['date']}</span>
    //                     </li>
    //                   )}
    //                   )}
    //                   </>
    //                 )
    //               ):(
    //                 <div className="ui segment">
    //                   <div className="ui active inverted dimmer">
    //                     <div className="ui text loader">Loading</div>
    //                   </div>
    //                   <p></p>
    //                 </div>
    //               )
    //             }
    //           </ul>
    //         </div>
    //       </div>
    //     </div>
    //   </div>            
    // </div>
    // </>
  )
}



