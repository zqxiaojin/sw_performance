    function log(content) {
      document.body.appendChild(document.createTextNode(content + '\n'));
      console.log.apply(console, arguments);
    }

    window.onerror = function(err) {
      log("Error", err);
    };

    if (navigator.serviceWorker && navigator.serviceWorker.getRegistrations) {
          //启动的时候先反注册所有sw
          navigator.serviceWorker.getRegistration().then(function(registration) {
            if (registration) {
              registration.unregister('./');
            }

          })
      } else {
        setTimeout(function(){log("该浏览器不支持service worker")}, 1000)
        
      }


    var KTestTime = 32;

    function sendRequest(url, endFunction, index, count) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
          if (xhr.readyState == XMLHttpRequest.DONE) {
             
             if (++index < count) {

                sendRequest(url, endFunction, index, count)

             } else {
                
                endFunction(xhr)              
             }

          }
      }
      xhr.open('GET', url + "&" + new Date().getTime(), true);
      xhr.send(null);


    }

    function startOriginalAjaxTest(){

      var start = new Date().getTime();

      var i = 0;

      sendRequest("jsonBig.json?", function(xhr){
         
          var end = new Date().getTime();
          log("耗时 " +  (end - start));

      }, i , KTestTime);


    }

    function startSWAjaxTest(){

      navigator.serviceWorker.register('sw.js', {
        scope: './'
      }).then(function(sw) {
        log("注册成功", sw);
      }).catch(function(err) {
        log("Error", err);
      });


      var start = new Date().getTime();

      var i = 0;

      sendRequest("jsonBig.json?fake", function(xhr){
         
          var end = new Date().getTime();
          log("SW注册后耗时 " + (end - start));

      }, i , KTestTime);

    }



    function startSWAjaxCacheTest() {

            var start = new Date().getTime();

      var i = 0;

      sendRequest("jsonBig.json", function(xhr){
         
          var end = new Date().getTime();
          log("SW注册后缓存耗时 " + (end - start));

      }, i , KTestTime);


    }