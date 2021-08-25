import useractions from "../store/user/useractions";
import { useSelector, useDispatch } from "react-redux";
import { Fragment, useCallback, useEffect, useState } from "react";
import { RootState } from "../store/types";
import React from "react";


const userSelector = ({user:{users}} : RootState) => users;
const resultSelector = ({user:{result}} : RootState) => result;


const User = ()=>{
 
  const dispatch = useDispatch();
  const users = useSelector(userSelector)
  const result = useSelector(resultSelector)
  const [query, setQuery] = useState("");

  useEffect(() => {  
    if(users.length === 0 ){
            dispatch(useractions.getAllUser.request(new Date().toISOString()));
        } 
}, [dispatch, users])

const handlequery = (e:any)=>{
  setQuery(e.target.value)
}

const sendquery = ()=>{
  if(query.length > 1){
    dispatch(useractions.searchUser.request(query));  
    setQuery("")
    
  }
}

const resetquery = ()=>{
  dispatch(useractions.deleteResult.request());  
  setQuery("")
}

const refresh = useCallback(()=>{

  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    if(users.length === 0 ){
      dispatch(useractions.getAllUser.request(new Date().toISOString()));
  } else{
    dispatch(useractions.getAllUser.request(users[users.length-1].createdAt));
  }
  }
}, [users, dispatch]);

useEffect(() => {
  window.addEventListener('scroll', refresh);
  return () => {
    window.removeEventListener('scroll', refresh);
  }
}, [refresh]);

  return(
<div>
  <div className="justify-center">
   <h2 className="mg-300">전체유저수:{users.length} </h2>
   <h2 className="mg-300">검색결과:{result.length} </h2>
  </div>
  <div className="bg-gray-400">
  <input onChange={handlequery}  id="query" name="query" type="text" value={query}
 className="w-30 h-10 m-5 ml-2/5 rounded-md border-black" placeholder="유저검색" />
 
   <button onClick={()=>sendquery()} 
   className="w-24 h-10 mb-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 ">
              검색
   </button>
   <button onClick={()=>resetquery()} 
   className="w-24 h-10 mb-5 ml-2 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 ">
              리셋
   </button>
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
                      경험치
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      가입날짜
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      유저레벨
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                {result.map((item, i) => {
      if (!item) return null
      return (<Fragment key={`${item._id}`}>     

                <tbody className="bg-red-300 divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                        
                          <img className = "h-10 w-10 rounded-full" alt="" src={item.profilepic}/>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                           {item.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {item.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">핸드폰:{item.cell}</div>
                      <div className="text-sm text-gray-500">경험치:{item.exp}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {item.createdAt}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.level}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      
                      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        유저삭제
                      </button>
                    </td>
                  </tr>
      
                  
                </tbody>
                </Fragment>)})
      }
                {result.length > 0 ? null :users.map((item, i) => {
      if (!item) return null
      return (<Fragment key={`${item._id}`}>     

                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                        
                          <img className = "h-10 w-10 rounded-full" alt="" src={item.profilepic}/>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                           {item.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {item.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">핸드폰:{item.cell}</div>
                      <div className="text-sm text-gray-500">경험치:{item.exp}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {item.createdAt}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.level}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      
                      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        유저삭제
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


export default User;
