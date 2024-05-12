import React from 'react';

function Loading({loading}) {
  if(loading != true){
    return <></>
  }
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div 
        className="animate-spin-slow rounded-full h-12 w-12 border-t-4 border-b-4 border-transparent" 
        style={{
          borderTopColor: 'rgba(59,130,246,1)', // blue
          borderBottomColor: 'rgba(234,88,12,1)' // orange
        }}
      >..</div>

        Loading
    </div>
  );
}

export default Loading;
