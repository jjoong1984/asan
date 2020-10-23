(function ($) {
  
  // 로고를 클릭하면 main.html의 #content를 load() 하시오.
  // $('#footer .quickMenu a')를 클릭하면 해당 html의 #content를 load()하시오.
  $('body').on("click", "#header h1 a , #footer .quickMenu a, .mainContent #step_area a,  .contTit .prev a ", function () {
      var url = this.href;
      $("#container > #content").remove();
      $("#container").load(url + " #content");
      return false;
    }
  );

  // `<li><div class="img"><img src="${photo}" alt="닥터1"></div>`
  // `<div class="doctocInfo"><strong>${name}</strong>`
  // `<p>${depart}</p>`
  // `<div>${about}</div></div></li>`
  
  $('#container').on('click', '.medicalContent .mediList a', function(e){ 
      e.preventDefault()
      var url = this.href;
      var part = this.id;
      $("#container > #content").remove();
      $("#container").load(url + " #content");

      $.ajax({ 
        type : 'GET',
        url : 'data/doctors.json',
        beforeSend : function(xhr){ 
          if ( xhr.overrideMimeType ) { 
            xhr.overrideMimeType('application/json')
          }
        },
        success : function(data){ //매개변수data가 json데이터를 모두 받는다.
          var usedata = data[part] // 배열이름이면 data.part1 변수면 data[part]
          var newContent = '';
          function dataPrint() { 
            for ( var i in usedata ) {
              newContent += `<li><div class="img"><img src="${usedata[i].photo}" alt="닥터1"></div>`
              newContent += `<div class="doctocInfo"><strong>${usedata[i].name}</strong>`
              newContent += `<p>${usedata[i].depart}</p>`
              newContent += `<div>${usedata[i].about}</div></div></li>`
            }
            $('#content .part1DocterList').html(`<ul>${newContent}</ul>`)
          }
          dataPrint();
        },
        error : function(){ 
          alert(xhr.status + '오류발생')
        }
    
      })
  })


// 스크롤발생시 팝 픽스드
  $(window).scroll(function(){ 
    var scr = $(this).scrollTop()
    if ( scr>30 && !$('#header').hasClass('on') ){ 
      $('#header').slideUp(100).slideDown(100).addClass('on')
    } else if ( scr<30 && $('#header').hasClass('on') ) { 
      $('#header').removeClass('on')
    }

  })








})(jQuery);
