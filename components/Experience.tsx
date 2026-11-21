'use client';
import dynamic from 'next/dynamic';
import {useEffect,useRef,useState} from 'react';
const ProductScene=dynamic(()=>import('./ProductScene'),{ssr:false});
export default function Experience(){
 const root=useRef<HTMLElement>(null);
 const progress=useRef(0);
 const [pct,setPct]=useState(0);
 const headline=useRef<HTMLDivElement>(null);
 const intro=useRef<HTMLDivElement>(null);
 const caption=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  let alive=true;let cleanup=()=>{};
  (async()=>{
   const gsap=(await import('gsap')).default;
   const {ScrollTrigger}=await import('gsap/ScrollTrigger');
   if(!alive||!root.current)return;
   gsap.registerPlugin(ScrollTrigger);
   if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
   const ctx=gsap.context(()=>{
    const timeline=gsap.timeline({scrollTrigger:{
     trigger:root.current,start:'top top',
     end:()=>'+='+(window.innerHeight*(window.innerWidth<800?2.4:3.2)),
     pin:true,scrub:1,anticipatePin:1,invalidateOnRefresh:true,
     onUpdate:self=>{progress.current=self.progress;setPct(Math.round(self.progress*100))}
    }});
    timeline.fromTo(intro.current,{opacity:1,y:0},{opacity:0,y:-38,duration:.16},.08)
     .fromTo(headline.current,{opacity:1,y:0},{opacity:0,y:-90,duration:.24},.3)
     .fromTo(caption.current,{opacity:0,y:45},{opacity:1,y:0,duration:.2},.55)
     .to(caption.current,{opacity:0,y:-45,duration:.15},.84)
     .to({},{duration:1},0);
   },root);
   cleanup=()=>ctx.revert();ScrollTrigger.refresh();
  })();
  return()=>{alive=false;cleanup()};
 },[]);
 return <><header className="topbar"><a className="brand" href="#inicio">BRABOS<br/><span>LANCHES</span></a><nav className="nav"><a href="#inicio">EXPERIÊNCIA</a><a href="#final" className="cta">CONHECER ↗</a></nav></header>
 <main><section className="experience cinematic-first" id="inicio" ref={root}>
  <div className="cinematic-glow" aria-hidden="true"/>
  <div className="cinematic-copy" ref={headline}><span>ISSO É</span><strong>BRABO.</strong></div>
  <div className="cinematic-kicker" ref={intro}>UXDRIVEN / UMA EXPERIÊNCIA BRABOS</div>
  <div className="cinematic-subtitle" ref={caption}>CADA CAMADA<br/><em>CONTA UMA HISTÓRIA.</em></div>
  <div className="cinematic-product"><ProductScene progress={progress}/></div>
  <div className="cinematic-bottom"><span>ROLE PARA EXPLORAR ↓</span><span>01 / 01</span><div className="cinematic-track"><i style={{width:pct+'%'}}/></div></div>
 </section>
 <section className="end" id="final"><div><div style={{fontWeight:800,letterSpacing:3,fontSize:12,marginBottom:24}}>BRABOS LANCHES · CARUARU</div><h2>O SABOR<br/>É BRABO.</h2><p>Rua Mestre Vitalino, 369 · Alto do Moura</p></div><a href="https://www.instagram.com/_braboslanches/" target="_blank" rel="noopener noreferrer">CONHECER A BRABOS ↗</a></section></main>
 <footer className="foot"><span>PROTÓTIPO DE MOTION · MODELO 3D TEMPORÁRIO</span><span>UXDRIVEN · CENA 01 EM DESENVOLVIMENTO</span></footer></>
}
