import{t as c}from"./vendor.7d3d5e30.js";const g=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}};g();const d="de",S={years:["Jahr","Jahre"],months:["Monat","Monate"],weeks:["Woche","Wochen"],days:["Tag","Tage"],hours:["Stunde","Stunden"],minutes:["Minute","Minuten"],seconds:["Sekunde","Sekunden"]};function m(n,t){return S[n][t==1?0:1]}function f(n,t){return t.map(r=>{const s=n[r];return`${s.toLocaleString(d)} ${m(r,s)}`}).join(", ")}function L(n,t,r){return t.toLocaleString("de")+" "+m(n,t)+" alt: "+r.toLocaleString(d,{dateStyle:"long",timeStyle:"short"})}const h="Europe/Berlin",i=c.ZonedDateTime.from({timeZone:h,year:2021,month:9,day:16,hour:16,minute:9}),u=c.Now.zonedDateTimeISO(h),a=[],k=i.until(u,{largestUnit:"years"});a.push(f(k,["years","months","days"]));const w=i.until(u,{largestUnit:"weeks"});a.push(f(w,["weeks","days"]));const E=i.until(u,{largestUnit:"days"});a.push(f(E,["days","hours","minutes"]));const y=i.until(u).total({unit:"years",relativeTo:i});a.push(y.toLocaleString(d)+" "+m("years",y));const N=[["seconds",1e7],["hours",1e4],["minutes",1e6],["weeks",100],["days",1e3]],T=N.map(([n,t])=>L(n,t,i.add(c.Duration.from({[n]:t}))));function p(n,t,r){r.forEach(s=>{const e=document.createElement(t);e.innerText=s,n.appendChild(e)})}const v=document.querySelector("#durations");p(v,"li",a);const D=document.querySelector("#dates");p(D,"li",T);
