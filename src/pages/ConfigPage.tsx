import React from "react";
export default function ConfigPage(){
  const [base,setBase]=React.useState(""),[token,setToken]=React.useState(""),[ws,setWs]=React.useState("");
  React.useEffect(()=>{try{const c=JSON.parse(localStorage.getItem("negastore_cfg")||"{}");setBase(c.base||"");setToken(c.token||"");setWs(c.ws||"")}catch{}},[]);
  const save=()=>{localStorage.setItem("negastore_cfg",JSON.stringify({base:base.trim(),token:token.trim(),ws:ws.trim()}));alert("저장 완료! 새로고침하면 적용됩니다.")};
  const clear=()=>{localStorage.removeItem("negastore_cfg");setBase("");setToken("");setWs("");alert("초기화 완료!")};
  return (<div style={{maxWidth:720,margin:"48px auto",padding:20}}>
    <h1 style={{fontSize:28,fontWeight:800}}>Negastore 설정</h1>
    <p style={{opacity:.75}}>저장하면 런타임에 자동 주입됩니다.</p>
    <label>API Base</label><input value={base} onChange={e=>setBase(e.target.value)} style={{width:"100%",padding:12,margin:"8px 0 16px",border:"1px solid #ddd",borderRadius:12}}/>
    <label>Token(선택)</label><input value={token} onChange={e=>setToken(e.target.value)} style={{width:"100%",padding:12,margin:"8px 0 16px",border:"1px solid #ddd",borderRadius:12}}/>
    <label>WebSocket(선택)</label><input value={ws} onChange={e=>setWs(e.target.value)} style={{width:"100%",padding:12,margin:"8px 0 16px",border:"1px solid #ddd",borderRadius:12}}/>
    <div style={{display:"flex",gap:12}}><button onClick={save} style={{padding:"12px 16px",borderRadius:12,border:0,background:"black",color:"#fff"}}>저장</button>
    <button onClick={clear} style={{padding:"12px 16px",borderRadius:12,border:"1px solid #ddd",background:"#fff"}}>초기화</button></div>
  </div>);
}
