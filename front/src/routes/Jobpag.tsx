
import { useSelector, useDispatch } from "react-redux";
import {Fragment, useEffect } from "react";
import { RootState } from "../store/types";
import React from "react";
import jobsactions from "../store/jobs/jobsactions";

const postselector = ({jobs:{page}} : RootState) => page;
const allselector = ({jobs:{allposts}} : RootState) => allposts;


const JobPage = ()=>{
  const dispatch = useDispatch();
  const posts = useSelector(postselector)
  const all = useSelector(allselector)

  useEffect(() => {
    if (!posts.length) {
        dispatch(jobsactions.getJobPage.request(1))
    }         
}, [dispatch, posts])

const delpost = (id:string)=>{
  dispatch(jobsactions.deleteJob.request({_id:id}));
}
const move = (n:number)=>{
  dispatch(jobsactions.getJobPage.request(n))
}

const pa = Math.ceil(all/15);
const num = new Array(pa).fill(0)


  return(
    <div>

  <div className="flex flex-row justify-center">
  {num.map((_, i) => (
  <div className="text-m text-green-600 mx-5 my-2" key={`jobPage-pagination-number-${i}`}>
    <button onClick={()=> move(i+1)} >{i+1}</button>
  </div>
))}
     </div>
       <div className="flex flex-col">
       <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
         <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
           <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
             <table className="min-w-full divide-y divide-gray-200">
               <thead className="bg-gray-50">
                 <tr>
                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                     제목
                   </th>
                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                     카테고리
                   </th>
                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                     조회수
                   </th>
                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                     작성날짜
                   </th>
                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                     위치
                   </th>
                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                     내용
                   </th>
                   <th scope="col" className="relative px-6 py-3">
                     <span className="sr-only">Edit</span>
                   </th>
                 </tr>
               </thead>
               {posts.map((item, i) => {
     if (!item) return null
     return (<Fragment key={`${item._id}`}>     

               <tbody className="bg-white divide-y divide-gray-200">
                 <tr>
                   <td className="px-6 py-4 whitespace-nowrap">
                     <div className="flex items-center">
                       <div className="flex-shrink-0 h-10 w-10">
                       
                         <img className = "h-10 w-10 rounded-full" alt="" src={item.author?.profilepic}/>
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
                     <div className="text-sm text-gray-900">{item.category}</div>                  
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap">
                     
                     <div className="text-sm text-gray-500">조회수:{item.views}</div>
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap">
                     <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                       {item.createdAt}
                       
                     </span>
                     <div className="text-sm text-gray-500">작성자:{item.author?.name}</div>
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap">
                     <div className="text-sm text-gray-500">위치:{item.location}</div>
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                     {item.context}
                     { item.pics?.map((uri, i) =>
                                              (   <img key={`${i}`} className = "h-100 w-100" alt="" src={uri}/> )                       
                                           )}   
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                     
                     <button onClick={()=>delpost(item._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                       글삭제
                     </button>
                   </td>
                 </tr>
     
                 
               </tbody>
               </Fragment>)})
     }
             </table>
           </div>
         </div>
       </div>
     </div>
    
   
     </div>

  
    )
  };


export default JobPage;