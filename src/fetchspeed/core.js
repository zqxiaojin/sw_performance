    function log(content) {
      document.body.appendChild(document.createTextNode(content + '\n'));
      console.log.apply(console, arguments);
    }

    window.onerror = function(err) {
      log("Error", err);
    };

    function Registr(){

      navigator.serviceWorker.register('sw.js', {
        scope: './'
      }).then(function(sw) {
        log("注册成功");
      }).catch(function(err) {
        log("Error" + err);
      });
    }


    function UnRegistr(){

          navigator.serviceWorker.getRegistration().then(function(registration) {
            if (registration) {
              registration.unregister('./');
              log("反注册成功");
            }

          })

    }

    if (navigator.serviceWorker && navigator.serviceWorker.getRegistration) {

          navigator.serviceWorker.getRegistration().then(function(registration) {
            if (registration && registration.active) {
               log("sw当前已经注册")
            } else {
              log("sw当前没有注册")
            }

          })
        
    } else {

      setTimeout(function(){log("该浏览器不支持service worker")}, 500)
    }


    var KTestTime = 32;

    function sendRequest(url, endFunction, index, count, useCache) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
          if (xhr.readyState == XMLHttpRequest.DONE) {
             
             if (++index < count) {

                sendRequest(url, endFunction, index, count, useCache)

             } else {
                
                endFunction(xhr)              
             }

          }
      }
      if (useCache) {
          xhr.open('GET', url + "&" + index, true);//这里是为了存一次进入磁盘
      } else {

          xhr.open('GET', url + "&" + new Date().getTime(), true);    
      }

      xhr.send(null);


    }

    function startOriginalAjaxTest(){

      var start = new Date().getTime();

      var i = 0;

      sendRequest("img.jpg?", function(xhr){
         
          var end = new Date().getTime();
          log("耗时 " +  (end - start));

      }, i , KTestTime);


    }

    function startSWAjaxTest(){




      var start = new Date().getTime();

      var i = 0;

      sendRequest("img.jpg?", function(xhr){
         
          var end = new Date().getTime();
          log("SW注册后没有缓存地加载的耗时 " + (end - start));

      }, i , KTestTime);

    }



    function startSWAjaxCacheTest() {

            var start = new Date().getTime();

      var i = 0;

      sendRequest("img.jpg?fake", function(xhr){
         
          var end = new Date().getTime();
          log("SW注册后从缓存加载耗时 " + (end - start));

      }, i , KTestTime);


    }


    function startMemoryCacheTest() {

        //先加载一次，让其加入到缓存
        sendRequest("img.jpg?", function(xhr){


            var start = new Date().getTime();

            var i = 0;

            sendRequest("img.jpg?", function(xhr){
               
                var end = new Date().getTime();
                log("从默认缓存加载耗时 " + (end - start));

            }, i , KTestTime, true);



        }, 0, KTestTime, true);




    }