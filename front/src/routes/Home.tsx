
import React, { Fragment, useEffect, useState } from "react";
import {  useDispatch, useSelector } from "react-redux";
import banneractions from "../store/banner/banneractions";
import { RootState } from "../store/types";
import "./Home.css";
import { trimText } from '../utils/util';
import configactions from "../store/config/configactions";
import { useHistory } from "react-router-dom";

const bannerSelector = ({banner} : RootState) => banner;
const Home = ()=>{

  const [title, setTitle] = useState("");
  const [msg, setMsg] = useState("");
  const [category, setCategory] = useState("");
  const [link, setLink] = useState("");
  const [pic, setPic] = useState<any>();
  const dispatch = useDispatch()
  
  const banner = useSelector(bannerSelector);
const history = useHistory();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const newBanner = {
    link:link,
    title:title,
    category:category,
    pic,
  };  


  useEffect(() => {
    dispatch(banneractions.getBanner.request()); 
}, [dispatch])

useEffect(() => {
  history.push(history.location.pathname)
}, [history])

const delbanner = (id:string)=>{
  dispatch(banneractions.deleteBanner.request(id));
}

  const handlelink = (e:any)=>{
    setLink(e.target.value)
  }

  const handletitle = (e:any)=>{
    setTitle(e.target.value)
  }

  const handlemsg = (e:any)=>{
    setMsg(e.target.value)
  }

  const handlecategory = (e:any)=>{
    setCategory(e.target.value)
  }
  const handlepic = (e:any)=>{
    setPic(e.target.files[0])
  }
  const handlecreate = ()=>{
    dispatch(banneractions.makeBanner.request(newBanner));   
  }
  const handlepush = ()=>{
    dispatch(configactions.sendPush.request({msg}));   
    
    setMsg("")
  }
  
    
    return (
      <div className="grid grid-cols-2 flex-row">
<div className="bg-gray-700  flex-column">
  <div className="w-1/2 ml-72 rounded-md mt-10 my-2"><h2 className="text-white align-middle">전체 푸쉬 보내기</h2></div>

<textarea  onChange={handlemsg} value={msg} id="msg" name="msg" 
 className="w-1/2 ml-72 h-32 rounded-md" placeholder="푸쉬내용 160글자제한"></textarea>
   <button onClick={()=>handlepush()} className="w-1/2 ml-72 h-20 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2">
              보내기
   </button>

   <div className="py-24"></div>
      


</div>
      
     <div className="bg-gray-500 flex-column" >
       <div className="grid grid-cols-2 gap-4 ml-72">

  <div className="gap-4 my-10">

    <div className=" gap-4">
      
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
            <div className="grid grid-cols-3 gap-6 ">
              <div className="col-span-3 sm:col-span-2">
                <label htmlFor="company_website" className="block text-sm font-medium text-gray-700">
                  링크
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    전체링크
                  </span>
                  <input onChange={handlelink} value={link} type="text" name="link" id="link" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="www.example.com" />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                제목
              </label>
              <div className="mt-1">
                <textarea  onChange={handletitle} value={title} id="title" name="title"  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="이벤트기록용"></textarea>
              </div>
            </div>
            <div>
              <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                카테고리
              </label>
              <div className="mt-1">
                <textarea onChange={handlecategory} value={category} id="about" name="about"  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="post, job, market"></textarea>
              </div>
            </div>




            <div>
              <label className="block text-sm font-medium text-gray-700">
                배너
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      <span>파일 업로드</span>
                      <input onChange={handlepic} id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">드래그 앤 드롭</p>
                  </div>
                  <p className="text-xs text-gray-500">
                   배너 288 *144 **엄수**
                   
                  </p>
                  <p className="text-m text-blue-700">                 
                   {pic ? pic.name : null}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button onClick={()=>handlecreate()} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2">
              배너생성
            </button>
          </div>
        </div>
      
    </div>
  </div>
  </div>
  <table>
  {banner.data.map((item, i) => {
      if (!item) return null
      return (<Fragment key={`${item._id}`}> 
          
          
<tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center ">
                        <div className="flex-shrink-0 h-10 w-10 ">
                        
                          <img className = "h-10 w-10 rounded-full" alt="" src={item.pic}/>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                           {item.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {item.category}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{trimText(item.link, 30)}</div>
                      
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {item.created_At}
                        
                      </span>
                      
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      
                      { item.pic ?   <img className = "h-40 w-80" alt="" src={item.pic}/> :null }   
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      
                      <button onClick={()=>delbanner(item._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        배너삭제
                      </button>
                    </td>
                  </tr>
      
                  
                </tbody>
                
                </Fragment>)})
      }

</table>
     </div>
     </div>
    );
  }


export default Home;
