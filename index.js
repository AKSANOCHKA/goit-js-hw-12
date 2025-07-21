import{a as v,S as w,i as a}from"./assets/vendor-DRgUjrIE.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&c(n)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();const q="19753267-9cf01e6822d74b7ae8fe04f3f",P="https://pixabay.com/api/",E=v.create({baseURL:P,params:{key:q,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:15}});async function H(e,o=1){try{return(await E.get("",{params:{q:e.trim(),page:o}})).data}catch(s){throw console.error("Error fetching images:",s),s}}const f=document.querySelector(".gallery"),g=document.querySelector(".loader-container"),M=document.querySelector(".load-more-btn"),h=document.querySelector(".load-more-container"),R=new w(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250});function $(e){const o=e.map(({webformatURL:s,largeImageURL:c,tags:t,likes:r,views:n,comments:L,downloads:S})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${c}">
          <img 
            class="gallery-image" 
            src="${s}" 
            alt="${t}" 
            loading="lazy" 
          />
          <div class="info">
            <p class="info-item">
              <b>Likes</b>
              <span>${r}</span>
            </p>
            <p class="info-item">
              <b>Views</b>
              <span>${n}</span>
            </p>
            <p class="info-item">
              <b>Comments</b>
              <span>${L}</span>
            </p>
            <p class="info-item">
              <b>Downloads</b>
              <span>${S}</span>
            </p>
          </div>
        </a>
      </li>
    `).join("");f.insertAdjacentHTML("beforeend",o),R.refresh()}function B(){f.innerHTML=""}function C(){g.classList.add("visible")}function p(){g.classList.remove("visible")}function I(){h.classList.add("visible")}function u(){h.classList.remove("visible")}function x(){const e=f.querySelector(".gallery-item");return e?e.getBoundingClientRect().height:0}let y="",i=1,l=0,d=0;const O=document.querySelector(".form"),m=document.querySelector('input[name="search-text"]');O.addEventListener("submit",A);M.addEventListener("click",D);async function A(e){e.preventDefault();const o=m.value.trim();if(!o){a.warning({title:"Warning",message:"Please enter a search query!",position:"topRight"});return}y=o,i=1,d=0,B(),u(),await b(),m.value=""}async function D(){i+=1,await b()}async function b(){try{C();const e=await H(y,i);if(p(),i===1){if(l=e.totalHits,e.hits.length===0){a.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}a.success({title:"Success",message:`Hooray! We found ${l} images!`,position:"topRight"})}$(e.hits),d+=e.hits.length,d>=l?(u(),l>15&&a.info({title:"End of results",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):I(),i>1&&_()}catch(e){p(),u(),console.error("Search error:",e),a.error({title:"Error",message:"Something went wrong. Please try again later!",position:"topRight"})}}function _(){const o=x()*2;window.scrollBy({top:o,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
