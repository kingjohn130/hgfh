"use strict";!function(){function t(t,e){CKEDITOR.tools.extend(this,{editor:t,editable:t.editable(),doc:t.document,win:t.window},e,!0),this.inline=this.editable.isInline(),this.inline||(this.frame=this.win.getFrame()),this.target=this[this.inline?"editable":"doc"]}function e(t,e){CKEDITOR.tools.extend(this,e,{editor:t},!0)}function i(t,e){var i=t.editable();CKEDITOR.tools.extend(this,{editor:t,editable:i,inline:i.isInline(),doc:t.document,win:t.window,container:CKEDITOR.document.getBody(),winTop:CKEDITOR.document.getWindow()},e,!0),this.hidden={},this.visible={},this.inline||(this.frame=this.win.getFrame()),this.queryViewport();var n=CKEDITOR.tools.bind(this.queryViewport,this),s=CKEDITOR.tools.bind(this.hideVisible,this),o=CKEDITOR.tools.bind(this.removeAll,this);i.attachListener(this.winTop,"resize",n),i.attachListener(this.winTop,"scroll",n),i.attachListener(this.winTop,"resize",s),i.attachListener(this.win,"scroll",s),i.attachListener(this.inline?i:this.frame,"mouseout",function(t){var e=t.data.$.clientX,i=t.data.$.clientY;this.queryViewport(),(e<=this.rect.left||e>=this.rect.right||i<=this.rect.top||i>=this.rect.bottom)&&this.hideVisible(),(0>=e||e>=this.winTopPane.width||0>=i||i>=this.winTopPane.height)&&this.hideVisible()},this),i.attachListener(t,"resize",n),i.attachListener(t,"mode",o),t.on("destroy",o),this.lineTpl=new CKEDITOR.template(d).output({lineStyle:CKEDITOR.tools.writeCssText(CKEDITOR.tools.extend({},c,this.lineStyle,!0)),tipLeftStyle:CKEDITOR.tools.writeCssText(CKEDITOR.tools.extend({},a,{left:"0px","border-left-color":"red","border-width":"6px 0 6px 6px"},this.tipCss,this.tipLeftStyle,!0)),tipRightStyle:CKEDITOR.tools.writeCssText(CKEDITOR.tools.extend({},a,{right:"0px","border-right-color":"red","border-width":"6px 6px 6px 0"},this.tipCss,this.tipRightStyle,!0))})}function n(t,e){return t&e}function s(t){return t&&t.type==CKEDITOR.NODE_ELEMENT}function o(t){return!(!u[t.getComputedStyle("float")]&&!u[t.getAttribute("align")])}function r(t){return!!I[t.getComputedStyle("position")]}function h(t){return s(t)&&"true"==t.getAttribute("contenteditable")}function l(t){return s(t)&&!o(t)&&!r(t)}CKEDITOR.plugins.add("lineutils"),CKEDITOR.LINEUTILS_BEFORE=1,CKEDITOR.LINEUTILS_AFTER=2,CKEDITOR.LINEUTILS_INSIDE=4,t.prototype={start:function(t){var e,i,n,s,o=this,r=this.editor,h=this.doc,l=CKEDITOR.tools.eventsBuffer(50,function(){r.readOnly||"wysiwyg"!=r.mode||(o.relations={},(i=h.$.elementFromPoint(n,s))&&i.nodeType&&(e=new CKEDITOR.dom.element(i),o.traverseSearch(e),isNaN(n+s)||o.pixelSearch(e,n,s),t&&t(o.relations,n,s)))});this.listener=this.editable.attachListener(this.target,"mousemove",function(t){n=t.data.$.clientX,s=t.data.$.clientY,l.input()}),this.editable.attachListener(this.inline?this.editable:this.frame,"mouseout",function(){l.reset()})},stop:function(){this.listener&&this.listener.removeListener()},getRange:function(){var t={};return t[CKEDITOR.LINEUTILS_BEFORE]=CKEDITOR.POSITION_BEFORE_START,t[CKEDITOR.LINEUTILS_AFTER]=CKEDITOR.POSITION_AFTER_END,t[CKEDITOR.LINEUTILS_INSIDE]=CKEDITOR.POSITION_AFTER_START,function(e){var i=this.editor.createRange();return i.moveToPosition(this.relations[e.uid].element,t[e.type]),i}}(),store:function(){function t(t,e,i){var n=t.getUniqueId();n in i?i[n].type|=e:i[n]={element:t,type:e}}return function(e,i){var s;n(i,CKEDITOR.LINEUTILS_AFTER)&&l(s=e.getNext())&&s.isVisible()&&(t(s,CKEDITOR.LINEUTILS_BEFORE,this.relations),i^=CKEDITOR.LINEUTILS_AFTER),n(i,CKEDITOR.LINEUTILS_INSIDE)&&l(s=e.getFirst())&&s.isVisible()&&(t(s,CKEDITOR.LINEUTILS_BEFORE,this.relations),i^=CKEDITOR.LINEUTILS_INSIDE),t(e,i,this.relations)}}(),traverseSearch:function(t){var e,i,n;do if(n=t.$["data-cke-expando"],!(n&&n in this.relations)){if(t.equals(this.editable))return;if(l(t))for(e in this.lookups)(i=this.lookups[e](t))&&this.store(t,i)}while(!h(t)&&(t=t.getParent()))},pixelSearch:function(){function t(t,i,n,s,o){for(var r,h=n,a=0;o(h);){if(h+=s,25==++a)return;if(r=this.doc.$.elementFromPoint(i,h))if(r!=t){if(e(t,r)&&(a=0,l(r=new CKEDITOR.dom.element(r))))return r}else a=0}}var e=CKEDITOR.env.ie||CKEDITOR.env.webkit?function(t,e){return t.contains(e)}:function(t,e){return!!(16&t.compareDocumentPosition(e))};return function(e,i,n){var s=this.win.getViewPaneSize().height,o=t.call(this,e.$,i,n,-1,function(t){return t>0}),r=t.call(this,e.$,i,n,1,function(t){return s>t});if(o)for(this.traverseSearch(o);!o.getParent().equals(e);)o=o.getParent();if(r)for(this.traverseSearch(r);!r.getParent().equals(e);)r=r.getParent();for(;(o||r)&&(o&&(o=o.getNext(l)),o&&!o.equals(r))&&(this.traverseSearch(o),r&&(r=r.getPrevious(l)),r&&!r.equals(o));)this.traverseSearch(r)}}(),greedySearch:function(){this.relations={};for(var t,e,i,n=this.editable.getElementsByTag("*"),s=0;t=n.getItem(s++);)if(!t.equals(this.editable)&&t.type==CKEDITOR.NODE_ELEMENT&&(t.hasAttribute("contenteditable")||!t.isReadOnly())&&l(t)&&t.isVisible())for(i in this.lookups)(e=this.lookups[i](t))&&this.store(t,e);return this.relations}},e.prototype={locate:function(){function t(t,e){var i=t.element[e===CKEDITOR.LINEUTILS_BEFORE?"getPrevious":"getNext"]();return i&&l(i)?(t.siblingRect=i.getClientRect(),e==CKEDITOR.LINEUTILS_BEFORE?(t.siblingRect.bottom+t.elementRect.top)/2:(t.elementRect.bottom+t.siblingRect.top)/2):e==CKEDITOR.LINEUTILS_BEFORE?t.elementRect.top:t.elementRect.bottom}return function(e){var i;this.locations={};for(var s in e)i=e[s],i.elementRect=i.element.getClientRect(),n(i.type,CKEDITOR.LINEUTILS_BEFORE)&&this.store(s,CKEDITOR.LINEUTILS_BEFORE,t(i,CKEDITOR.LINEUTILS_BEFORE)),n(i.type,CKEDITOR.LINEUTILS_AFTER)&&this.store(s,CKEDITOR.LINEUTILS_AFTER,t(i,CKEDITOR.LINEUTILS_AFTER)),n(i.type,CKEDITOR.LINEUTILS_INSIDE)&&this.store(s,CKEDITOR.LINEUTILS_INSIDE,(i.elementRect.top+i.elementRect.bottom)/2);return this.locations}}(),sort:function(){function t(t,i,n){return Math.abs(t-e[i][n])}var e,i,n,s;return function(o,r){e=this.locations,i=[];for(var h in e)for(var l in e[h])if(n=t(o,h,l),i.length){for(s=0;s<i.length;s++)if(n<i[s].dist){i.splice(s,0,{uid:+h,type:l,dist:n});break}s==i.length&&i.push({uid:+h,type:l,dist:n})}else i.push({uid:+h,type:l,dist:n});return"undefined"!=typeof r?i.slice(0,r):i}}(),store:function(t,e,i){this.locations[t]||(this.locations[t]={}),this.locations[t][e]=i}};var a={display:"block",width:"0px",height:"0px","border-color":"transparent","border-style":"solid",position:"absolute",top:"-6px"},c={height:"0px","border-top":"1px dashed red",position:"absolute","z-index":9999},d='<div data-cke-lineutils-line="1" class="cke_reset_all" style="{lineStyle}"><span style="{tipLeftStyle}">&nbsp;</span><span style="{tipRightStyle}">&nbsp;</span></div>';i.prototype={removeAll:function(){var t;for(t in this.hidden)this.hidden[t].remove(),delete this.hidden[t];for(t in this.visible)this.visible[t].remove(),delete this.visible[t]},hideLine:function(t){var e=t.getUniqueId();t.hide(),this.hidden[e]=t,delete this.visible[e]},showLine:function(t){var e=t.getUniqueId();t.show(),this.visible[e]=t,delete this.hidden[e]},hideVisible:function(){for(var t in this.visible)this.hideLine(this.visible[t])},placeLine:function(t,e){var i,n,s;if(i=this.getStyle(t.uid,t.type)){for(s in this.visible)if(this.visible[s].getCustomData("hash")!==this.hash){n=this.visible[s];break}if(!n)for(s in this.hidden)if(this.hidden[s].getCustomData("hash")!==this.hash){this.showLine(n=this.hidden[s]);break}n||this.showLine(n=this.addLine()),n.setCustomData("hash",this.hash),this.visible[n.getUniqueId()]=n,n.setStyles(i),e&&e(n)}},getStyle:function(t,e){var i,n=this.relations[t],s=this.locations[t][e],o={};if(n.siblingRect?o.width=Math.max(n.siblingRect.width,n.elementRect.width):o.width=n.elementRect.width,this.inline?o.top=s+this.winTopScroll.y-this.rect.relativeY:o.top=this.rect.top+this.winTopScroll.y+s,o.top-this.winTopScroll.y<this.rect.top||o.top-this.winTopScroll.y>this.rect.bottom)return!1;this.inline?o.left=n.elementRect.left-this.rect.relativeX:(n.elementRect.left>0?o.left=this.rect.left+n.elementRect.left:(o.width+=n.elementRect.left,o.left=this.rect.left),(i=o.left+o.width-(this.rect.left+this.winPane.width))>0&&(o.width-=i)),o.left+=this.winTopScroll.x;for(var r in o)o[r]=CKEDITOR.tools.cssLength(o[r]);return o},addLine:function(){var t=CKEDITOR.dom.element.createFromHtml(this.lineTpl);return t.appendTo(this.container),t},prepare:function(t,e){this.relations=t,this.locations=e,this.hash=Math.random()},cleanup:function(){var t;for(var e in this.visible)t=this.visible[e],t.getCustomData("hash")!==this.hash&&this.hideLine(t)},queryViewport:function(){this.winPane=this.win.getViewPaneSize(),this.winTopScroll=this.winTop.getScrollPosition(),this.winTopPane=this.winTop.getViewPaneSize(),this.rect=this.getClientRect(this.inline?this.editable:this.frame)},getClientRect:function(t){var e=t.getClientRect(),i=this.container.getDocumentPosition(),n=this.container.getComputedStyle("position");return e.relativeX=e.relativeY=0,"static"!=n&&(e.relativeY=i.y,e.relativeX=i.x,e.top-=e.relativeY,e.bottom-=e.relativeY,e.left-=e.relativeX,e.right-=e.relativeX),e}};var u={left:1,right:1,center:1},I={absolute:1,fixed:1};CKEDITOR.plugins.lineutils={finder:t,locator:e,liner:i}}();