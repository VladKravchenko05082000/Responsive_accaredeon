"use strict"

const spollersArray = document.querySelectorAll('[data-spollers]');
if (spollersArray.length > 0) {
   const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
      return !item.dataset.spollers.split(",")[0];
   });

   if (spollersRegular.length > 0) {
      initSpollers(spollersRegular);
   }

   const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
      return item.dataset.spollers.split(",")[0];
   });

   if (spollersRegular.length > 0) {
      const breakpointsArray = [];
      spollersMedia.forEach(item => {
         const params = item.dataset.spollers;
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
      mediaQueries = mediaQuerie.filter(function (item, index, self) {
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

         matchMedia.addEventListener('change', function () {
            initSpollers(spollersArray, matchMedia);
         });
         initSpollers(spollersArray, matchMedia);
      })
   }
}