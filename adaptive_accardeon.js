"use strict"

const spollersArray = document.querySelectorAll('[data-spoller]');
if (spollersArray.length > 0) {
   const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
      return !item.dataset.spoller.split(",")[0];
   });

   if (spollersRegular.length > 0) {
      initSpollers(spollersRegular);
   }

   const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
      return item.dataset.spoller.split(",")[0];
   });

   if (spollersRegular.length > 0) {
      const breakpointsArray = [];
      spollersMedia.forEach(item => {
         const params = item.dataset.spoller;
         const breakpoint = {};
         const paramsArray = params.split(",");
         breakpoint.value = paramsArray[0];
         breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
         breakpoint.item = item;
         breakpointsArray.push(breakpoint);
      });

      let mediaQueries = breakpointsArray.map(function (item) {
         return '(' + item.type + "-width:" + item.value + "px)," + item.value + ',' + item.type;
      });
      mediaQueries = mediaQueries.filter(function (item, index, self) {
         return self.indexOf(item) === index;
      });

      mediaQueries.forEach(breakpoint => {
         const paramsArray = breakpoint.split(",");
         const mediaBreakpoint = paramsArray[1];
         const mediaType = paramsArray[2];
         const matchMedia = window.matchMedia(paramsArray[0]);

         const spollersArray = breakpointsArray.filter(function (item) {
            if (item.value === mediaBreakpoint && item.type === mediaType) {
               return true;
            }
         });

         matchMedia.addListener(function () {
            initSpollers(spollersArray, matchMedia);
         });
         initSpollers(spollersArray, matchMedia);
      })
   }
   function initSpollers(spollersArray, matchMedia = false) {
      spollersArray.forEach(spollersBlock => {
         spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
         if (matchMedia.matches || !matchMedia) {
            spollersBlock.classList.add('_init');
            initSpollersBody(spollersBlock);
            spollersBlock.addEventListener("click", setSpollerAction);
         } else {
            spollersBlock.classList.remove('_init');
            initSpollersBody(spollersBlock, false);
            spollersBlock.removeEventListener("click", setSpollerAction);
         }
      });
   }
   function initSpollersBody(spollersBlock, hideSpollerBody = false) {
      const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
      if (spollerTitles.length > 0) {
         spollerTitles.forEach(spollersTitle => {
            if (hideSpollerBody) {
               spollersTitle.removeAttribute('tabindex');
               if (!spollersTitle.classList.contains('_active')) {
                  spollersTitle.nextElementSibling.hidden = true;
               }
            } else {
               spollersTitle.setAttribute('tabindex', '-1');
               spollersTitle.nextElementSibling.hidden = false;
            }
         });
      }
   }
   function setSpollerAction(e) {
      const el = e.target;
      if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
         const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
         const spollersBlock = spollerTitle.closest('[data-spoller]');
         const oneSpoller = spollersBlock.hasAttribute('data-one-spoller');
         if(!spollersBlock.querySelectorAll('._slide').length){
            if(oneSpoller && !spollerTitle.classList.contains('_active')){
               hideSpollerBody(spollersBlock);
            }
            spollerTitle.classList.toggle('_active');
            _slideToggle(spollersTitle.nextElementSibling, 500);
         }
         e.preventDefault();
      }
   }
}