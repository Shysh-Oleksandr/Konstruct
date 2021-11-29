// Webp converter
function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
	if (support == true) {
		document.querySelector('body').classList.add('webp');
	}
	else{
		document.querySelector('body').classList.add('no-webp');
	}
});
// /Webp converter
// ==========================================================================

$(document).ready(function() {
	// Burger menu
	$('.icon-menu').click(function(event) {
		$('.icon-menu,.menu__body').toggleClass('_active');
		$('body').toggleClass('_lock');
	});
	// /Burger menu

	// ==========================================================================
	// Fixed Header 
	var intro = $("#intro"),
		header = $("#header"),
		page = $(".page"),
		introH = intro.innerHeight(),
		scrollOffset = $(window).scrollTop();


	$(window).on("scroll", function(){
		scrollOffset = $(this).scrollTop();
		checkScroll(scrollOffset);
	});

	$(window).resize(function(){
		introH = intro.innerHeight()
		scrollOffset = $(this).scrollTop();
		checkScroll(scrollOffset);
	});

	function checkScroll (scrollOffset) {
		if (scrollOffset >= introH) {
			header.addClass("fixed");	
			page.addClass("header-fixed");	
		}
		else {
			header.removeClass("fixed");
			page.removeClass("header-fixed");
		}
	}


	checkScroll(scrollOffset);
	// /Fixed Header 

	// ==========================================================================
	// Scroll to section
	$("[data-scroll]").on("click", function(event) {
		event.preventDefault();

		var $this = $(this),
			blockId = $this.data('scroll'),
			blockOffset;
		if(blockId == "#header"){
			blockOffset = 0;
		}
		else {
			blockOffset = $(blockId).offset().top;
		}

		$(".menu a").removeClass("_active");
		$this.addClass("_active");

		if($("#nav").hasClass("_active")) {
			$("#nav_toggle").toggleClass("_active");
			$("#nav").toggleClass("_active");
		}

		$('body').removeClass("_lock");

		$("html, body").animate({
			scrollTop: blockOffset
		}, 500);
	});
	// /Scroll to section.

});

// ==========================================================================
// Scroll active links.
// Cache selectors
var topMenu = $(".menu"),
    topMenuHeight = topMenu.innerHeight(),
    // All list items
    menuItems = $('.menu__body a'),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).data("scroll"));
      if (item.length) { return item; }
    });


// Bind to scroll
$(window).scroll(function(){
   // Get container scroll position
   var fromTop = $(this).scrollTop()+topMenuHeight;

   // Get id of current scroll item
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });
   // Get the id of the current element
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";
   // Set/remove active class
   menuItems
   .removeClass("_active")
     .filter(function(){
	        return $(this).attr('data-scroll') == "#"+id;
	    }).addClass("_active");
});
// /Scroll active links
