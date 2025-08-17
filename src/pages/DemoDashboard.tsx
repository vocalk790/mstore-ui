import React from "react";
function useKST(){const[s,setS]=React.useState(new Date());React.useEffect(()=>{const id=setInterval(()=>setS(new Date()),1000);return()=>clearInterval(id)},[]);return s.toLocaleString("ko-KR",{timeZone:"Asia/Seoul"})}
export default function DemoDashboard(){
  const kst=useKST(); const base=(window as any).VITE_API_BASE; const token=(window as any).VITE_API_TOKEN;
  const [series,setSeries]=React.useState<any[]>([]),[trades,setTrades]=React.useState<any[]>([]),[wallet,setWallet]=React.useState<any>({balance:0,available:0,pending:0}),[err,setErr]=React.useState<string|null>(null);
  React.useEffect(()=>{const has=!!base;async function run(){try{
    if(has){const h:any=token?{Authorization:`Bearer ${token}`}:{};
      const [s,t,w]=await Promise.all([
        fetch(base+"/api/metrics/series",{headers:h}).then(r=>r.json()),
        fetch(base+"/api/trades",{headers:h}).then(r=>r.json()),
        fetch(base+"/api/wallets/summary",{headers:h}).then(r=>r.json()),
      ]);setSeries(s||[]);setTrades(t||[]);setWallet(w||{})}
    else{const now=Date.now();setSeries(Array.from({length:30},(_,i)=>({t:new Date(now-(29-i)*3600e3).toLocaleTimeString("ko-KR"),sales:Math.round(100+Math.sin(i/4)*40+i*3),roi:Math.round(10+Math.cos(i/5)*5+i*.2)})));
      setTrades([{id:1,sku:"A-1001",buy:10000,sell:12500,roi:"+25%"},{id:2,sku:"B-2203",buy:18000,sell:20000,roi:"+11.1%"},{id:3,sku:"C-9910",buy:9000,sell:8200,roi:"-8.9%"}]);
      setWallet({balance:12345678,available:9876543,pending:456789});}
  }catch(e:any){setErr(e?.message||"로딩 실패")}} run(); const id=setInterval(run,60000); return()=>clearInterval(id)},[base,token]);
  return (<div style={{padding:24,maxWidth:1200,margin:"0 auto"}}>
    <h1 style={{fontSize:28,fontWeight:800}}>Negastore 시연용 대시보드</h1>
    <p style={{opacity:.7}}>KST: {kst} {base?"— 실데이터":"— 더미데이터"}</p>
    {err && <div style={{color:"crimson"}}>⚠ {err}</div>}
    <section style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginTop:12}}>
      <div style={{padding:16,border:"1px solid #eee",borderRadius:16}}><div style={{opacity:.7,fontSize:12}}>잔액</div><div style={{fontSize:24,fontWeight:700}}>{wallet.balance?.toLocaleString()} 원</div></div>
      <div style={{padding:16,border:"1px solid #eee",borderRadius:16}}><div style={{opacity:.7,fontSize:12}}>출금 가능</div><div style={{fontSize:24,fontWeight:700}}>{wallet.available?.toLocaleString()} 원</div></div>
      <div style={{padding:16,border:"1px solid #eee",borderRadius:16}}><div style={{opacity:.7,fontSize:12}}>정산 대기</div><div style={{fontSize:24,fontWeight:700}}>{wallet.pending?.toLocaleString()} 원</div></div>
    </section>
    <section style={{marginTop:24}}>
      <h2 style={{fontSize:18,fontWeight:700,marginBottom:8}}>매출/ROI 추이</h2>
      <div style={{height:140,border:"1px solid #eee",borderRadius:16,padding:12,overflow:"hidden"}}>
        <svg width="100%" height="100%" viewBox="0 0 600 120" preserveAspectRatio="none">
          {(()=>{const xs=series.map((_:any,i:number)=>(i/(Math.max(1,series.length-1)))*600);
            const s=series.map((v:any)=>v.sales), r=series.map((v:any)=>v.roi);
            const sMin=Math.min(...s,0), sMax=Math.max(...s,1), rMin=Math.min(...r,0), rMax=Math.max(...r,1);
            const yS=(v:number)=>110-(v-sMin)/(sMax-sMin+1e-4)*100, yR=(v:number)=>110-(v-rMin)/(rMax-rMin+1e-4)*100;
            const path=(vals:number[],y:(n:number)=>number)=>vals.map((v,i)=>`${i?'L':'M'} ${xs[i].toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
            return(<><path d={path(s,yS)} fill="none" stroke="black" strokeWidth="2"/><path d={path(r,yR)} fill="none" stroke="gray" strokeWidth="2" strokeDasharray="4 4"/></>);})()}
        </svg>
      </div>
    </section>
    <section style={{marginTop:24}}>
      <h2 style={{fontSize:18,fontWeight:700,marginBottom:8}}>자동매매 로그</h2>
      <div style={{border:"1px solid #eee",borderRadius:16}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr style={{background:"#fafafa"}}>
          <th style={{textAlign:"left",padding:12}}>SKU</th><th style={{textAlign:"right",padding:12}}>매입</th>
          <th style={{textAlign:"right",padding:12}}>매출</th><th style={{textAlign:"right",padding:12}}>ROI</th>
        </tr></thead><tbody>{trades.map((t:any)=>(<tr key={t.id} style={{borderTop:"1px solid #f0f0f0"}}>
          <td style={{padding:12}}>{t.sku}</td><td style={{padding:12,textAlign:"right"}}>{t.buy?.toLocaleString()}</td>
          <td style={{padding:12,textAlign:"right"}}>{t.sell?.toLocaleString()}</td><td style={{padding:12,textAlign:"right"}}>{t.roi}</td></tr>))}</tbody></table>
      </div>
    </section>
  </div>);
}
