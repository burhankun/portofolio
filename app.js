(function(){
  var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // mobile menu
  var mb=$('#menuBtn'),mn=$('#menu');
  mb.addEventListener('click',function(){var h=mn.classList.toggle('hidden');mb.setAttribute('aria-expanded',String(!h));});
  $$('#menu a').forEach(function(a){a.addEventListener('click',function(){mn.classList.add('hidden');});});
  // scroll progress bar
  var bar=$('#progress');
  // spotlight on dark sections
  $$('.spot').forEach(function(s){s.addEventListener('mousemove',function(e){var r=s.getBoundingClientRect();s.style.setProperty('--mx',(e.clientX-r.left)+'px');s.style.setProperty('--my',(e.clientY-r.top)+'px');});});
  // hero photo tilt
  var tw=$('#tiltWrap'),ti=$('.tilt');
  if(tw&&!reduce){tw.addEventListener('mousemove',function(e){var r=tw.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;ti.style.transform='perspective(700px) rotateY('+(x*12)+'deg) rotateX('+(-y*12)+'deg)';});tw.addEventListener('mouseleave',function(){ti.style.transform='';});}
  // reveal + count up
  function count(el){var t=parseInt(el.getAttribute('data-count'),10);if(reduce||isNaN(t)){return;}var s=performance.now(),d=1200;(function f(n){var p=Math.min(1,(n-s)/d);el.textContent=Math.round(t*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f);})(s);}
  var io='IntersectionObserver' in window?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');$$('[data-count]',e.target).forEach(count);io.unobserve(e.target);}});},{threshold:.12}):null;
  $$('.reveal').forEach(function(el){io?io.observe(el):el.classList.add('in');});
  // growth line
  var chart=$('#chart'),pb=$('#pathBase'),pl=$('#pathLive'),dots=$$('.node-dot'),len=0,pts=[];
  function build(){
    var cr=chart.getBoundingClientRect();
    pts=dots.map(function(d){var r=d.getBoundingClientRect();return {x:r.left-cr.left+r.width/2,y:r.top-cr.top+r.height/2};});
    if(pts.length<2)return;
    var d='M'+pts[0].x+' '+(pts[0].y-60)+' L'+pts[0].x+' '+pts[0].y;
    for(var i=1;i<pts.length;i++){var a=pts[i-1],b=pts[i],m=(a.y+b.y)/2;d+=' C'+a.x+' '+m+' '+b.x+' '+m+' '+b.x+' '+b.y;}
    var l=pts[pts.length-1];d+=' L'+l.x+' '+(l.y+90);
    pb.setAttribute('d',d);pl.setAttribute('d',d);len=pl.getTotalLength();
    pl.style.strokeDasharray=len;update();
  }
  function update(){
    $$('.reveal:not(.in)').forEach(function(el){if(el.getBoundingClientRect().top<window.innerHeight*.92){el.classList.add('in');$$('[data-count]',el).forEach(count);}});
    var h=document.documentElement,sc=h.scrollTop||document.body.scrollTop;
    bar.style.width=(sc/(h.scrollHeight-h.clientHeight)*100)+'%';
    if(!len)return;
    var cr=chart.getBoundingClientRect(),p=Math.max(0,Math.min(1,(window.innerHeight*.6-cr.top)/cr.height));
    pl.style.strokeDashoffset=reduce?0:len*(1-p);
    var yMark=window.innerHeight*.6-cr.top;
    dots.forEach(function(d,i){d.classList.toggle('on',reduce||(pts[i]&&pts[i].y<yMark));});
  }
  window.addEventListener('scroll',update,{passive:true});
  window.addEventListener('resize',build);window.addEventListener('load',build);
  $$('#chart details').forEach(function(d){d.addEventListener('toggle',function(){setTimeout(build,60);});});
  build();
  // lightbox
  var lb=$('#lightbox'),li=$('img',lb);
  $$('[data-zoom]').forEach(function(el){el.addEventListener('click',function(){li.src=el.src;li.alt=el.alt;lb.classList.add('open');});});
  lb.addEventListener('click',function(){lb.classList.remove('open');});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')lb.classList.remove('open');});
  // contact form (opens email app)
  $('#cf').addEventListener('submit',function(e){e.preventDefault();
    var n=$('#nm').value.trim(),m=$('#em').value.trim(),t=$('#msg').value.trim(),fn=$('#fn');
    if(!n||!t||m.indexOf('@')<1){fn.textContent='Please fill in your name, a valid email, and a message.';return;}
    fn.textContent='Opening your email app...';
    window.location.href='mailto:'+window.PORTFOLIO_EMAIL+'?subject='+encodeURIComponent('Portfolio message from '+n)+'&body='+encodeURIComponent(t+'\n\n'+n+' ('+m+')');
  });
})();
