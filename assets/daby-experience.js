/* VDABY EXPERIENCE LAYER v1.2 (2026-09-21) — additive, dependency-free, surgical.
   v1.2: hero stays first on the home page, optimized responsive images, legacy orbit launcher removed. */
(function(){
  'use strict';
  if(window.__DABY_EXPERIENCE_LAYER__) return;
  window.__DABY_EXPERIENCE_LAYER__=true;

  var rawPath=location.pathname.replace(/\/+$/,'')||'/';
  var base=rawPath.indexOf('/test')===0?'/':'/';
  var path=rawPath.indexOf('/test')===0?rawPath.slice(5)||'/':rawPath;
  var reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function el(tag,attrs,html){
    var n=document.createElement(tag);
    if(attrs) Object.keys(attrs).forEach(function(k){n.setAttribute(k,attrs[k])});
    if(html!=null)n.innerHTML=html;
    return n;
  }
  function progress(){
    if(document.querySelector('.vdaby-progress')) return;
    var bar=el('div',{class:'vdaby-progress','aria-hidden':'true'}); document.body.appendChild(bar);
    function update(){var d=document.documentElement,max=d.scrollHeight-d.clientHeight;bar.style.width=(max>0?(scrollY/max)*100:0)+'%'}
    addEventListener('scroll',update,{passive:true});update();
  }
  function reveal(){
    var candidates=document.querySelectorAll('main section, main article > *, .hero > *, .page-hero > *, .feature-card, .method-card, .article-card, .vdaby-surgical > *');
    candidates.forEach(function(n){if(!n.classList.contains('vdaby-reveal'))n.classList.add('vdaby-reveal')});
    if(reduced||!('IntersectionObserver' in window)){candidates.forEach(function(n){n.classList.add('is-visible')});return}
    var io=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}})},{threshold:.1,rootMargin:'0px 0px -24px'});
    candidates.forEach(function(n){if(!n.classList.contains('is-visible'))io.observe(n)});
  }
  function card(icon,title,desc,href){return '<a class="vdaby-universe-card" href="'+href+'"><div class="vdaby-universe-icon">'+icon+'</div><strong>'+title+'</strong><span>'+desc+'</span></a>'}
  function addUniverse(){
    if(path!=='/'||document.querySelector('.vdaby-universe'))return; var main=document.querySelector('main');if(!main)return;
    var box=el('section',{class:'vdaby-universe','aria-labelledby':'vdaby-universe-title'});
    box.innerHTML='<div class="vdaby-universe-head"><div class="vdaby-universe-kicker">The communication universe</div><h2 id="vdaby-universe-title">English is the tool.<br>Communication is the performance.</h2><p>Explore as situações profissionais em que seu inglês precisa funcionar — reuniões, apresentações, entrevistas, negociações e decisões.</p></div><div class="vdaby-orbit-grid">'+
      card('◆','Método','Build language in usable blocks.',base+'metodo/','')+card('◈','Empresas','Communication training for teams.',base+'corporate/','')+card('◎','Real-World','Learn through real professional contexts.',base+'seo-geo/','')+card('↗','AI Discovery','Understand the Daby communication framework.',base+'ai-discovery/','')+'</div>';
    var anchor=main.querySelector('.hero')||main.querySelector('section')||main.firstElementChild;if(anchor&&anchor.parentNode)anchor.parentNode.insertBefore(box,anchor.nextSibling);else main.appendChild(box);
  }
  function addFlow(){
    if(path!=='/metodo')return;if(document.querySelector('.vdaby-flow'))return;var main=document.querySelector('main');if(!main)return;
    var flow=el('section',{class:'vdaby-flow','aria-label':'Professional communication journey'});
    var steps=[['01','Contexto','Entenda a situação.'],['02','Objetivo','Saiba o que precisa acontecer.'],['03','Blocos','Monte linguagem reutilizável.'],['04','Resposta','Construa a sua mensagem.'],['05','Simulação','Pratique sob pressão.'],['06','Performance','Use com presença.']];
    flow.innerHTML=steps.map(function(s){return '<div class="vdaby-flow-step"><div class="vdaby-flow-num">'+s[0]+'</div><strong>'+s[1]+'</strong><span>'+s[2]+'</span></div>'}).join('');
    var h=main.querySelector('h1'),section=h&&h.closest('section');if(section&&section.parentNode)section.parentNode.insertBefore(flow,section.nextSibling);else main.appendChild(flow);
  }
  function surgicalSection(){
    if(document.querySelector('.vdaby-surgical'))return;var main=document.querySelector('main');if(!main)return;
    var box=el('section',{class:'vdaby-surgical','aria-labelledby':'vdaby-surgical-title'});
    if(path==='/metodo'){
      box.innerHTML='<div class="vdaby-surgical-head"><div class="vdaby-surgical-kicker">How the method works in practice</div><h2 id="vdaby-surgical-title">From language blocks to professional performance.</h2><p class="vdaby-surgical-intro">The method is not about memorising isolated English. It turns a real work situation into a sequence you can understand, build, practise and use.</p></div><div class="vdaby-strategy-grid">'+
      '<div class="vdaby-strategy-card"><span class="vdaby-strategy-index">01 · CONTEXT</span><strong>Start with the situation</strong><p>Meeting, interview, presentation, negotiation or everyday workplace communication.</p></div>'+ '<div class="vdaby-strategy-card"><span class="vdaby-strategy-index">02 · LANGUAGE</span><strong>Build usable blocks</strong><p>Learn chunks that can be recombined instead of memorising disconnected sentences.</p></div>'+ '<div class="vdaby-strategy-card"><span class="vdaby-strategy-index">03 · PERFORMANCE</span><strong>Make it yours</strong><p>Personalise the response, simulate pressure and refine clarity, confidence and delivery.</p></div></div>';
    } else if(path==='/seo-geo'){
      box.innerHTML='<div class="vdaby-surgical-head"><div class="vdaby-surgical-kicker">Real-World Communication</div><h2 id="vdaby-surgical-title">The situation comes first. English follows.</h2><p class="vdaby-surgical-intro">Professional communication becomes easier to train when the learner can see the complete journey — context, intention, language, response and adaptation.</p></div><div class="vdaby-diagram-frame"><img src="'+base+'assets/daby-real-world-communication-diagram.png" alt="Real-World Communication diagram showing the progression from professional context to communication performance"><div class="vdaby-diagram-caption">Daby · Real-World Communication framework</div></div><div class="vdaby-proof-row"><span class="vdaby-proof">Context</span><span class="vdaby-proof">Objective</span><span class="vdaby-proof">Message</span><span class="vdaby-proof">Simulation</span><span class="vdaby-proof">Correction</span><span class="vdaby-proof">Adaptation</span></div>';
    } else if(path==='/corporate'){
      box.innerHTML='<div class="vdaby-surgical-head"><div class="vdaby-surgical-kicker">Business communication</div><h2 id="vdaby-surgical-title">Train the moments that affect the business.</h2><p class="vdaby-surgical-intro">A corporate programme should connect English directly to the situations where teams need to perform — not to an abstract list of grammar topics.</p></div><div class="vdaby-strategy-grid">'+
      '<div class="vdaby-strategy-card"><span class="vdaby-strategy-index">01</span><strong>Meetings</strong><p>Clarify, challenge, agree, disagree and move decisions forward.</p></div><div class="vdaby-strategy-card"><span class="vdaby-strategy-index">02</span><strong>Presentations</strong><p>Structure the message, explain evidence and handle questions.</p></div><div class="vdaby-strategy-card"><span class="vdaby-strategy-index">03</span><strong>Negotiation</strong><p>Protect your position while keeping the relationship productive.</p></div></div>';
    } else if(path==='/ai-discovery'){
      box.innerHTML='<div class="vdaby-surgical-head"><div class="vdaby-surgical-kicker">Daby communication universe</div><h2 id="vdaby-surgical-title">A clearer map for people — and intelligent discovery.</h2><p class="vdaby-surgical-intro">This layer makes the relationships between Daby, its methodology and its professional applications easier to understand without replacing the page’s existing reference content.</p></div><div class="vdaby-ai-map"><div class="vdaby-ai-core"><strong>Strategic English<br>→ Communication<br>→ Performance</strong><span>The organising idea behind the Daby experience: English is trained through real professional communication.</span></div><nav class="vdaby-ai-list" aria-label="Daby knowledge map"><a href="'+base+'metodo/">Lego Block Chain</a><a href="'+base+'corporate/">Corporate Communication</a><a href="'+base+'seo-geo/">Real-World Communication</a><a href="'+base+'blog/">Knowledge &amp; Insights</a></nav></div>';
    } else return;
    var anchor=main.querySelector('section:last-of-type')||main.lastElementChild; if(anchor&&anchor.parentNode)anchor.parentNode.insertBefore(box,anchor.nextSibling);else main.appendChild(box);
  }

  function addAssetShowcase(){
    if((path!=='/'&&path!=='/corporate'&&path!=='/metodo')||document.querySelector('.vdaby-asset-showcase'))return;
    var main=document.querySelector('main'); if(!main)return;
    var box=el('section',{class:'vdaby-asset-showcase','aria-labelledby':'vdaby-assets-title'});
    var isHome=path==='/', isCorporate=path==='/corporate';
    box.innerHTML='<div class="vdaby-showcase-head"><div class="vdaby-universe-kicker">'+(isCorporate?'Business in context':'Inside the Daby experience')+'</div><h2 id="vdaby-assets-title">'+(isCorporate?'Put the visual story behind the business.':'Real people. Real situations. Real communication.')+'</h2><p>'+(isCorporate?'Use the existing Daby imagery as evidence of the environment, thinking and practice behind the programme.':'')+'</p></div>'+
      '<div class="vdaby-media-grid">'+
      '<a class="vdaby-media-card vdaby-tilt" href="'+base+(isCorporate?'metodo/':'metodo/')+'"><div class="vdaby-media-image"><img loading="lazy" decoding="async" src="'+base+'assets/img/daby-hero-seo-class-1400.webp" alt="Daby professional English training session"></div><div class="vdaby-media-copy"><span>01 · TRAINING</span><strong>'+(isCorporate?'Train the language before the pressure arrives.':'English that belongs in the room.')+'</strong><small>Explore the method →</small></div></a>'+
      '<a class="vdaby-media-card vdaby-tilt" href="'+base+'seo-geo/"><div class="vdaby-media-image"><img loading="lazy" decoding="async" src="'+base+'assets/img/daby-search-architecture-1400.webp" alt="Daby search and communication architecture visual"></div><div class="vdaby-media-copy"><span>02 · CONTEXT</span><strong>'+(isCorporate?'Make the communication system visible.':'See how communication is structured.')+'</strong><small>Enter Real-World Communication →</small></div></a>'+
      '<a class="vdaby-media-card vdaby-tilt" href="'+base+'corporate/"><div class="vdaby-media-image"><img loading="lazy" decoding="async" src="'+base+'assets/img/daby-workshop-1400.webp" alt="Daby workshop environment"></div><div class="vdaby-media-copy"><span>03 · BUSINESS</span><strong>'+(isCorporate?'Move from training to business performance.':'Turn language training into performance.')+'</strong><small>Explore corporate training →</small></div></a>'+
      '</div>';
    var anchor=isHome?main.querySelector('.vdaby-universe'):(main.querySelector('.vdaby-situation-orbit')||main.querySelector('.vdaby-surgical'));
    if(anchor&&anchor.parentNode)anchor.parentNode.insertBefore(box,anchor.nextSibling);else main.appendChild(box);
    box.querySelectorAll('.vdaby-tilt').forEach(function(card){
      card.addEventListener('pointermove',function(e){if(reduced)return;var r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.setProperty('--rx',(-y*4)+'deg');card.style.setProperty('--ry',(x*5)+'deg')});
      card.addEventListener('pointerleave',function(){card.style.removeProperty('--rx');card.style.removeProperty('--ry')});
    });
  }
  function addVisualStory(){
    if(document.querySelector('.vdaby-visual-story'))return;
    var main=document.querySelector('main'); if(!main)return;
    var cfg=null;
    if(path==='/') cfg={title:'The Daby 2X experience',desc:'A visual language for strategic English: real situations, usable language and communication that travels with you.',img:'assets/visuals/daby-editorial-insights.svg',badge:'Strategy · Communication · Global work'};
    else if(path==='/metodo') cfg={title:'See the method before you use it',desc:'The LEGO Block Chain turns a professional situation into a sequence you can understand, build, practise and apply.',img:'assets/visuals/daby-method-flow.svg',badge:'Method · Context · Simulation · Performance'};
    else if(path==='/corporate') cfg={title:'Corporate communication, mapped',desc:'Train the moments that influence alignment, decisions and business movement — meetings, presentations, negotiation and leadership.',img:'assets/visuals/daby-corporate-communication.svg',badge:'Meetings · Presentations · Negotiation · Leadership'};
    else if(path==='/linkedin') cfg={title:'Your professional story should travel',desc:'A clearer profile connects expertise, communication and opportunity across international professional environments.',img:'assets/visuals/daby-linkedin-professional.svg',badge:'Expertise · Clarity · Opportunity'};
    else if(path==='/seo-geo') cfg={title:'From visibility to understanding',desc:'Search and AI discovery work better when identity, expertise, content and official references are connected clearly.',img:'assets/visuals/daby-ai-discovery.svg',badge:'People · Search · AI · Content'};
    else if(path==='/ai-discovery') cfg={title:'A visual map for intelligent discovery',desc:'Daby’s official reference layer connects its identity, method, expertise and professional applications.',img:'assets/visuals/daby-ai-discovery.svg',badge:'Official reference · Structured knowledge'};
    else if(path==='/blog') cfg={title:'Ideas that become usable English',desc:'Practical thinking for meetings, careers, leadership and global work — designed to move from reading to application.',img:'assets/visuals/daby-editorial-insights.svg',badge:'Insights · Practice · Application'};
    if(!cfg)return;
    var box=el('section',{class:'vdaby-visual-story','aria-labelledby':'vdaby-visual-story-title'});
    box.innerHTML='<div class="vdaby-visual-story-head"><div class="vdaby-universe-kicker">Daby visual language</div><h2 id="vdaby-visual-story-title">'+cfg.title+'</h2><p>'+cfg.desc+'</p></div><div class="vdaby-visual-frame"><img src="'+base+cfg.img+'" alt="'+cfg.title+'"></div><div class="vdaby-visual-badge">'+cfg.badge+'</div>';
    var anchor=main.querySelector('.vdaby-surgical')||main.querySelector('section:last-of-type')||main.lastElementChild;
    if(anchor&&anchor.parentNode)anchor.parentNode.insertBefore(box,anchor.nextSibling);else main.appendChild(box);
  }

  function addSituationOrbit(){
    if(path!=='/metodo'||document.querySelector('.vdaby-situation-orbit'))return;
    var main=document.querySelector('main'); if(!main)return;

    var box=el('section',{class:'vdaby-situation-orbit vdaby-method-universe','aria-labelledby':'vdaby-situation-title'});
    var items=[
      ['Reuniões e atualizações','Align people, decisions and next steps.','01','assets/img/daby-hero-seo-class-1400.webp','meeting'],
      ['Apresentações e entrevistas','Structure the message, explain your thinking and handle questions.','02','assets/img/daby-workshop-1400.webp','presentation'],
      ['Negociações e decisões','Protect value, clarify trade-offs and move the conversation forward.','03','assets/img/daby-search-architecture-1400.webp','negotiation']
    ];
    var icons={
      meeting:'<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="13" r="5"/><path d="M14 29c0-5 4-8 10-8s10 3 10 8"/><circle cx="10" cy="22" r="3.5"/><path d="M3.5 36c.5-5 3-7.5 6.5-7.5s6 2.5 6.5 7.5M38 22c2 0 4 1.5 4 4M33 36c.3-4 2.2-6 5-7"/><path d="M19 36h10M24 30v10"/></svg>',
      presentation:'<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="6" y="8" width="36" height="22" rx="3"/><path d="M24 30v9M18 40h12M13 15h12M13 20h20M13 25h10"/><circle cx="35" cy="18" r="4"/></svg>',
      negotiation:'<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 25l9-9 8 7 8-8 7 7"/><path d="M8 25v10h10M40 22v10H30"/><path d="M16 35l6-6 5 5 6-6"/><circle cx="17" cy="16" r="3"/><circle cx="32" cy="15" r="3"/></svg>'
    };

    box.innerHTML=
      '<div class="vdaby-orbit-story">'+
        '<div class="vdaby-universe-kicker">Situações profissionais</div>'+
        '<h2 id="vdaby-situation-title">Onde o método precisa funcionar.</h2>'+
        '<p>O LEGO Block Chain ganha sentido quando os blocos entram numa conversa real. Escolha uma situação para ver como o mesmo princípio muda de acordo com a intenção profissional.</p>'+
        '<div class="vdaby-orbit-detail" aria-live="polite">'+
          '<div class="vdaby-orbit-detail-media"><img src="'+base+items[0][3]+'" alt="" /></div>'+ 
          '<div class="vdaby-orbit-detail-copy"><span>01 · REUNIÕES</span><strong>Reuniões e atualizações</strong><p>Align people, decisions and next steps.</p></div>'+ 
        '</div>'+ 
        '<a class="vdaby-uiverse-button" href="#vdaby-language-lab">'+
          '<span class="vdaby-real-button" aria-label="Explore os blocos de linguagem">Explore os blocos</span>'+ 
          '<span class="vdaby-button-shell" aria-hidden="true"><span class="vdaby-button-border"></span><span class="vdaby-backdrop"></span><span class="vdaby-spin vdaby-spin-blur"></span><span class="vdaby-spin vdaby-spin-intense"></span><span class="vdaby-spin vdaby-spin-inside"></span><span class="vdaby-button-label">Explore os blocos <b>↗</b></span></span>'+ 
        '</a>'+ 
      '</div>'+ 
      '<div class="vdaby-situation-stage" aria-label="Situações profissionais. Use as setas para navegar.">'+
        '<div class="vdaby-situation-ring"></div><div class="vdaby-situation-ring vdaby-situation-ring-inner"></div>'+ 
        '<div class="vdaby-situation-core"><span>DABY</span><strong>METHOD</strong><small>in context</small></div>'+ 
        '<div class="vdaby-situation-items">'+items.map(function(x,i){return '<button class="vdaby-situation-item'+(i===0?' is-active':'')+'" type="button" style="--i:'+i+'" data-title="'+x[0]+'" data-desc="'+x[1]+'" data-number="'+x[2]+'" data-image="'+base+x[3]+'" aria-label="Explorar '+x[0]+'">'+icons[x[4]]+'<span>'+x[2]+'</span><strong>'+x[0]+'</strong></button>'}).join('')+'</div>'+ 
      '</div>';

    var anchor=main.querySelector('.vdaby-surgical')||main.lastElementChild;
    if(anchor&&anchor.parentNode)anchor.parentNode.insertBefore(box,anchor);else main.appendChild(box);

    var stage=box.querySelector('.vdaby-situation-stage');
    var itemsEls=box.querySelectorAll('.vdaby-situation-item');
    var detail=box.querySelector('.vdaby-orbit-detail');
    var detailImg=detail.querySelector('img');
    var detailCopy=detail.querySelector('.vdaby-orbit-detail-copy');
    var detailStrong=detailCopy.querySelector('strong');
    var detailText=detailCopy.querySelector('p');
    var detailMeta=detailCopy.querySelector('span');
    var activeIndex=0;

    function setActive(item,index){
      if(!item)return;
      activeIndex=index;
      itemsEls.forEach(function(btn){btn.classList.remove('is-active');btn.removeAttribute('aria-current')});
      item.classList.add('is-active');item.setAttribute('aria-current','true');
      detailImg.src=item.getAttribute('data-image');
      detailImg.alt=item.getAttribute('data-title')+' — situação profissional Daby';
      detailStrong.textContent=item.getAttribute('data-title');
      detailText.textContent=item.getAttribute('data-desc');
      detailMeta.textContent=item.getAttribute('data-number')+' · '+item.getAttribute('data-title').toUpperCase();
    }
    itemsEls.forEach(function(item,index){
      item.addEventListener('click',function(){setActive(item,index);stage.classList.add('is-paused')});
      item.addEventListener('focus',function(){setActive(item,index);stage.classList.add('is-paused')});
    });
    stage.addEventListener('mouseenter',function(){stage.classList.add('is-paused')});
    stage.addEventListener('mouseleave',function(){stage.classList.remove('is-paused')});
    stage.addEventListener('focusin',function(){stage.classList.add('is-paused')});
    stage.addEventListener('focusout',function(e){if(!stage.contains(e.relatedTarget))stage.classList.remove('is-paused')});
    stage.addEventListener('keydown',function(e){
      var next;
      if(e.key==='ArrowRight'||e.key==='ArrowDown'){e.preventDefault();next=(activeIndex+1)%itemsEls.length}
      else if(e.key==='ArrowLeft'||e.key==='ArrowUp'){e.preventDefault();next=(activeIndex-1+itemsEls.length)%itemsEls.length}
      else return;
      setActive(itemsEls[next],next);stage.classList.add('is-paused');itemsEls[next].focus();
    });
    if(reduced)stage.classList.add('is-paused');
    setActive(itemsEls[0],0);
  }

  function addLanguageLabs(){
    if(path!=='/metodo'||document.querySelector('.vdaby-language-lab'))return;
    var main=document.querySelector('main'); if(!main)return;

    var section=el('section',{class:'vdaby-language-lab','id':'vdaby-language-lab','aria-labelledby':'vdaby-language-title'});
    var phrases=[
      ['OPEN / ORIENT','“Let me quickly frame the situation.”','Use it to open a meeting, update or answer without jumping straight into details.','Let me quickly frame the situation for everyone.'],
      ['MAKE A POINT','“The key point I’d like to highlight is…”','Use it to signal the idea that matters most and give your listener a clear anchor.','The key point I’d like to highlight is the impact on delivery.'],
      ['ADD / BUILD','“I’d add one thing to that…”','Use it to contribute without sounding abrupt or turning the conversation into a monologue.','I’d add one thing to that: we also need to consider timing.'],
      ['AGREE / DISAGREE','“I agree with that, and I’d add…”','Use it to agree while extending the discussion, or replace the second half with a respectful alternative.','I agree with that, and I’d add a risk we should consider.'],
      ['CLARIFY','“Could you clarify what you mean by…?”','Use it when the pressure rises and precision matters more than speed.','Could you clarify what you mean by “ready” in this context?'],
      ['MOVE FORWARD','“So, the next step is…”','Use it to turn discussion into action and close a professional exchange with clarity.','So, the next step is to confirm the owners by Friday.']
    ];
    section.innerHTML='<div class="vdaby-language-head"><div><div class="vdaby-universe-kicker">Language Lab · blocos reutilizáveis</div><h2 id="vdaby-language-title">Blocos de linguagem que permanecem disponíveis.</h2><p>Em vez de decorar frases inteiras, você constrói peças que podem ser recuperadas, combinadas e adaptadas. Clique em um bloco para ver a função e um exemplo pronto para personalizar.</p></div><div class="vdaby-language-key"><span>01</span><b>FUNÇÃO</b><span>→</span><b>PHRASE</b><span>→</span><b>ADAPTAÇÃO</b></div></div><div class="vdaby-phrase-grid">'+phrases.map(function(x,i){return '<button type="button" class="vdaby-phrase-card'+(i===0?' is-open':'')+'" aria-expanded="'+(i===0?'true':'false')+'"><span class="vdaby-phrase-index">0'+(i+1)+'</span><span class="vdaby-phrase-function">'+x[0]+'</span><strong>'+x[1]+'</strong><span class="vdaby-phrase-body"><small>'+x[2]+'</small><em>'+x[3]+'</em><b>Use this block →</b></span></button>'}).join('')+'</div>';
    var anchor=main.querySelector('.vdaby-situation-orbit');
    if(anchor&&anchor.parentNode)anchor.parentNode.insertBefore(section,anchor.nextSibling);else main.appendChild(section);
    section.querySelectorAll('.vdaby-phrase-card').forEach(function(card){card.addEventListener('click',function(){section.querySelectorAll('.vdaby-phrase-card').forEach(function(c){if(c!==card){c.classList.remove('is-open');c.setAttribute('aria-expanded','false')}});var open=card.classList.toggle('is-open');card.setAttribute('aria-expanded',String(open))})});
  }

  function addPressureLab(){
    if(path!=='/metodo'||document.querySelector('.vdaby-pressure-lab'))return;
    var main=document.querySelector('main'); if(!main)return;
    var section=el('section',{class:'vdaby-pressure-lab','aria-labelledby':'vdaby-pressure-title'});
    var scenarios=[
      ['01','Interrupção','Someone challenges your point mid-sentence.','“Let me finish this point, and then I’d be happy to come back to that.”','Hold the floor → acknowledge → continue.'],
      ['02','Pergunta difícil','You do not have the answer yet.','“I don’t have that figure with me, but I can confirm it and come back to you.”','Stay credible → do not invent → commit to a next step.'],
      ['03','Discordância','You need to disagree without escalating the room.','“I see it slightly differently. My concern is the impact on timing.”','Signal difference → explain why → keep the conversation moving.']
    ];
    section.innerHTML='<div class="vdaby-pressure-head"><div><div class="vdaby-universe-kicker">Application under pressure</div><h2 id="vdaby-pressure-title">Aplicação sob pressão.</h2><p>É aqui que o bloco deixa de ser conteúdo e vira comportamento. Treine o mesmo repertório quando alguém interrompe, questiona ou discorda — sem procurar uma frase nova do zero.</p></div><div class="vdaby-pressure-meter"><span>CONTEXT</span><i></i><span>BLOCK</span><i></i><span>RESPONSE</span><i></i><span>ADAPT</span></div></div><div class="vdaby-pressure-grid">'+scenarios.map(function(x,i){return '<article class="vdaby-pressure-card'+(i===0?' is-current':'')+'"><span class="vdaby-pressure-index">'+x[0]+'</span><div class="vdaby-pressure-trigger">'+x[1]+'</div><p>'+x[2]+'</p><blockquote>'+x[3]+'</blockquote><small>'+x[4]+'</small><button type="button" class="vdaby-pressure-toggle">Testar este cenário <span>+</span></button></article>'}).join('')+'</div><div class="vdaby-pressure-note"><span>PRESSURE PRINCIPLE</span><strong>Você não precisa de uma frase perfeita. Precisa de um bloco recuperável.</strong><p>Contexto → intenção → bloco → resposta → adaptação.</p></div>';
    var anchor=main.querySelector('.vdaby-language-lab')||main.querySelector('.vdaby-situation-orbit');
    if(anchor&&anchor.parentNode)anchor.parentNode.insertBefore(section,anchor.nextSibling);else main.appendChild(section);
    section.querySelectorAll('.vdaby-pressure-card').forEach(function(card){var btn=card.querySelector('.vdaby-pressure-toggle');btn.addEventListener('click',function(){var active=card.classList.toggle('is-current');btn.querySelector('span').textContent=active?'−':'+';if(active)card.scrollIntoView({behavior:reduced?'auto':'smooth',block:'nearest'})})});
  }

  function orbit(){
    if(document.querySelector('.vdaby-orbit')||path==='/')return;
    var nav=el('div',{class:'vdaby-orbit','aria-label':'Daby quick navigation'});
    nav.innerHTML='<div class="vdaby-orbit-items"><a class="vdaby-orbit-item" style="--a:-90deg" href="'+base+'" aria-label="Início">⌂</a><a class="vdaby-orbit-item" style="--a:-30deg" href="'+base+'metodo/" aria-label="Método">◆</a><a class="vdaby-orbit-item" style="--a:30deg" href="'+base+'corporate/" aria-label="Empresas">◈</a><a class="vdaby-orbit-item" style="--a:90deg" href="'+base+'seo-geo/" aria-label="Real-World Communication">◎</a><a class="vdaby-orbit-item" style="--a:150deg" href="'+base+'ai-discovery/" aria-label="AI Discovery">↗</a><a class="vdaby-orbit-item" style="--a:210deg" href="'+base+'blog/" aria-label="Blog">B</a></div><button class="vdaby-orbit-toggle" type="button" aria-expanded="false" aria-label="Abrir navegação">D</button><span class="vdaby-orbit-label">Daby universe</span>';
    document.body.appendChild(nav);var b=nav.querySelector('button');
    function close(){nav.classList.remove('open');b.setAttribute('aria-expanded','false')}
    b.addEventListener('click',function(){var open=nav.classList.toggle('open');b.setAttribute('aria-expanded',String(open))});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
    document.addEventListener('click',function(e){if(!nav.contains(e.target))close()});
  }
  function enhanceCards(){
    var cards=document.querySelectorAll('.vdaby-strategy-card,.vdaby-universe-card,.vdaby-ai-list a');
    cards.forEach(function(card){
      if(card.dataset.vdabyDynamic)return; card.dataset.vdabyDynamic='1';
      card.addEventListener('pointermove',function(e){if(reduced)return;var r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.setProperty('--cx',(x*10)+'px');card.style.setProperty('--cy',(y*7)+'px');card.style.setProperty('--rx',(-y*2.5)+'deg');card.style.setProperty('--ry',(x*3)+'deg')});
      card.addEventListener('pointerleave',function(){card.style.removeProperty('--cx');card.style.removeProperty('--cy');card.style.removeProperty('--rx');card.style.removeProperty('--ry')});
    });
  }
  function init(){progress();addUniverse();addAssetShowcase();addFlow();surgicalSection();addSituationOrbit();addLanguageLabs();addPressureLab();enhanceCards();reveal();document.documentElement.classList.add('vdaby-experience-ready')}
  function wait(){if(!document.body){setTimeout(wait,80);return}if(document.querySelector('main')){init();var observer=new MutationObserver(function(){if(!document.querySelector('.vdaby-universe')&&path==='/')addUniverse();if(!document.querySelector('.vdaby-asset-showcase')&&(path==='/'||path==='/corporate'||path==='/metodo'))addAssetShowcase();if(!document.querySelector('.vdaby-flow')&&path==='/metodo')addFlow();if(!document.querySelector('.vdaby-surgical'))surgicalSection();if(!document.querySelector('.vdaby-situation-orbit')&&(path==='/metodo'||path==='/corporate'))addSituationOrbit();if(!document.querySelector('.vdaby-visual-story'))addVisualStory();if(path==='/metodo'&&!document.querySelector('.vdaby-language-lab'))addLanguageLabs();if(path==='/metodo'&&!document.querySelector('.vdaby-pressure-lab'))addPressureLab();enhanceCards();reveal()});observer.observe(document.body,{childList:true,subtree:true})}else setTimeout(wait,80)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',wait);else wait();
})();
